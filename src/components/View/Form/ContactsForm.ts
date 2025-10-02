import { Form } from './Form';
import { IEvents } from '../../base/Events';
import { ensureElement } from '../../../utils/utils';

export class ContactsForm extends Form {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;
    protected _submitButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this._email = ensureElement<HTMLInputElement>('input[name=email]', this.container);
        this._phone = ensureElement<HTMLInputElement>('input[name=phone]', this.container);
        this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        
        this._email.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            this.events.emit('contacts:email-changed', { email: target.value });
        });
        
        this._phone.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            this.events.emit('contacts:phone-changed', { phone: target.value });
        });

this._submitButton.addEventListener('click', () => {
     this.events.emit('contacts:submit', { email: this._email.value, phone: this._phone.value });
 });
    }

    set email(value: string) {
        this._email.value = value;
    }

    set phone(value: string) {
        this._phone.value = value;
    }

    clear(): void {
        this.email = '';
        this.phone = '';
        this.errors = '';
    }
}