import { Form } from './Form';
import { IEvents } from '../../base/Events';
import { ensureElement } from '../../../utils/utils';

export class OrderForm extends Form {
    protected _paymentCard: HTMLButtonElement;
    protected _paymentCash: HTMLButtonElement;
    protected _address: HTMLInputElement;
    protected _nextBtn: HTMLButtonElement;
    protected _paymentMethod: 'card' | 'cash' | null = null;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this._paymentCard = ensureElement<HTMLButtonElement>('button[name=card]', this.container);
        this._paymentCash = ensureElement<HTMLButtonElement>('button[name=cash]', this.container);
        this._address = ensureElement<HTMLInputElement>('input[name=address]', this.container);
        this._nextBtn = ensureElement<HTMLButtonElement>('.order__button', this.container);

        // Используем делегирование событий для кнопок оплаты
        this.container.addEventListener('click', (e) => {
            const target = e.target as HTMLButtonElement;
            if (target === this._paymentCard) {
                this._paymentMethod = 'card';
                this.togglePaymentMethod('card');
                events.emit('payment:changed', { paymentMethod: 'card' });
            } else if (target === this._paymentCash) {
                this._paymentMethod = 'cash';
                this.togglePaymentMethod('cash');
                events.emit('payment:changed', { paymentMethod: 'cash' });
            }
        });

        this._address.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            events.emit('address:changed', { address: target.value });
        });

        this._nextBtn.addEventListener('click', () => {
                events.emit('order:submit');
        });
    }

    private togglePaymentMethod(method: 'card' | 'cash' | null) {
        this._paymentCard.classList.toggle('button_alt-active', method === 'card');
        this._paymentCash.classList.toggle('button_alt-active', method === 'cash');
    }

    set address(value: string) {
        this._address.value = value;
    }

    set paymentMethod(value: 'card' | 'cash' | null) {
        this._paymentMethod = value;
        this.togglePaymentMethod(value);
    }

    clear(): void {
        this.address = '';
        this.paymentMethod = null;
        this.errors = '';
    }
}