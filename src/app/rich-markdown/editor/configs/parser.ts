import type { Token } from 'markdown-it';
import MarkdownIt from 'markdown-it';
import { MarkdownParser } from 'prosemirror-markdown';
import type { Attrs } from 'prosemirror-model';
import { schema } from './schema';

function listIsTight(tokens: readonly Token[], i: number): boolean {
    while (++i < tokens.length) {
        if (tokens[i].type !== 'list_item_open') {
            return tokens[i].hidden;
        }
    }

    return false;
}

/**
 * This creates the parser used to turn markdown outputs into a markdown object
 *
 * @link https://github.com/ProseMirror/prosemirror-markdown/blob/master/src/from_markdown.ts
 */
export const parser = new MarkdownParser(schema, MarkdownIt('commonmark', { html: false }), {
    paragraph: { block: 'paragraph' },
    list_item: { block: 'list_item' },
    bullet_list: {
        block: 'bullet_list',
        getAttrs: (_, tokens, i): Attrs => ({ tight: listIsTight(tokens, i) }),
    },
    ordered_list: {
        block: 'ordered_list',
        getAttrs: (tok, tokens, i): Attrs => ({
            order: +tok.attrGet('start')! || 1,
            tight: listIsTight(tokens, i),
        }),
    },
    heading: {
        block: 'heading',
        getAttrs: (tok): Attrs => ({ level: +tok.tag.slice(1) }),
    },
    em: { mark: 'em' },
    strong: { mark: 'strong' },
});
