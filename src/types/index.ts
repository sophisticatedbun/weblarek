export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number | null;
}

export interface ICustomer {
    paymentMethod: "card" | "cash" | null;
    email: string;
    phone: string;
    address: string;
} 

export interface IGetProducts {
    totalCount: number;
    items: IProduct[];
}

export interface ICreateOrderRequest {
    payment: "card" | "cash" | null;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface ICreateOrderResponse {
    id: string;
    total: number;
}