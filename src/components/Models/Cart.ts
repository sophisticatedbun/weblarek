import { IProduct } from "../../types";

export class Cart {
    private cartProdcuts: IProduct[] = [];

    getCartProducts(): IProduct[] {
        return this.cartProdcuts;
    }

    addCartProduct(product: IProduct): void {
        this.cartProdcuts.push(product);
    }

    deleteCartProduct(product: IProduct): void {
        this.cartProdcuts = this.cartProdcuts.filter(p => p.id !== product.id);
    }

    clearCart(): void {
        this.cartProdcuts = [];
    }

    getTotalPrice(): number {
        return this.cartProdcuts.reduce((sum, p) => sum + (p.price ?? 0), 0);
    }

    getTotalCount(): number {
        return this.cartProdcuts.length;
    }

    isInCart(id: string): boolean {
        return this.cartProdcuts.some(p => p.id === id);
    }
}