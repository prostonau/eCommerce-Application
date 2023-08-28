import { ProductResponse } from '../../types';
import AppAPI from './api';

export class apiCatalog extends AppAPI {
  barierToken: string;
  constructor() {
    super();
    this.barierToken = 'Basic ' + btoa(`${this.secret}:${this.scope}`);
  }

  //https://api.{region}.commercetools.com/{projectKey}/products
  queryProducts(BEARER_TOKEN: string): Promise<ProductResponse | void> {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/products?limit=2&offset=2`, options)
      .then((response) => response.json())
      .then((data: ProductResponse) => {
        console.log('getQueryProducts = ', data);
        return data;
      })
      .catch((error) => console.error(error));
  }
}
