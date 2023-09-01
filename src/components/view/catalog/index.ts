import './style.scss';
import Page from '../core/templates/page';
import { apiCatalog } from '../../controller/apiCatalog';
import { Category, Product, ProductResponse } from '../../../types';
import { ProductCard } from './poductCard';

class CatalogPage extends Page {
  static TextObject = {
    CatalogTitle: 'Catalog page',
  };
  api: apiCatalog;
  token: string;
  bodyContainer: HTMLElement;

  constructor(id: string) {
    super(id);
    this.api = new apiCatalog();
    this.token = localStorage.getItem('token') || '';
    this.bodyContainer = document.createElement('section');
    this.bodyContainer.classList.add('container__catalog');
  }

  render() {
    const title = this.createHeaderTitle(CatalogPage.TextObject.CatalogTitle);
    this.container.append(title);
    this.generateCategoryTree().then(() => {
      this.generateProducts();
    });
    this.container.append(this.bodyContainer);
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
    productList.classList.add('catalog__list');
    if (products) {
      products.results?.forEach((product) => {
        productList.append(this.generateProductCard(product));
      });
    }

    this.bodyContainer.append(productList);
  }

  async generateCategoryTree(): Promise<void> {
    const categories = await this.api.queryCategories(this.token);
    const categoryList = document.createElement('div');
    categoryList.classList.add('category__tree');
    document.createElement('ul');

    if (categories) {
      const tree = this.buildTree(categories, '', 0);
      tree.forEach((ul) => categoryList.appendChild(ul));
    }
    this.bodyContainer.append(categoryList);
  }

  buildTree(data: Category[], parentId: string, level: number) {
    const ul = document.createElement('ul');
    if (parentId === '') {
      data
        .filter((item) => item.ancestors.length == 0)
        .forEach((item) => {
          this.addLi(data, item, ul, level);
        });
    }

    data
      .filter((item) => item.parent && item.parent.id === parentId)
      .forEach((item) => {
        this.addLi(data, item, ul, level);
      });
    return [ul];
  }

  addLi(data: Category[], item: Category, ul: HTMLElement, level: number) {
    const li = document.createElement('li');
    li.textContent = item.name['en-US'];
    li.setAttribute('data_category-id', item.id);
    this.buildTree(data, item.id, level + 1).forEach((childUl) => {
      if (childUl.hasChildNodes()) {
        li.appendChild(childUl);
      }
    });
    ul.append(li);
  }
}

export default CatalogPage;
