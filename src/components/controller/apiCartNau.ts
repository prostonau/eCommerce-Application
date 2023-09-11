// import { Actions, ClientCredentialsFlowResponse } from '../../types/index';
// import { Customer } from '../../types/index';
import AppAPI from './api';

class APICartNau extends AppAPI {
  constructor() {
    super();
    console.log('apiProduct initialized...');
  }

  getTokenForAnonymous = () => {
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
          Authorization: 'Basic ' + btoa(`${this.secret}:${this.scope}`),
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
          localStorage.setItem('anonymousDataSet', JSON.stringify(data));
          return resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

  createCart = (id: string, BEARER_TOKEN: string) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'USD',
        customer: {
          id: `${id}`,
        },
      }),
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/carts`, options)
      .then((response) => response.json())
      .then(async (data) => {
        console.log('createCart = ', data);
        localStorage.setItem('cartId', data.id);
        return data;
      })
      .catch((error) => console.error(error));
  };

  getCartbyCartId = (cartId: string, BEARER_TOKEN: string) => {
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
      .then((data) => {
        console.log('getCartbyCartId = ', data, data.version);
        localStorage.setItem('cartVersionId', data.version);
        return data;
      })
      .catch((error) => console.error(error));
  };

  addProductToCart = (cartId: string, BEARER_TOKEN: string, productId: string, quantity: number) => {
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

  updateProductQuantityInCart = (cartId: string, BEARER_TOKEN: string, lineItemId: string, quantity: number) => {
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

  removeLineItemFromCart = (cartId: string, BEARER_TOKEN: string, lineItemId: string) => {
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

  parseAnonymousId = (scope: string) => scope.split(' ')[1].split(':')[1];

  //findLineItemIdInCart = (productId: string) => {};
}
export default APICartNau;
