import { Api } from './components/base/Api.ts';
import { ApiLayer } from './components/base/ApiLayer.ts';
import { API_URL } from './utils/constants.ts';
import { Cart } from './components/Models/Cart';
import { Catalog } from './components/Models/Catalog';
import { Customer } from './components/Models/Customer';
import './scss/styles.scss';
import { apiProducts } from './utils/data';

//Проверка методов класса Catalog
const сatalogModel = new Catalog();

сatalogModel.setProductsList(apiProducts.items);
console.log(`Массив товаров из каталога: `, сatalogModel.getProductsList());

const firstProduct = сatalogModel.getProductById(apiProducts.items[0].id);
console.log(`Первый товар из каталога: `, firstProduct);

сatalogModel.setSelectedProduct(сatalogModel.getProductsList()[2]);
console.log(`Выбранный товар из каталога: `, сatalogModel.getSelectedProduct());

//Проверка методов класса Cart
const сartModel = new Cart();

сartModel.addCartProduct(сatalogModel.getProductsList()[2]);

сartModel.addCartProduct(сatalogModel.getProductsList()[1]);

console.log(`Массив товаров в корзине: `, сartModel.getCartProducts());
console.log('Наличие товара с id=1 в корзине:', сartModel.isInCart('1'));
console.log(`Общая сумма товаров в корзине: `, сartModel.getTotalPrice());
console.log(`Общее количество товаров в корзине: `, сartModel.getTotalCount());

сartModel.deleteCartProduct(сartModel.getCartProducts()[0]);
console.log(`Массив товаров в корзине после удаления товара: `, сartModel.getCartProducts());
сartModel.clearCart();
console.log(`Массив товаров в корзине после очистки корзины: `, сartModel.getCartProducts());

//Проверка методов класса Customer
const customerModel = new Customer();

customerModel.setEmail('test@example.com');
customerModel.setPhone('+79991234567');
customerModel.setAddress('ул. Мира, д. 123');
customerModel.setPaymentMethod('card');

console.log(`Данные покупателя: `, customerModel.getCustomerData());

console.log(`Валидация email покупателя: `, customerModel.validateCustomerData('email'));
console.log(`Валидация телефона покупателя: `, customerModel.validateCustomerData('phone'));
console.log(`Валидация адреса покупателя: `, customerModel.validateCustomerData('address'));
console.log(`Валидация метода оплаты покупателя: `, customerModel.validateCustomerData('paymentMethod'));

customerModel.clearCustomerData();
console.log(`Данные покупателя после очистки: `, customerModel.getCustomerData());

//Проверка методов класса ApiLayer
const apiLayer = new ApiLayer(new Api(API_URL));

apiLayer.getProducts()
    .then(data => {
        console.log(`Каталог товаров с сервера: `, data);

        const serverCatalogModel = new Catalog();
        serverCatalogModel.setProductsList(data.items);

        console.log(`Сохранённый каталог товаров: `, serverCatalogModel.getProductsList());
    })
    .catch(error => {
        console.error('Ошибка при получении каталога товаров:', error);
    });