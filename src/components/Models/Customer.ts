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
    validateCustomerData(field: string): string {
        if (field === "paymentMethod") {
            if (this.paymentMethod === "card" || this.paymentMethod === "cash") {
                return "";
            }
            return "Необходимо выбрать способ оплаты";
        }

        const value = (this as any)[field];
        if (value.trim().length > 0) {
            return "";
        }
        
        if (field === "email") {
            return "Необходимо указать email";
        }
        if (field === "phone") {
            return "Необходимо указать телефон";
        }
        if (field === "address") {
            return "Необходимо указать адрес доставки";
        }
        
        return "Поле не может быть пустым";
    }
    
    validateOrder(): string {
        const paymentError = this.validateCustomerData("paymentMethod");
        if (paymentError) {
            return paymentError;
        }
        
        const addressError = this.validateCustomerData("address");
        if (addressError) {
            return addressError;
        }
        
        return "";
    }
    
    validateContact(): string {
        const emailError = this.validateCustomerData("email");
        if (emailError) {
            return emailError;
        }
        
        const phoneError = this.validateCustomerData("phone");
        if (phoneError) {
            return phoneError;
        }
        
        return "";
    }
}