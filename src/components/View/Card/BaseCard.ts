import { Component } from '../../base/Component';
import { IBaseCard } from '../../../types';
import { ensureElement } from '../../../utils/utils';

export class BaseCard extends Component<IBaseCard> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        
        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set id(value: string) {
        this.container.id = value;
    }

    set title(value: string) {
        this._title.textContent = value;
    }

    set price(value: number | null) {
        if (value === null) {
            this._price.textContent = 'Бесценно';
        } else {
            this._price.textContent = `${value} синапсов`;
        }
    }
}