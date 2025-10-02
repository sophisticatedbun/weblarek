import { ICart } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class CartView extends Component<ICart> {
    protected _productsList: HTMLElement;
    protected _totalPrice: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._productsList = container.querySelector('.basket__list') as HTMLElement;
        this._totalPrice = container.querySelector('.basket__price') as HTMLElement;
        this._button = container.querySelector('.basket__button') as HTMLButtonElement;

        this.productsList = [];

        this._button.addEventListener('click', () => {
            events.emit('cart:open-order');
        });
    }

    set productsList(items: HTMLElement[]) {
        if (items.length === 0) {
            this._productsList.replaceChildren();
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Корзина пуста';
            emptyMessage.classList.add('basket__empty');
            this._productsList.appendChild(emptyMessage);
            this._button.disabled = true;
        } else {
            this._productsList.replaceChildren(...items);
            this._button.disabled = false;
        }
    }

    set totalPrice(value: number | null) {
        this._totalPrice.textContent = value !== null ? `${value} синапсов` : 'Бесценно';
    }
}