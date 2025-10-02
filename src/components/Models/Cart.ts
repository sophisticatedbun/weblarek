import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
    private cartProdcuts: IProduct[] = [];

    constructor(products: IProduct[] = [], protected events: IEvents) {
        this.cartProdcuts = products;
        this.events = events;
    }

    getCartProducts(): IProduct[] {
        return this.cartProdcuts;
    }

    addCartProduct(product: IProduct): void {
        this.cartProdcuts.push(product);
        this.events.emit('cart:changed');
    }

    deleteCartProduct(product: IProduct): void {
        this.cartProdcuts = this.cartProdcuts.filter(p => p.id !== product.id);
        this.events.emit('cart:changed');
    }

    clearCart(): void {
        this.cartProdcuts = [];
        this.events.emit('cart:changed');
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