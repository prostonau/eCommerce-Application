import './style.scss';
import Page from '../core/templates/page';
import { ApiCatalog } from '../../controller/apiCatalog';
import { Category, Product, ProductProps, ProductResponse } from '../../../types';
import { ProductCard } from './poductCard';
import { EventDelegator } from '../../features/eventDelegator';
import { createQueryFromProps } from '../../features/createQueryFromProps';
import SelectBox from '../core/templates/select';
import Label from '../core/templates/label';
import InputBox from '../core/templates/input';
import APICartNau from '../../controller/apiCartNau';

const searchIco = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="15" height="15" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
viewBox="0 0 500 500"
 xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs>
  <style type="text/css">
   <![CDATA[
    .fil1 {fill:#202020}
   ]]>
  </style>
 </defs>
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <path class="fil1" d="M289 90c53,52 53,138 0,191 -53,53 -138,53 -191,0 -53,-53 -53,-139 0,-191 53,-53 138,-53 191,0zm27 -27c59,59 67,149 23,216l125 104c22,18 21,53 0,73 -20,21 -55,22 -73,0l-104 -125c-67,43 -157,35 -216,-23 -68,-68 -68,-178 0,-245 68,-68 177,-68 245,0z"/>
 </g>
</svg>`;

class CatalogPage extends Page {
  static TextObject = {
    CatalogTitle: 'Catalog page',
  };
  api: ApiCatalog;
  token: string;
  bodyContainer: HTMLElement;
  productList: HTMLDivElement;
  categoryList: HTMLDivElement;
  productProps: ProductProps;
  filters: HTMLDivElement;
  navigation: HTMLElement;
  sorters: HTMLDivElement;
  search: HTMLDivElement;
  hideBtn: HTMLButtonElement;
  limit: number;
  pageId: number;
  offset: number;

  constructor(id: string) {
    super(id);
    this.api = new ApiCatalog();
    this.token = localStorage.getItem('token') || localStorage.getItem('anonymousToken') || '';
    this.bodyContainer = document.createElement('section');
    this.bodyContainer.classList.add('container__catalog');
    this.productList = document.createElement('div');
    this.productList.classList.add('catalog__list');
    this.limit = 4;
    this.pageId = 0;
    this.offset = 0;
    this.productProps = {
      category: '',
      filter: { type: '', size: '', color: '' },
      sort: '',
      search: '',
      offset: `limit=${this.limit}`,
      limit: `offset=${this.offset}`,
    };

    this.navigation = document.createElement('nav');
    this.navigation.classList.add('navigation');

    this.categoryList = document.createElement('div');
    this.categoryList.classList.add('category__tree');

    this.filters = document.createElement('div');
    this.filters.classList.add('filters');

    this.sorters = document.createElement('div');
    this.sorters.classList.add('sorters');

    this.search = document.createElement('div');
    this.search.classList.add('search');

    this.hideBtn = document.createElement('button');
    this.hideBtn.classList.add('open__menu');
    this.hideBtn.innerText = '>';

    EventDelegator.addDelegatedListener('click', this.hideBtn, () => {
      this.navigation.classList.toggle('navigation--open');
      this.hideBtn.classList.toggle('open__menu--open');
    });

    this.navigation.append(this.search, this.categoryList, this.filters, this.sorters);

    this.bodyContainer.append(this.hideBtn, this.navigation, this.productList);
  }

  clearPaginationSettings() {
    this.limit = 4;
    this.pageId = 0;
    this.offset = 0;
    this.productProps.offset = `limit=4`;
    this.productProps.limit = `offset=0`;
  }

  render() {
    this.container.innerHTML = '';
    const title = this.createHeaderTitle(CatalogPage.TextObject.CatalogTitle);
    this.container.append(title);
    this.generateCategoryTree();
    this.generateProducts();
    this.generateFilters();
    this.addSortField();
    this.addSearchField();
    //this.addPaginationContainer();

    this.container.append(this.bodyContainer);
    return this.container;
  }

  async getProducts(): Promise<void | ProductResponse> {
    if (this.token !== '') {
      // console.log('AAAA = ', this.productProps);
      const data = await this.api.queryProducts(this.token, createQueryFromProps(this.productProps));
      // console.log('-----------------------------------------------------------------------------------');
      // console.log('createQueryFromProps(this.productProps) = ', createQueryFromProps(this.productProps));
      // console.log('data =', data);
      if (data) {
        return data;
      }
    }
  }

  generateProductCard(product: Product, cartId: string | null): HTMLElement {
    const cardBody = new ProductCard(product, cartId);

    return cardBody.render();
  }

  async generateProducts(): Promise<void> {
    const loader = document.querySelector('.loader777') as HTMLDivElement;
    loader.style.display = 'block'; // показать загрузчик
    const catalogList = document.querySelector('.catalog__list') as HTMLDivElement;
    if (catalogList) {
      catalogList.style.display = 'none';
    }
    const products = await this.getProducts();
    this.productList.innerHTML = '';
    let flag = true;
    const element = document.querySelector('.pagination__container_wrapper');
    if (element) {
      element.remove();
    }
    const cartId = APICartNau.getCartId();
    if (products) {
      products.results?.forEach((product) => {
        this.productList.append(this.generateProductCard(product, cartId));
        const catalog__list = document.querySelector('.container__catalog');
        if (flag) {
          const element = document.querySelector('.pagination__container_wrapper');
          if (element) {
            element.remove();
          }
          const paginationContainerPromise = this.addPaginationContainer();
          paginationContainerPromise.then((paginationContainer) => {
            (catalog__list as HTMLDivElement).append(paginationContainer);
          });
          flag = false;
        }
      });
    }
    loader.style.display = 'none';
    if (catalogList) {
      catalogList.style.display = 'flex';
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
      // console.log('start clear');
      this.clearPaginationSettings();
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
    const typeFilter = this.addFilterField('type__select', ['Type', '', 'Men', 'Women', 'Unisex', 'Child'], 'type');
    const sizeFilter = this.addFilterField('size__select', ['Size', '', 'S', 'L', 'M', 'XL'], 'size');
    const colorFilter = this.addFilterField('color__select', ['Color', '', 'White', 'Black', 'Red', 'Blue'], 'color');

    const filterBoxTitle = document.createElement('h3');
    filterBoxTitle.classList.add('filter__box_title');
    filterBoxTitle.innerText = 'Filters';

    this.filters.append(filterBoxTitle, typeFilter, sizeFilter, colorFilter);
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
      this.clearPaginationSettings();
      this.generateProducts();
    });

    filterBox.append(typeFilterLabel.render(), typeFilter.render());
    return filterBox;
  }

  addSortField() {
    const sortTitle = document.createElement('h3');
    sortTitle.classList.add('sort__title');
    sortTitle.innerText = 'Sorting';

    const sortBox = document.createElement('div');
    sortBox.classList.add('sort__box');

    const typeSort = new SelectBox('select', 'sort__input', '', false);
    typeSort.addOptions('sort', '', 'name', 'price asc', 'price desc');

    EventDelegator.addDelegatedListener('change', typeSort.render(), () => {
      this.productProps.sort = typeSort.getValue()
        ? `sort=${typeSort.getValue() === 'name' ? 'name.en-us asc' : typeSort.getValue()}`
        : '';
      this.clearPaginationSettings();
      this.generateProducts();
    });

    const typeSortLabel = new Label('label', 'sort__label', '');
    typeSortLabel.render().innerText = `Sort by:`;

    sortBox.append(typeSortLabel.render(), typeSort.render());

    this.sorters.append(sortTitle, sortBox);
  }

  addSearchField() {
    const searchBox = document.createElement('form');
    searchBox.classList.add('search__box');

    const searchTitle = document.createElement('h3');
    searchTitle.innerHTML = 'Search';
    searchTitle.classList.add('search__title');

    const searchField = new InputBox('input', 'search__field', 'text', '', 'Search', false);

    const searchButton = document.createElement('button');
    searchButton.classList.add('search__button');
    searchButton.type = 'submit';
    searchButton.innerHTML = searchIco;

    searchButton.addEventListener('click', (ev) => {
      ev?.preventDefault();
      this.productProps.search = searchField.getValue() ? `fuzzy=true&text.en-us="${searchField.getValue()}"` : '';
      this.clearPaginationSettings();
      this.generateProducts();
    });

    searchBox.append(searchField.render(), searchButton);
    this.search.append(searchTitle, searchBox);
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
      // console.log('start BBBBBBBBBBBBBBBBBBBBBB');
      this.clearPaginationSettings();
      this.generateProducts();
    });

    ul.append(li);
  }

  async addPaginationContainer() {
    const paginationContainerWrapper = document.createElement('div');
    paginationContainerWrapper.classList.add('pagination__container_wrapper');
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination__container');
    paginationContainerWrapper.append(paginationContainer);

    await this.getProducts().then((data) => {
      // console.log('data = ', data);
      let numberOfPages = 0;
      if (data?.total) numberOfPages = Math.ceil(data.total / this.limit);

      // console.log('numberOfPages =', numberOfPages);

      for (let i = 0; i < numberOfPages; i++) {
        const button = document.createElement('button');
        button.classList.add('paggination__button');
        button.innerHTML = (i + 1).toString();
        if (this.pageId === i) button.classList.toggle('actvie_pag_button');

        button.addEventListener('click', (e) => {
          e?.preventDefault();
          this.pageId = i;
          // this.offset = i * this.limit;
          // this.limit = 4;
          this.productProps.offset = `offset=${i * this.limit}`;
          this.productProps.limit = `limit=${this.limit}`;
          // console.log('this.pageId = ', this.pageId);
          // console.log('this.offset = ', this.offset);
          this.generateProducts();
        });

        paginationContainer.append(button);
      }
    });

    //this.container.append(paginationContainerWrapper);
    return paginationContainerWrapper;
  }
}

export default CatalogPage;
