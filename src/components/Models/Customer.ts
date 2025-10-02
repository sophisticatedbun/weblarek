import { ICustomer } from "../../types";
import { IEvents } from "../base/Events";

export class Customer {
    private paymentMethod: "card" | "cash" | null;
    private email: string;
    private phone: string;
    private address: string;
    private events: IEvents;

    constructor(events: IEvents) {
        this.paymentMethod = null;
        this.email = "";
        this.phone = "";
        this.address = "";
        this.events = events;
    }

    setEmail(email: string): void {
        this.email = email;
        this.events.emit('customer:changed');
    }

    setPhone(phone: string): void {
        this.phone = phone;
        this.events.emit('customer:changed');
    }

    setAddress(address: string): void {
        this.address = address;
        this.events.emit('customer:changed');
    }

    setPaymentMethod(paymentMethod: "card" | "cash" | null): void {
        this.paymentMethod = paymentMethod;
        this.events.emit('customer:changed');
    }

    getCustomerData(): ICustomer {
        return {
            paymentMethod: this.paymentMethod,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    clearCustomerData(): void {
        this.paymentMethod = null;
        this.email = "";
        this.phone = "";
        this.address = "";
        this.events.emit('customer:changed');
    }
    validateCustomerData(field: string): boolean {
        if (field === "paymentMethod") {
            return this.paymentMethod === "card" || this.paymentMethod === "cash";
        }

        const value = (this as any)[field];
        return value.trim().length > 0;
    }
}