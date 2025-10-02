import { BaseCard } from './BaseCard';
import { IEvents } from '../../base/Events';
import { ensureElement } from '../../../utils/utils';
import { categoryMap } from '../../../utils/constants';
import {CDN_URL} from '../../../utils/constants.ts'

export class CatalogCard extends BaseCard {
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
        this._category = ensureElement<HTMLElement>('.card__category', this.container);

        this.container.addEventListener("click", () => {
            events.emit("catalog:card-click", { id: this.container.id });
        });
    }

    set image(value: string) {
        this.setImage(this._image, CDN_URL+value);
    }

    set category(value: string) {
        this._category.textContent = value;
        this._category.className = 'card__category ' + (categoryMap[value as keyof typeof categoryMap] || 'card__category_other');
    }
}