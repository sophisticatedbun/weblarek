import { BaseCard } from './BaseCard';
import { IEvents } from '../../base/Events';
import { ensureElement } from '../../../utils/utils';
import { categoryMap } from '../../../utils/constants';
import {CDN_URL} from '../../../utils/constants.ts'

export class PreviewCard extends BaseCard {
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;
    protected inCart: boolean = false;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
        this._category = ensureElement<HTMLElement>('.card__category', this.container);
        this._description = ensureElement<HTMLElement>('.card__text', this.container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this._button.addEventListener('click', () => {
            if (!this._button.disabled) {
                events.emit('cardPreview:button-click', { id: this.container.id } );
            }
        });
    }

    set image(value: string) {
        this.setImage(this._image, CDN_URL+value);
    }

    set category(value: string) {
        this._category.textContent = value;
        this._category.className = 'card__category ' + (categoryMap[value as keyof typeof categoryMap] || 'card__category_other');
    }

    set description(value: string) {
        this._description.textContent = value;
    }

    set isInCart(value: boolean) {
        this.inCart = value;
        if (value) {
            this._button.textContent = 'Удалить из корзины';
        } else {
            this._button.textContent = 'Добавить в корзину';
        }
    }

    set buttonDisabled(value: boolean) {
        this._button.textContent = 'Недоступно';
        this._button.disabled = value;
    }
}