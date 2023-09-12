import { ProductResponse } from '../../types';
import AppAPI from './api';

export class ApiCart extends AppAPI {
  barierToken: string;
  token: string | null;
  constructor() {
    super();
    this.barierToken = 'Basic ' + btoa(`${this.secret}:${this.scope}`);
    this.token = localStorage.getItem('token');
  }

  getCartById(BEARER_TOKEN: string): Promise<ProductResponse | void> {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // https://api.{region}.commercetools.com/{projectKey}/carts/customer-id={customerId}
    return fetch(`${this.apiUrl}/${this.projectKey}/carts/customer-id=${BEARER_TOKEN}`, options)
      .then((response) => response.json())
      .then((data: ProductResponse) => {
        console.log('cart = ', data);

        return data;
      })
      .catch((error) => console.error(error));
  }

  createCart(BEARER_TOKEN: string): Promise<ProductResponse | void> {
    const body = {
      currency: 'USD',
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    // https://api.{region}.commercetools.com/{projectKey}/carts
    return fetch(`${this.apiUrl}/${this.projectKey}/carts`, options)
      .then((response) => response.json())
      .then((data: ProductResponse) => {
        console.log('cartCreated = ', data);
        return data;
      })
      .catch((error) => console.error(error));
  }
}
