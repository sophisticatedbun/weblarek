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

    validateCustomerData(value: string): boolean {
        switch (value) {
            case "paymentMethod":
                return this.paymentMethod === "card" || this.paymentMethod === "cash";
            case "email":
                return /^[\w.-]+@[\w.-]+\.\w+$/.test(this.email);
            case "phone":
                return /^\+?[0-9]{7,15}$/.test(this.phone);
            case "address":
                return this.address.trim().length > 0;
            default:
                return false;
        }
    }
}