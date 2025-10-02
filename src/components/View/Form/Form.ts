import { IForm } from '../../../types';
import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/Component';
import { IEvents } from '../../base/Events';

export class Form extends Component<IForm> {
    protected _submitButton: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${container.name}:submit`, this);
        });
    }

    set errors(value: string) {
        if (value !== null && value !== '') {
            this._errors.textContent = value;
            this._submitButton.disabled = true;
        } else {
            this._errors.textContent = "";
            this._submitButton.disabled = false;
        }
    }

    clear(): void {
        this.errors = '';
    }
}