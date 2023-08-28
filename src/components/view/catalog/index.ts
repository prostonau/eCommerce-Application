import './style.scss';
import Page from '../core/templates/page';
import { apiCatalog } from '../../controller/apiCatalog';

class CatalogPage extends Page {
  static TextObject = {
    CatalogTitle: 'Catalog page',
  };
  api: apiCatalog;
  token: string;

  constructor(id: string) {
    super(id);
    this.api = new apiCatalog();
    this.token = localStorage.getItem('token') || '';
  }

  render() {
    const title = this.createHeaderTitle(CatalogPage.TextObject.CatalogTitle);
    this.container.append(title);

    if (this.token !== '') {
      const data = this.api.queryProducts(this.token);
      console.log(data);
    }
    return this.container;
  }

  generateProductCard(product: string) {
    return product;
  }

  generateProducts(products: [string]) {
    const productsEls = products.map((product) => {
      this.generateProductCard(product);
    });
    return productsEls;
  }
}

export default CatalogPage;
