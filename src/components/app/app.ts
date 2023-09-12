import AppController from '../controller/controller';
import AppAPI from '../controller/api';
import AppProductAPI from '../controller/apiProduct';
import { AppView } from '../view/appView';
import { ApiCatalog } from '../controller/apiCatalog';
import { ApiCart } from '../controller/apiCart';

class App {
  controller: AppController;
  API: AppAPI;
  ProductAPI: AppProductAPI;
  view: AppView;
  container: HTMLElement;
  APICatalog: ApiCatalog;
  APICart: ApiCart;

  constructor() {
    this.controller = new AppController();
    this.API = new AppAPI();
    this.ProductAPI = new AppProductAPI();
    this.view = new AppView();
    this.APICatalog = new ApiCatalog();
    this.APICart = new ApiCart();
    this.container = document.body;
  }

  testCustomer = {
    email: 'aaaa@example.com',
    firstName: 'John',
    lastName: 'Doe2',
    password: 'Secret%123',
  };

  private enableRouteChange() {
    // window.addEventListener('popstate', () => {
    //   console.log('URL changed');
    //   // const hash = window.location.pathname.slice(1);
    //   // this.controller.renderPageContent(hash);
    // });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      console.log('hashchange and new hash = ', hash);
      this.controller.renderPageContent(hash);
    });
  }

  public start(): void {
    console.log('Start eCommerce-Application...');
    this.enableRouteChange();
    this.controller.renderHeader();
    this.controller.renderPageContent(
      `${window.location.hash.slice(1).length > 0 ? window.location.hash.slice(1) : 'main-page'}`
    );
    // this.controller.header.renderLogoutMenu();
    this.testUserToken();
    this.controller.header.renderDefaultMenu();
  }

  public testAPI(): void {
    console.log('Test API...');
    const token = localStorage.getItem('token');
    if (token) {
      this.APICatalog.queryCategories(token).then(async (response) => {
        if (response) {
          console.log('response = ', response);
        }

        // this.API.getCustomer('39fd2612-1d14-4484-b6ac-1f4631a22f91', response.access_token);
        // this.API.getAllCustomers(response.access_token);
        // this.API.updateCustomer(response.access_token);
      });
    }

    //this.API.passwordFlow('johndo13e@example.com', 'secret123');
  }

  async testUserToken() {
    if (localStorage.getItem('token')) {
      console.log('token');
      return localStorage.getItem('token') || '';
    } else if (localStorage.getItem('guestToken')) {
      console.log('guestToken');
      return localStorage.getItem('guestToken') || '';
    } else {
      const data = await this.API.clientCredentialsFlow();
      localStorage.setItem('guestToken', data.access_token);
      return localStorage.getItem('guestToken') || '';
    }
  }

  public async testProductAPI(): Promise<void> {
    console.log('________________________');
    console.log('Test Product API...');
    console.log('START >>>>>>>>>>>>>>>>>>');

    this.APICart.getCartById(await this.testUserToken()).then((response) => {
      console.log('response = ', response);
      //this.ProductAPI.getAllProducts(response.access_token);
      //this.ProductAPI.getProduct(response.access_token, 'fbf119fb-303b-4ba3-8724-e9ea6873ec07');
      // this.API.getCustomer('39fd2612-1d14-4484-b6ac-1f4631a22f91', response.access_token);
      // this.API.getAllCustomers(response.access_token);
      // this.API.updateCustomer(response.access_token);
    });

    //this.API.passwordFlow('johndo13e@example.com', 'secret123');
    console.log('END <<<<<<<<<<<<<<<<<<<');
    console.log('________________________');
  }
}

export default App;
