import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
    private products: IProduct[];
    private selectedProduct: IProduct | null = null;

    constructor(protected events: IEvents) {
        this.products = [];
        this.selectedProduct = null;
        this.events = events;
    }

    setProductsList(products: IProduct[]): void {
        this.products = products;
        this.events.emit('catalog:changed');
    }

    getProductsList(): IProduct[] {
        return this.products;
    }

    getProductById(id: string): IProduct {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new Error(`Товар с id ${id} не найден`);
        }
        return product;
    }

    setSelectedProduct(selectedProduct: IProduct): void {
        this.selectedProduct = selectedProduct;
        this.events.emit('catalog:product-selected', {
            product: this.selectedProduct
        });
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}