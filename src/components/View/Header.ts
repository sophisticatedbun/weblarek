import { IHeader } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Header extends Component<IHeader> {
    protected _counter: HTMLElement;
    protected _basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

        this._basketButton.addEventListener('click', () => {
            this.events.emit('cart:open', this);
        });
    }

    set counter(value: number) {
        this._counter.textContent = String(value);
    }
}