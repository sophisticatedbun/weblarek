import { IApi, IGetProducts, ICreateOrderRequest, ICreateOrderResponse } from '../../types';

export class ApiLayer {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IGetProducts> {
    return this.api.get('/product/');
  }

  createOrder(order: ICreateOrderRequest): Promise<ICreateOrderResponse> {
    return this.api.post('/order/', order);
  }
}