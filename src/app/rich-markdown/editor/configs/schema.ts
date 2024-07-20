import type { Attrs, DOMOutputSpec, MarkSpec } from 'prosemirror-model';
import { Schema } from 'prosemirror-model';

/**
 * This creates the scheme used to populate the toolbar in the rich text editor
 *
 * @link https://github.com/ProseMirror/prosemirror-markdown/blob/master/src/schema.ts
 */
export const schema = new Schema({
    nodes: {
        doc: {
            content: 'block+',
        },
        paragraph: {
            content: 'inline*',
            group: 'block',
            parseDOM: [{ tag: 'p' }],
            toDOM(): DOMOutputSpec {
                return ['p', 0];
            },
        },
        heading: {
            attrs: { level: { default: 1 } },
            content: 'text*',
            group: 'block',
            defining: true,
            parseDOM: [
                { tag: 'h1', attrs: { level: 1 } },
                { tag: 'h2', attrs: { level: 2 } },
                { tag: 'h3', attrs: { level: 3 } },
                { tag: 'h4', attrs: { level: 4 } },
                { tag: 'h5', attrs: { level: 5 } },
                { tag: 'h6', attrs: { level: 6 } },
            ],
            toDOM(node): DOMOutputSpec {
                return ['h' + node.attrs['level'], 0];
            },
        },
        ordered_list: {
            content: 'list_item+',
            group: 'block',
            attrs: { order: { default: 1 }, tight: { default: false } },
            parseDOM: [
                {
                    tag: 'ol',
                    getAttrs(dom): Attrs {
                        return {
                            order: (dom as HTMLElement).hasAttribute('start') ? +(dom as HTMLElement).getAttribute('start')! : 1,
                            tight: (dom as HTMLElement).hasAttribute('data-tight'),
                        };
                    },
                },
            ],
            toDOM(node): DOMOutputSpec {
                return [
                    'ol',
                    {
                        start: node.attrs['order'] === 1 ? null : node.attrs['order'],
                        'data-tight': node.attrs['tight'] ? 'true' : null,
                    },
                    0,
                ];
            },
        },
        bullet_list: {
            content: 'list_item+',
            group: 'block',
            attrs: { tight: { default: false } },
            parseDOM: [
                {
                    tag: 'ul',
                    getAttrs: (dom): Attrs => ({
                        tight: (dom as HTMLElement).hasAttribute('data-tight'),
                    }),
                },
            ],
            toDOM(node): DOMOutputSpec {
                return ['ul', { 'data-tight': node.attrs['tight'] ? 'true' : null }, 0];
            },
        },
        list_item: {
            content: 'block+',
            defining: true,
            parseDOM: [{ tag: 'li' }],
            toDOM(): DOMOutputSpec {
                return ['li', 0];
            },
        },
        text: {
            group: 'inline',
        },
    },
    marks: {
        em: {
            parseDOM: [
                { tag: 'i' },
                { tag: 'em' },
                { style: 'font-style=italic' },
                {
                    style: 'font-style=normal',
                    clearMark: (m): boolean => m.type.name === 'em',
                },
            ],
            toDOM(): DOMOutputSpec {
                return ['em'];
            },
        },
        strong: {
            parseDOM: [
                { tag: 'strong' },
                {
                    tag: 'b',
                    getAttrs: (node: HTMLElement): Attrs => node.style.fontWeight !== 'normal' && null,
                },
                {
                    style: 'font-weight=400',
                    clearMark: (m): boolean => m.type.name === 'strong',
                },
                {
                    style: 'font-weight',
                    getAttrs: (value: string): Attrs => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
                },
            ],
            toDOM() {
                return ['strong'];
            },
        } as MarkSpec,
    },
});
