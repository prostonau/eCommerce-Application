// import AppLoader from './appLoader';
// import { RawSourceData } from '../../types/index';
// import { Level } from '../../types/index';
// import { TrackData } from '../../types/index';
// import { WinnerData } from '../../types/index';
// import { engineStart } from '../../types/index';
// import { driveMode } from '../../types/index';

import { Actions, ClientCredentialsFlowResponse } from '../../types/index';
import { Customer } from '../../types/index';

// type GetSourcesCallback = (data: RawSourceData) => void;
// type GetNewsCallback = (data: RawSourceNews) => void;

class AppAPI {
  bathUrl?: string = '';
  authUrl?: string = '';
  apiUrl: string = '';
  projectKey: string = '';
  secret: string = '';
  scope: string = '';
  constructor() {
    this.bathUrl = 'europe-west1.gcp.commercetools.com';
    this.authUrl = `https://auth.${this.bathUrl}`;
    this.apiUrl = `https://api.${this.bathUrl}`;
    this.projectKey = '611a116e-87f8-43a5-9c07-959851c6dff3';
    this.secret = 'wiWXgK9Z2y_K8rx0FYLg1N-r';
    this.scope = 'i9z0351m49c9fr3YGHU_CsVHk9Eh0hyP';
  }

  // https://docs.commercetools.com/api/authorization#client-credentials-flow
  clientCredentialsFlow = (): Promise<ClientCredentialsFlowResponse> => {
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
    return fetch(`${this.authUrl}/oauth/token`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('clientCredentialsFlow = ', data);
        return data;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject({
          access_token: '',
          expires_in: 0,
          scope: '',
          token_type: '',
        });
      });
  };

  // https://docs.commercetools.com/api/authorization#password-flow
  // Password flow for global Customers
  passwordFlow = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      const grantType = 'password';
      const userName = email;
      const pass = password;
      const scope = `manage_project:${this.projectKey}`;

      // Создаем объект с данными для POST-запроса
      const data = {
        grant_type: grantType,
        username: userName,
        password: pass,
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
      fetch(`${this.authUrl}/oauth/${this.projectKey}/customers/token`, options)
        .then((response) => response.json())
        .then((data) => {
          // console.log('passwordFlow = ', data);
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

  //https://docs.commercetools.com/api/projects/customers#get-customer
  getCustomer = (id: string, BEARER_TOKEN: string) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/customers/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('getCustomer = ', data);
        return data;
      })
      .catch((error) => console.error(error));
  };

  //https://docs.commercetools.com/api/projects/customers#get-customer
  getAllCustomers = (BEARER_TOKEN: string) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/customers?limit=500`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('getAllCustomers = ', data);
        return data;
      })
      .catch((error) => console.error(error));
  };

  async checkEmailbyAPI(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.clientCredentialsFlow().then(async (response) => {
        const allCustomers = await this.getAllCustomers(response.access_token);
        console.log('allCustomers = ', allCustomers);
        console.log('email = ', email);
        console.log(
          'allCustomers.results.filter((e: Customer) => e.email === email).length = ',
          allCustomers.results.filter((e: Customer) => e.email === email).length
        );
        if (allCustomers.results.filter((e: Customer) => e.email === email).length > 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  //https://docs.commercetools.com/api/projects/customers#create-sign-up-customer
  createCustomer = (BEARER_TOKEN: string, customer: Customer) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/customers`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('createCustomer = ', data);
        return data;
      })
      .catch((error) => console.error(error));
  };

  // https://docs.commercetools.com/api/projects/customers#update-customer-by-id
  // https://docs.commercetools.com/api/projects/customers#update-actions
  updateCustomer = async (BEARER_TOKEN: string, customerId: string, customerVer: number, actions: Actions[]) => {
    // Создаем объект с настройками для запроса
    const id = customerId;
    const version = customerVer ? customerVer : 1;
    // console.log('получаем это = ', customer);
    console.log(actions);

    const data = {
      version: version,
      actions: actions,
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/customers/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        //console.log('updateCustomer = ', data);
        return data;
      })
      .catch((error) => console.error(error));
  };

  // https://docs.commercetools.com/api/projects/customers#change-password-of-customer
  changePassword = async (
    BEARER_TOKEN: string,
    customerId: string,
    customerVer: number,
    currPassword: string,
    newPassword: string
  ) => {
    const version = customerVer ? customerVer : 1;

    const data = {
      id: customerId,
      version: version,
      currentPassword: currPassword,
      newPassword: newPassword,
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(`${this.apiUrl}/${this.projectKey}/customers/${customerId}`, options)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error(error));
  };

  // //https://docs.commercetools.com/api/projects/customers#email-verification-of-customer
  // createEmailTokenForCustomer = (email: string, BEARER_TOKEN: string) => {
  //   // Создаем объект с настройками для запроса
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${BEARER_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   // Выполняем запрос
  //   fetch(`${this.apiUrl}/${this.projectKey}/customers/email-token`, options)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('getCustomer = ', data);
  //       return data;
  //     })
  //     .catch((error) => console.error(error));
  // };
}

export default AppAPI;
