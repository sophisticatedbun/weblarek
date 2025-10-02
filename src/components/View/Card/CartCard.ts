import { BaseCard } from './BaseCard';
import { IEvents } from '../../base/Events';
import { ensureElement } from '../../../utils/utils';


export class CartCard extends BaseCard {
    protected _index: HTMLElement;
    protected _deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this._deleteButton.addEventListener("click", () => {
            events.emit("card:delete", { id: this.container.id });
        });
    }

    set index(value: number) {
        this._index.textContent = String(value);
    }
}