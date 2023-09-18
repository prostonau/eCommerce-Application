import './style.scss';
import APICartNau from '../../controller/apiCartNau';
import { ApiCatalog } from '../../controller/apiCatalog';
import Page from '../core/templates/page';
import { ProductCardInCart } from './productCardinCart';
import { EventDelegator } from '../../features/eventDelegator';
import InputBox from '../core/templates/input';
import { CartResponce } from '../../../types';

export class CartPage extends Page {
  static TextObject = {
    CatalogTitle: 'Catalog page',
  };
  api: ApiCatalog;
  token: string;
  bodyContainer: HTMLElement;
  productList: HTMLDivElement;
  cartApi: APICartNau;
  cartId: string;
  productCartAside: HTMLElement;
  cardContainer: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.api = new ApiCatalog();
    this.token = localStorage.getItem('token') || localStorage.getItem('anonymousToken') || '';
    this.cartId = localStorage.getItem('cartId') || localStorage.getItem('cartAnonimusId') || '';
    this.bodyContainer = document.createElement('section');
    this.bodyContainer.classList.add('container__cart');
    this.productList = document.createElement('div');
    this.productList.classList.add('cart__list');
    this.cartApi = new APICartNau();
    this.productCartAside = document.createElement('aside');
    this.productCartAside.classList.add('cart__asside');
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('cart__box');
  }

  render() {
    this.container.innerHTML = '';
    const title = this.createHeaderTitle('Cart page');
    this.container.append(title);
    this.generateAddedProducts();
    this.generateAssideBar();

    this.bodyContainer.append(this.cardContainer, this.productCartAside);
    this.container.append(this.bodyContainer);
    return this.container;
  }

  async generateAddedProducts() {
    this.cardContainer.innerHTML = '';
    let cart = await APICartNau.getCartbyCartId(this.cartId, this.token);
    if (cart && cart?.lineItems.length > 0) {
      cart?.lineItems.forEach(async (item) => {
        const product = await this.api.queryProducts(APICartNau.getToken() || '', `filter=id: "${item.productId}"`);
        if (product?.results[0]) {
          const productCartCard = new ProductCardInCart(product?.results[0], this.cartId, item);
          const productCartCardEl = productCartCard.render();

          EventDelegator.addDelegatedListener('click', productCartCard.decButton, async () => {
            productCartCard.inputQuantity.setValue(
              (+productCartCard.inputQuantity.getValue() - 1 > 0
                ? +productCartCard.inputQuantity.getValue() - 1
                : 1
              ).toString()
            );
            cart = await APICartNau.updateProductQuantityInCart(
              this.cartId,
              this.token,
              item.id,
              +productCartCard.inputQuantity.getValue()
            );
            this.generateAssideBar();
            this.updatePrice(productCartCard);
            console.log('Запрос на обновление корзины');
          });

          EventDelegator.addDelegatedListener('click', productCartCard.incButton, async () => {
            productCartCard.inputQuantity.setValue((+productCartCard.inputQuantity.getValue() + 1).toString());
            cart = await APICartNau.updateProductQuantityInCart(
              this.cartId,
              this.token,
              item.id,
              +productCartCard.inputQuantity.getValue()
            );
            this.generateAssideBar();
            this.updatePrice(productCartCard);
            console.log('Запрос на обновление корзины');
          });

          EventDelegator.addDelegatedListener('input', productCartCard.inputQuantity.render(), async () => {
            cart = await APICartNau.updateProductQuantityInCart(
              this.cartId,
              this.token,
              item.id,
              +productCartCard.inputQuantity.getValue() > 0 ? +productCartCard.inputQuantity.getValue() : 1
            );
            this.generateAssideBar();
            this.updatePrice(productCartCard);
            console.log('Запрос на обновление корзины');
          });

          EventDelegator.addDelegatedListener('click', productCartCard.cardToCart, async () => {
            cart = await APICartNau.updateProductQuantityInCart(this.cartId, this.token, item.id, 0);
            this.generateAssideBar();
            APICartNau.showNotification('Removed');
            productCartCardEl.id = 'removed';
            this.updatePrice(productCartCard);
            console.log('Запрос на обновление корзины');
          });

          this.cardContainer.append(productCartCardEl);
        }
      });
    } else {
      this.renderEmptyCart();
      console.log('корзина пуста');
    }
  }

  async generateAssideBar() {
    this.productCartAside.innerHTML = '';
    const cart = await APICartNau.getCartbyCartId(this.cartId, this.token);
    if (cart) {
      if (cart.totalPrice.centAmount == 0) {
        this.renderEmptyCart();
        this.productCartAside.classList.add('asside__hidden');
      } else {
        this.productCartAside.classList.remove('asside__hidden');
        const assideTitle = document.createElement('h3');
        assideTitle.classList.add('asside__title');
        this.updateTotalPrice(cart, assideTitle);

        const assideText = document.createElement('p');
        assideText.classList.add('asside__text');
        assideText.innerHTML = `Have a discount code?`;

        const assideCodeForm = document.createElement('form');

        const assideInputCode = new InputBox('input', 'asside__code-input', 'text', '', 'MAXSCORE', false);
        const assideCodeButton = document.createElement('button');
        assideCodeButton.classList.add('asside__button');
        assideCodeButton.innerText = 'Apply Code';

        assideCodeForm.append(assideInputCode.render(), assideCodeButton);

        EventDelegator.addDelegatedListener('click', assideCodeButton, async (ev) => {
          ev?.preventDefault();
          const cart = await APICartNau.addDiscountCode(this.cartId, this.token, assideInputCode.getValue());
          if (cart) {
            this.updateTotalPrice(cart, assideTitle);
          }
        });

        const assideSuportText = document.createElement('p');
        assideSuportText.classList.add('support__text');
        assideSuportText.innerHTML = `Codes for testing: <br> MAXSCORE, TEST`;

        const assideClearButton = document.createElement('button');
        assideClearButton.classList.add('asside__button-clear');
        assideClearButton.innerText = 'Clear Cart';

        EventDelegator.addDelegatedListener('click', assideClearButton, async () => {
          let cart = await APICartNau.getCartbyCartId(this.cartId, this.token);
          if (cart && cart.lineItems.length > 0) {
            const items = cart.lineItems.map((item) => {
              return { action: 'removeLineItem', lineItemId: item.id };
            });
            cart = await APICartNau.removeLineItemFromCart(this.cartId, this.token, items);
            this.generateAssideBar();
            this.renderEmptyCart();
          }
        });

        this.productCartAside.append(assideTitle, assideText, assideCodeForm, assideSuportText, assideClearButton);
      }
    }
  }

  updateTotalPrice(cart: CartResponce, header: HTMLElement) {
    const discount = cart.lineItems.reduce((acc, item) => {
      acc += (item.price.value.centAmount / 100) * item.quantity;
      return acc;
    }, 0);
    if (discount !== cart.totalPrice.centAmount / 100) {
      header.innerHTML = `Price: ${discount} USD<br><span id>Total price: ${(
        cart.totalPrice.centAmount / 100
      ).toString()} USD</span>`;
      header.classList.add('discounted');
    } else {
      header.innerHTML = `Total price: ${(cart.totalPrice.centAmount / 100).toString()} USD`;
      header.classList.remove('discounted');
    }
  }

  updatePrice(productCartCard: ProductCardInCart) {
    productCartCard.cardPrice.innerHTML = productCartCard.getPrice('USD');
    if (productCartCard.getPrice('USD').includes('<span')) {
      productCartCard.cardPrice.classList.add('card__price--discounted');
    }
  }

  renderEmptyCart() {
    this.cardContainer.innerHTML = '';
    const cartTitle = document.createElement('h3');
    cartTitle.classList.add('empty_cart__title');
    cartTitle.innerHTML = 'Cart is Empty <br> <a href="#catalog" class="cart__catalog-link">Go to Catalog</a>';

    const cartImg = document.createElement('img');
    cartImg.classList.add('empty_cart__img');
    cartImg.src = './images/empty.png';

    this.cardContainer.append(cartTitle, cartImg);
  }
}
