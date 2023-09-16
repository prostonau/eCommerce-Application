import './style.scss';
import APICartNau from '../../controller/apiCartNau';
import { ApiCatalog } from '../../controller/apiCatalog';
import Page from '../core/templates/page';
import { ProductCardInCart } from './productCardinCart';
import { EventDelegator } from '../../features/eventDelegator';

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
    this.productList.classList.add('catalog__list');
    this.cartApi = new APICartNau();
    this.productCartAside = document.createElement('aside');
    this.productCartAside.classList.add('cart__asside');
    this.cardContainer = document.createElement('div');
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
    cart?.lineItems.forEach(async (item) => {
      const product = await this.api.queryProducts(APICartNau.getToken() || '', `filter=id: "${item.productId}"`);
      if (product?.results[0]) {
        const productCartCard = new ProductCardInCart(product?.results[0], this.cartId, item);

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
          console.log('Запрос на обновление корзины');
        });

        this.cardContainer.append(productCartCard.render());
      }
    });
  }

  async generateAssideBar() {
    this.productCartAside.innerHTML = '';
    const cart = await APICartNau.getCartbyCartId(this.cartId, this.token);
    if (cart) {
      this.productCartAside.innerHTML = `Total price: ${(cart.totalPrice.centAmount / 100).toString()} USD`;
    }
  }
}
