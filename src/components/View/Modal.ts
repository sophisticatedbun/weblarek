import { IModal } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Modal extends Component<IModal> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = container.querySelector('.modal__close') as HTMLButtonElement;
        this._content = container.querySelector('.modal__content') as HTMLElement;

        this._closeButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        });

        this.container.addEventListener('click', (e: Event) => {
            if (e.target === this.container) {
                this.events.emit('modal:close');
            }
        });
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    _handleEscape = (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
            this.isOpen = false;
        }
    };

    set isOpen(value: boolean) {
        if (value) {
            this.container.classList.add("modal_active");
            document.addEventListener("keydown", this._handleEscape);
        } else {
            this.container.classList.remove("modal_active");
            document.removeEventListener("keydown", this._handleEscape);
        }
    }
}