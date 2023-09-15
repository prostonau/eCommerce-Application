import './style.scss';
import APICartNau from '../../controller/apiCartNau';
import { ApiCatalog } from '../../controller/apiCatalog';
import Page from '../core/templates/page';
import { ProductCardInCart } from './productCardinCart';

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
  }

  render() {
    this.container.innerHTML = '';
    const title = this.createHeaderTitle('Cart page');
    this.container.append(title);
    this.generateAddedProducts();
    this.generateAssideBar();
    this.container.append(this.bodyContainer);
    return this.container;
  }

  async generateAddedProducts() {
    const cart = await APICartNau.getCartbyCartId(this.cartId, this.token);
    const cardContainer = document.createElement('div');
    cart?.lineItems.forEach(async (item) => {
      const product = await this.api.queryProducts(APICartNau.getToken() || '', `filter=id: "${item.productId}"`);
      if (product?.results[0]) {
        const productCartCard = new ProductCardInCart(product?.results[0], this.cartId);
        cardContainer.append(productCartCard.render());
      }
    });
    this.bodyContainer.append(cardContainer);
  }

  async generateAssideBar() {
    const cart = await APICartNau.getCartbyCartId(this.cartId, this.token);
    if (cart) {
      const productCartAside = document.createElement('aside');
      productCartAside.innerHTML = `Total price: ${(cart.totalPrice.centAmount / 100).toString()} USD`;
      this.bodyContainer.append(productCartAside);
    }
  }
}
