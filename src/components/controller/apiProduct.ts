// import { Actions, ClientCredentialsFlowResponse } from '../../types/index';
// import { Customer } from '../../types/index';
import AppAPI from './api';

class AppProductAPI extends AppAPI {
  constructor() {
    super();
    console.log('apiProduct initialized...');
  }

  getAllProducts = (BEARER_TOKEN: string) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/products?limit=500`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('getAllProducts = ', data);
        return data;
      })
      .catch((error) => console.error(error));
  };

  getProduct = (BEARER_TOKEN: string, id: string) => {
    // Создаем объект с настройками для запроса
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // Выполняем запрос
    return fetch(`${this.apiUrl}/${this.projectKey}/products/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        // console.log(`getProduct with id = '${id} |`, data);
        // console.log('img = ', data.masterData.staged.masterVariant.images);
        return data;
      })
      .catch((error) => console.error(error));
  };
}
export default AppProductAPI;
