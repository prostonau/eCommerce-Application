import './style.scss';
import Page from '../core/templates/page';
import { apiCatalog } from '../../controller/apiCatalog';
import { Product, ProductResponse } from '../../../types';
import { ProductCard } from './poductCard';

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
    this.generateProducts();
    return this.container;
  }

  async getProducts(): Promise<void | ProductResponse> {
    if (this.token !== '') {
      const data = await this.api.queryProducts(this.token);
      if (data) {
        return data;
      }
    }
  }

  generateProductCard(product: Product): HTMLElement {
    const cardBody = new ProductCard(product);

    return cardBody.render();
  }

  async generateProducts(): Promise<void> {
    const products = await this.getProducts();
    const productList = document.createElement('div');
    if (products) {
      products.results.forEach((product) => {
        productList.append(this.generateProductCard(product));
      });
    }

    this.container.append(productList);
  }
}

export default CatalogPage;
