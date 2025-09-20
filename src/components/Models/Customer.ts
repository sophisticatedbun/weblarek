import { ICustomer } from "../../types";

export class Customer {
    private paymentMethod: "card" | "cash" | null = null;
    private email: string = "";
    private phone: string = "";
    private address: string = "";

    setEmail(email: string): void {
        this.email = email;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    setPaymentMethod(paymentMethod: "card" | "cash" | null): void {
        this.paymentMethod = paymentMethod;
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
    }
    validateCustomerData(field: string): boolean {
        if (field === "paymentMethod") {
            return this.paymentMethod === "card" || this.paymentMethod === "cash";
        }

        const value = (this as any)[field];
        return typeof value === "string" && value.trim().length > 0;
    }
}