import './scss/styles.scss';
import { Api } from './components/base/Api.ts';
import { ApiLayer } from './components/base/ApiLayer.ts';
import { API_URL } from './utils/constants.ts';
import { EventEmitter } from './components/base/Events.ts';
import { cloneTemplate, ensureElement } from './utils/utils.ts';

import { Cart } from './components/Models/Cart';
import { Catalog } from './components/Models/Catalog';
import { Customer } from './components/Models/Customer';
import { ICreateOrderRequest, ICreateOrderResponse } from './types/index.ts';

import { Header } from './components/View/Header.ts';
import { Gallery } from './components/View/Gallery.ts';
import { CatalogCard } from './components/View/Card/CatalogCard.ts';
import { PreviewCard } from './components/View/Card/PreviewCard.ts';
import { CartView } from './components/View/CartView.ts';
import { CartCard } from './components/View/Card/CartCard.ts';
import { Modal } from './components/View/Modal.ts';
import { OrderForm } from './components/View/Form/OrderForm.ts';
import { ContactsForm } from './components/View/Form/ContactsForm.ts';
import { Success } from './components/View/Success.ts';

const events = new EventEmitter();

let isSuccessDisplayed = false;

const api = new Api(API_URL);
const apiLayer = new ApiLayer(api);

const cartModel = new Cart([], events);
const catalogModel = new Catalog(events);
const customerModel = new Customer(events);

const headerElement = ensureElement<HTMLElement>('.header');
const galleryElement = ensureElement<HTMLElement>('.gallery');
const modalElement = ensureElement<HTMLElement>('#modal-container');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success')

const headerView = new Header(headerElement, events);
const galleryView = new Gallery(galleryElement);
const modalView = new Modal(modalElement, events);
const cartView = new CartView(cloneTemplate(basketTemplate), events);
const orderFormView = new OrderForm(cloneTemplate(orderTemplate) as HTMLFormElement, events);
const contactsFormView = new ContactsForm(cloneTemplate(contactsTemplate) as HTMLFormElement, events);

apiLayer.getProducts()
    .then(data => {
        catalogModel.setProductsList(data.items);
    })
    .catch(error => {
        console.error('Ошибка загрузки товаров:', error);
    });

events.on('catalog:changed', () => {
    const products = catalogModel.getProductsList();
    galleryView.items = products.map((product) => {
        const card = new CatalogCard(cloneTemplate(cardCatalogTemplate), events);
        const cardData = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            category: product.category,
        };

        return card.render(cardData);
    });
});

events.on('catalog:product-selected', () => {
    const selectedProduct = catalogModel.getSelectedProduct();
    if (selectedProduct) {
        const previewCardTemplate = cloneTemplate(cardPreviewTemplate);
        const previewCardView = new PreviewCard(previewCardTemplate, events);

        previewCardView.id = selectedProduct.id;
        previewCardView.title = selectedProduct.title;
        previewCardView.image = selectedProduct.image;
        previewCardView.description = selectedProduct.description;
        previewCardView.category = selectedProduct.category;
        if (selectedProduct.price) {
            previewCardView.price = selectedProduct.price;
        } else {
            previewCardView.price = null;
        }
        previewCardView.isInCart = cartModel.isInCart(selectedProduct.id);

        if (selectedProduct.price === null) {
            previewCardView.buttonDisabled = true;
        }

        const cardElement = previewCardView.render();

        modalView.content = cardElement;
        modalView.isOpen = true;
    }
});

events.on('catalog:card-click', (data: { id: string }) => {
    const { id } = data;
    const product = catalogModel.getProductById(id);
    catalogModel.setSelectedProduct(product);
});


events.on('cardPreview:button-click', () => {
    const product = catalogModel.getSelectedProduct();
    if (product) {
        if (cartModel.isInCart(product.id)) {
            cartModel.deleteCartProduct(product);
        } else {
            cartModel.addCartProduct(product);
        }
        events.emit('catalog:product-selected');
    }
});

events.on('cart:open', () => {
    modalView.content = cartView.render();
    modalView.isOpen = true;
});

events.on('card:delete', (obj: { id: string }) => {
    const { id } = obj;
    const product = catalogModel.getProductById(id);
    cartModel.deleteCartProduct(product);
});

events.on('cart:changed', () => {
    headerView.counter = cartModel.getTotalCount();

    const products = cartModel.getCartProducts();
    cartView.productsList = products.map((product, index) => {
        const card = new CartCard(cloneTemplate(cardBasketTemplate), events);

        card.index = ++index;
        card.id = product.id;
        card.title = product.title;
        card.price = product.price;
        return card.render();
    });

    cartView.totalPrice = cartModel.getTotalPrice();

    if (!isSuccessDisplayed) {
        modalView.content = cartView.render();
        modalView.isOpen = true;
    }
});

events.on('cart:open-order', () => {
    modalView.content = orderFormView.render();
    modalView.isOpen = true;
});

events.on('payment:changed', (data: { paymentMethod: 'card' | 'cash' }) => {
    customerModel.setPaymentMethod(data.paymentMethod);
    const errorMessage = customerModel.validateOrder();
    orderFormView.errors = errorMessage;
});

events.on('address:changed', (data: { address: string }) => {
    customerModel.setAddress(data.address);
    const errorMessage = customerModel.validateOrder();
    orderFormView.errors = errorMessage;
});

events.on('order:submit', () => {
    modalView.content = contactsFormView.render();
    modalView.isOpen = true;
});

events.on('contacts:email-changed', (data: { email: string }) => {
    customerModel.setEmail(data.email);
    const errorMessage = customerModel.validateContact();
    contactsFormView.errors = errorMessage;
});

events.on('contacts:phone-changed', (data: { phone: string }) => {
    customerModel.setPhone(data.phone);
    const errorMessage = customerModel.validateContact();
    contactsFormView.errors = errorMessage;
});

events.on('contacts:submit', () => {
    const customerData = customerModel.getCustomerData();
    const cartProducts = cartModel.getCartProducts();
    
    const order: ICreateOrderRequest = {
        payment: customerData.paymentMethod,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        total: cartModel.getTotalPrice(),
        items: cartProducts.map(product => product.id)
    };
    
    apiLayer.createOrder(order)
        .then((response: ICreateOrderResponse) => {
            const success = new Success(cloneTemplate(successTemplate), events);
            success.total = response.total;
            modalView.content = success.render();
            isSuccessDisplayed = true;
            
            cartModel.clearCart();
            customerModel.clearCustomerData();
            orderFormView.clear();
            contactsFormView.clear();
        })
        .catch(error => {
            console.error('Ошибка при оформлении заказа:', error);
        });
});


events.on('modal:close', () => {
    modalView.isOpen = false;
    isSuccessDisplayed = false;
});

events.on('success:close', () => {
    modalView.isOpen = false;
    isSuccessDisplayed = false;
});