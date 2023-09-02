import './style.scss';
import Page from '../core/templates/page';
import { apiCatalog } from '../../controller/apiCatalog';
import { Category, Product, ProductProps, ProductResponse } from '../../../types';
import { ProductCard } from './poductCard';
import { EventDelegator } from '../../features/eventDelegator';
import { createQueryFromProps } from '../../features/createQueryFromProps';
import SelectBox from '../core/templates/select';
import Label from '../core/templates/label';

class CatalogPage extends Page {
  static TextObject = {
    CatalogTitle: 'Catalog page',
  };
  api: apiCatalog;
  token: string;
  bodyContainer: HTMLElement;
  productList: HTMLDivElement;
  categoryList: HTMLDivElement;
  productProps: ProductProps;
  filters: HTMLDivElement;
  navigation: HTMLElement;
  sorters: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.api = new apiCatalog();
    this.token = localStorage.getItem('token') || '';
    this.bodyContainer = document.createElement('section');
    this.bodyContainer.classList.add('container__catalog');
    this.productList = document.createElement('div');
    this.productList.classList.add('catalog__list');

    this.productProps = { category: '', filter: { type: '', size: '', color: '' }, sort: '' };

    this.navigation = document.createElement('nav');
    this.navigation.classList.add('navigation');

    this.categoryList = document.createElement('div');
    this.categoryList.classList.add('category__tree');

    this.filters = document.createElement('div');
    this.filters.classList.add('filters');

    this.sorters = document.createElement('div');
    this.sorters.classList.add('sorters');

    this.navigation.append(this.categoryList, this.filters, this.sorters);

    this.bodyContainer.append(this.navigation, this.productList);
  }

  render() {
    this.container.innerHTML = '';
    const title = this.createHeaderTitle(CatalogPage.TextObject.CatalogTitle);
    this.container.append(title);
    this.generateCategoryTree();
    this.generateProducts();
    this.generateFilters();

    this.container.append(this.bodyContainer);
    return this.container;
  }

  async getProducts(): Promise<void | ProductResponse> {
    if (this.token !== '') {
      const data = await this.api.queryProducts(this.token, createQueryFromProps(this.productProps));
      console.log(createQueryFromProps(this.productProps));
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
    this.productList.innerHTML = '';
    if (products) {
      products.results?.forEach((product) => {
        this.productList.append(this.generateProductCard(product));
      });
    }
  }

  async generateCategoryTree(): Promise<void> {
    const categories = await this.api.queryCategories(this.token);
    this.categoryList.innerHTML = '';

    const categoryListTitle = document.createElement('h3');
    categoryListTitle.innerHTML = 'Categories';
    categoryListTitle.classList.add('category__title');
    categoryListTitle.classList.add('category__current');

    EventDelegator.addDelegatedListener('click', categoryListTitle, () => {
      document.querySelectorAll('.category__current').forEach((el) => el.classList.remove('category__current'));
      categoryListTitle.classList.add('category__current');
      this.productProps.category = ``;
      this.generateProducts();
    });

    this.categoryList.append(categoryListTitle);

    document.createElement('ul');

    if (categories) {
      const tree = this.buildTree(categories, '', 0);
      tree.forEach((ul) => this.categoryList.appendChild(ul));
    }
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

  generateFilters() {
    const typeFilter = this.addFilterField('type__select', ['Type', '', 'Bag', 'Jewelry'], 'type');
    const sizeFilter2 = this.addFilterField('size__select', ['Size', '', 'Small', 'Large', 'Medium'], 'size');
    const colorFilter2 = this.addFilterField(
      'color__select',
      ['Color', '', 'Blue', 'White', 'Green', 'Black'],
      'color'
    );

    const filterBoxTitle = document.createElement('h3');
    filterBoxTitle.classList.add('filter__box_title');
    filterBoxTitle.innerText = 'Filters';

    this.filters.append(filterBoxTitle, typeFilter, sizeFilter2, colorFilter2);
  }

  addFilterField(id: string, options: string[], atrName: 'type' | 'size' | 'color'): HTMLElement {
    const filterBox = document.createElement('div');
    filterBox.classList.add('filter__box');

    const typeFilter = new SelectBox('select', 'filter__input', id, false);
    typeFilter.addOptions(options[0], ...options.slice(1)); // TODO optiongenerator

    const typeFilterLabel = new Label('label', 'filter__label', `${id}`);
    typeFilterLabel.render().innerText = `Select ${atrName}`;

    EventDelegator.addDelegatedListener('change', typeFilter.render(), () => {
      this.productProps.filter[atrName] = typeFilter.getValue()
        ? `filter=variants.attributes.${atrName}.key:"${typeFilter.getValue()}"`
        : '';
      this.generateProducts();
    });

    filterBox.append(typeFilterLabel.render(), typeFilter.render());
    return filterBox;
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

    EventDelegator.addDelegatedListener('click', li, () => {
      document.querySelectorAll('.category__current').forEach((el) => el.classList.remove('category__current'));
      li.classList.add('category__current');
      this.productProps.category = `filter=categories.id:subtree("${li.getAttribute('data_category-id')}")`;
      this.generateProducts();
    });

    ul.append(li);
  }
}

export default CatalogPage;
