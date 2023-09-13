// import { Actions, ClientCredentialsFlowResponse } from '../../types/index';
// import { Customer } from '../../types/index';
import { CartResponce } from '../../types';
import AppAPI from './api';

class APICartNau extends AppAPI {
  constructor() {
    super();
    console.log('apiProduct initialized...');
  }

  static cartVersion = 0;
  static cartId = '';
  static bathUrl = 'europe-west1.gcp.commercetools.com';
  static authUrl = `https://auth.${APICartNau.bathUrl}`;
  static apiUrl = `https://api.${APICartNau.bathUrl}`;
  static projectKey = '611a116e-87f8-43a5-9c07-959851c6dff3';
  static secret = 'wiWXgK9Z2y_K8rx0FYLg1N-r';
  static scope = 'i9z0351m49c9fr3YGHU_CsVHk9Eh0hyP';
  static store = 'cycklesStoreeCommerceRSSchool';

  static getTokenForAnonymous = () => {
    return new Promise((resolve, reject) => {
      const grantType = 'client_credentials';
      const scope = `manage_project:${this.projectKey}`;

      // Создаем объект с данными для POST-запроса
      const data = {
        grant_type: grantType,
        scope: scope,
      };

      // Создаем объект с настройками для запроса
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa(`${APICartNau.secret}:${APICartNau.scope}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data),
      };

      // Выполняем запрос
      return fetch(`${this.authUrl}/oauth/${this.projectKey}/anonymous/token`, options)
        .then((response) => response.json())
        .then((data) => {
          console.log('getTokenForAnonymous = ', data);
          console.log('parseAnonymousId = ', this.parseAnonymousId(data.scope));
          console.log('parseAnonymousToken = ', data.access_token);
          console.log('anonymousDataSet = ', data);
          // if (!localStorage.getItem('anonymousId'))
          localStorage.setItem('anonymousId', this.parseAnonymousId(data.scope));
          //if (!localStorage.getItem('anonymousToken'))
          localStorage.setItem('anonymousToken', data.access_token);
          // if (!localStorage.getItem('anonymousDataSet'))\
          data.expires_in_date = new Date(+new Date() + data.expires_in * 1000);
          localStorage.setItem('anonymousDataSet', JSON.stringify(data));
          return resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

  static createCart = (BEARER_TOKEN: string, storageName: string) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'USD',
      }),
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/me/carts`, options)
      .then((response) => response.json())
      .then(async (data: CartResponce) => {
        console.log('createCart = ', data);
        localStorage.setItem(`${storageName}Id`, data.id);
        this.cartVersion = +data.version;
        this.cartId = data.id;
        localStorage.setItem(`${storageName}VersionId`, data.version.toString());
        return data;
      })
      .catch((error) => console.error(error));
  };

  static getCartbyCartId = (cartId: string, BEARER_TOKEN: string) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/carts/${cartId}`, options)
      .then((response) => response.json())
      .then((data: CartResponce) => {
        console.log('getCartbyCartId = ', data, data.version);
        localStorage.setItem('cartVersionId', data.version.toString());
        this.cartVersion = +data.version;
        this.cartId = data.id;
        return data;
      })
      .catch((error) => console.error(error));
  };

  static getCartCustomersCart = (BEARER_TOKEN: string, storageName: string) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос https://api.{region}.commercetools.com/{projectKey}/carts/customer-id={customerId}
    // https://api.{region}.commercetools.com/{projectKey}/me/active-cart
    return fetch(`${this.apiUrl}/${this.projectKey}/me/active-cart`, options)
      .then((response) => response.json())
      .then((data: CartResponce) => {
        if (!data.statusCode) {
          console.log('getCartbyCartIdCustomer = ', data, data.version);
          localStorage.setItem(`${storageName}VersionId`, data.version.toString());
          this.cartVersion = +data.version;
          this.cartId = data.id;
          localStorage.setItem(`${storageName}Id`, data.id);
          console.log('удалось получить корзину');
          return data;
        } else {
          console.log('создана новая корзина');
          return this.createCart(BEARER_TOKEN, storageName);
        }
      })
      .catch((error) => console.error(error));
  };

  static addProductToCart = (cartId: string, BEARER_TOKEN: string, productId: string, quantity: number) => {
    let versionId = localStorage.getItem('cartVersionId') ? localStorage.getItem('cartVersionId') : 0;
    console.log('versionId = ', versionId);
    if (versionId === null) versionId = 0;
    if (!productId) productId = '';

    const data = {
      version: Number(versionId),
      actions: [
        {
          action: 'addLineItem',
          productId: productId,
          quantity: quantity,
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(`${this.apiUrl}/${this.projectKey}/carts/${cartId}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('addProductToCart = ', data);
        localStorage.setItem('cartVersionId', data.version);
        return data;
      })
      .catch((error) => console.error(error));
  };

  static updateProductQuantityInCart = (cartId: string, BEARER_TOKEN: string, lineItemId: string, quantity: number) => {
    let versionId = localStorage.getItem('cartVersionId') ? localStorage.getItem('cartVersionId') : 0;
    console.log('versionId = ', versionId);
    if (versionId === null) versionId = 0;
    if (!lineItemId) lineItemId = '';

    const data = {
      version: Number(versionId),
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: lineItemId,
          quantity: quantity,
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(`${this.apiUrl}/${this.projectKey}/carts/${cartId}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('addProductToCart = ', data);
        localStorage.setItem('cartVersionId', data.version);
        return data;
      })
      .catch((error) => console.error(error));
  };

  static removeLineItemFromCart = (cartId: string, BEARER_TOKEN: string, lineItemId: string) => {
    let versionId = localStorage.getItem('cartVersionId') ? localStorage.getItem('cartVersionId') : 0;
    console.log('versionId = ', versionId);
    if (versionId === null) versionId = 0;
    if (!lineItemId) lineItemId = '';

    const data = {
      version: Number(versionId),
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: lineItemId,
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(`${this.apiUrl}/${this.projectKey}/carts/${cartId}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('addProductToCart = ', data);
        localStorage.setItem('cartVersionId', data.version);
        return data;
      })
      .catch((error) => console.error(error));
  };

  async requestApiLogin(login: string, password: string) {
    // const api = new AppAPI();
    // await console.log(api.passwordFlow('johndo13e@example.com', 'secret123'));
    try {
      const data = await this.passwordFlow(login, password);
      console.log(login, password, 'datalog==', data);

      if (typeof data === 'object' && data !== null && 'statusCode' in data) {
        const status = data.statusCode;
        console.log('Неверный логин или пароль', status);
        console.log('Неверный логин или пароль. Просьба проверить данные.');
      }

      if (typeof data === 'object' && data !== null && 'access_token' in data) {
        const token: string = typeof data.access_token === 'string' ? data.access_token : '';
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(data));
      }
    } catch (error) {
      console.log('Произошла ошибка, попробуйте еще раз.');
      console.error('Произошла ошибка, попробуйте еще раз', error);
    }
  }

  static parseAnonymousId = (scope: string) => scope.split(' ')[1].split(':')[1];

  //findLineItemIdInCart = (productId: string) => {};
}
export default APICartNau;
