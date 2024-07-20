import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { exampleSetup } from 'prosemirror-example-setup';
import type { Node } from 'prosemirror-model';
import type { PluginView, Transaction } from 'prosemirror-state';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Utils } from 'src/utils/utils';
import { parser } from './configs/parser';
import { schema } from './configs/schema';
import { serializer } from './configs/serializer';

@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit, OnDestroy {
    /** Markdown text */
    @Input('content')
    set setContent(content: string) {
        this.content = content;
        this.updateDocument();
    }

    /** Text to display when input is empty */
    @Input('placeholder')
    set setPlaceholder(placeholder: string) {
        this.placeholder = placeholder;
        this.updateDocument();
    }

    /** Whether user can edit content */
    @Input('disabled')
    set setDisabled(disabled: boolean) {
        this.disabled = disabled;
        this.updateDocument();
    }

    /** Event emitter for when a change has occurred */
    @Output() change = new EventEmitter<string>();

    /** Reference to editor */
    @ViewChild('editor') editor: ElementRef;

    /** Markdown text */
    content: string;

    /** Text to display when input is empty */
    placeholder: string;

    /** Whether user can edit content */
    disabled: boolean;

    /** Tracks state of the editor view */
    private view: EditorView;

    /** Node size of an empty document */
    private readonly baseNodeSize = 4;

    constructor() {}

    /**
     * On init lifecycle hook
     */
    ngAfterViewInit(): void {
        this.view = new EditorView(this.editor.nativeElement, {
            state: EditorState.create({
                doc: this.createDocNode(),
                plugins: exampleSetup({
                    schema,
                }),
            }),
            plugins: [this.applyPlaceholder()],
            editable: () => !this.disabled,
            dispatchTransaction: (transaction: Transaction): void => {
                this.view.updateState(this.view.state.apply(transaction));

                const updatedContent = Utils.sanitize(serializer.serialize(this.view.state.doc));
                if (!Utils.areEqualStrings(this.content, updatedContent)) {
                    this.change.emit(updatedContent);
                }
            },
        });
    }

    /**
     * On destroy lifecycle hook
     */
    ngOnDestroy(): void {
        this.view.destroy();
    }

    /**
     * Strips invalid markdown texts
     * @returns Doc node to use for editor
     */
    private createDocNode(): Node {
        try {
            return parser.parse(this.content);
        } catch (exception) {
            console.error(exception);

            return parser.parse('');
        }
    }

    /**
     * Creates a plugin to display placeholder
     * @returns Plugin to add
     */
    private applyPlaceholder(): Plugin<any> {
        const update = (view: EditorView): void => {
            if (view.state.doc.nodeSize > this.baseNodeSize) {
                view.dom.removeAttribute('data-placeholder');
            } else {
                view.dom.setAttribute('data-placeholder', this.placeholder);
            }
        };

        return new Plugin({
            view(view): PluginView {
                update(view);

                return { update };
            },
        });
    }

    /**
     * Updates rich text editor document
     */
    private updateDocument(): void {
        if (this.view) {
            this.view.dispatch(
                this.view.state.tr.replaceRangeWith(0, this.view.state.doc.content.size, parser.parse(this.content ? this.content : '')),
            );
        }
    }
}
