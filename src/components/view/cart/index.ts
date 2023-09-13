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

  constructor(id: string) {
    super(id);
    this.api = new ApiCatalog();
    this.token = localStorage.getItem('token') || localStorage.getItem('anonymousToken') || '';
    this.bodyContainer = document.createElement('section');
    this.bodyContainer.classList.add('container__cart');
    this.productList = document.createElement('div');
    this.productList.classList.add('catalog__list');
  }

  render() {
    this.container.innerHTML = '';
    const title = this.createHeaderTitle('Cart page');
    this.container.append(title);

    this.container.append(this.bodyContainer);
    return this.container;
  }
}
