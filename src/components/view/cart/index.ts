import APICartNau from '../../controller/apiCartNau';
import { ApiCatalog } from '../../controller/apiCatalog';
import Page from '../core/templates/page';

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
    this.container.append(this.bodyContainer);
    return this.container;
  }

  async generateAddedProducts() {
    const cart = await APICartNau.getCartbyCartId(this.cartId, this.token);
    cart?.lineItems.forEach((item) => {
      const productCartCard = document.createElement('div');
      productCartCard.innerHTML = item.name['en-US'];
      this.bodyContainer.append(productCartCard);
    });
  }
}
