import { IProduct } from "../../types";

export class Catalog {
    private products: IProduct[] = [];
    private selectedProduct: IProduct | null = null;

    setProductsList(products: IProduct[]): void {
        this.products = products;
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
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}