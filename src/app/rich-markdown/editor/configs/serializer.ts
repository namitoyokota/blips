import { MarkdownSerializer } from 'prosemirror-markdown';

/**
 * This serializes ProseMirror document as markdown text
 *
 * @link https://github.com/ProseMirror/prosemirror-markdown/blob/master/src/to_markdown.ts
 */
export const serializer = new MarkdownSerializer(
    {
        heading(state, node): void {
            state.write(state.repeat('#', node.attrs['level']) + ' ');
            state.renderInline(node);
            state.closeBlock(node);
        },
        bullet_list(state, node): void {
            state.renderList(node, '  ', () => (node.attrs['bullet'] || '*') + ' ');
        },
        ordered_list(state, node): void {
            const start = node.attrs['order'] || 1;
            const maxW = String(start + node.childCount - 1).length;
            const space = state.repeat(' ', maxW + 2);
            state.renderList(node, space, (i) => {
                const nStr = String(start + i);

                return state.repeat(' ', maxW - nStr.length) + nStr + '. ';
            });
        },
        list_item(state, node): void {
            state.renderContent(node);
        },
        paragraph(state, node): void {
            state.renderInline(node);
            state.closeBlock(node);
        },
        text(state, node): void {
            state.text(node.text!, true);
        },
    },
    {
        em: {
            open: '*',
            close: '*',
            mixable: true,
            expelEnclosingWhitespace: true,
        },
        strong: {
            open: '**',
            close: '**',
            mixable: true,
            expelEnclosingWhitespace: true,
        },
    },
);
