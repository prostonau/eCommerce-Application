import { CategoryResponce, Category, ProductResponse } from '../../types';
import AppAPI from './api';

export class apiCatalog extends AppAPI {
  barierToken: string;
  constructor() {
    super();
    this.barierToken = 'Basic ' + btoa(`${this.secret}:${this.scope}`);
  }

  // https://api.{region}.commercetools.com/{projectKey}/products
  // fuzzy=true&text.en-us="jacket"
  // filter=categories.id:subtree("9531655b-f962-4e88-8386-88063584cfd7")
  // filter=variants.attributes.color.key:"White","Blue"
  // ${this.apiUrl}/${this.projectKey}/product-projections/search?limit=10&offset=0&text=${encodeURIComponent(searchQuery)}
  queryProducts(
    BEARER_TOKEN: string,
    props = 'filter=variants.attributes.color.key:"White","Blue"'
  ): Promise<ProductResponse | void> {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос ${this.apiUrl}/${this.projectKey}/product-projections/search?staged=true&limit=10&fuzzy=true&text.en-us="pan"
    return fetch(`${this.apiUrl}/${this.projectKey}/product-projections/search?${props}`, options)
      .then((response) => response.json())
      .then((data: ProductResponse) => {
        console.log('getQueryProducts = ', data);
        return data;
      })
      .catch((error) => console.error(error));
  }

  queryCategories(BEARER_TOKEN: string): Promise<Category[] | void> {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос ${this.apiUrl}/${this.projectKey}/product-projections/search?staged=true&limit=10&fuzzy=true&text.en-us="pan"
    return fetch(`${this.apiUrl}/${this.projectKey}/categories?limit=100`, options)
      .then((response) => response.json())
      .then((data: CategoryResponce) => {
        console.log('getQueryCategories = ', data);
        return data.results.sort((a, b) => a.ancestors.length - b.ancestors.length);
      })
      .catch((error) => console.error(error));
  }
}
