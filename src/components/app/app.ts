import AppController from '../controller/controller';
import AppAPI from '../controller/api';
import AppProductAPI from '../controller/apiProduct';
import { AppView } from '../view/appView';
import { ApiCatalog } from '../controller/apiCatalog';
import APICartNau from '../controller/apiCartNau';
import { ClientCredentialsFlowResponse } from '../../types';
// import { lineInCart } from '../../types';
// import { lineInCart } from '../../types';

class App {
  controller: AppController;
  API: AppAPI;
  ProductAPI: AppProductAPI;
  view: AppView;
  container: HTMLElement;
  APICatalog: ApiCatalog;
  APICardNau: APICartNau;

  constructor() {
    this.controller = new AppController();
    this.API = new AppAPI();
    this.ProductAPI = new AppProductAPI();
    this.view = new AppView();
    this.APICatalog = new ApiCatalog();
    this.APICardNau = new APICartNau();
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

  public async start(): Promise<void> {
    await this.setToken();
    console.log('Start eCommerce-Application...');
    this.enableRouteChange();
    this.controller.renderHeader();
    this.controller.renderPageContent(
      `${window.location.hash.slice(1).length > 0 ? window.location.hash.slice(1) : 'main-page'}`
    );
    // this.controller.header.renderLogoutMenu();
    //this.testUserToken();

    localStorage.getItem('token')
      ? this.controller.header.renderLogoutMenu()
      : this.controller.header.renderDefaultMenu();
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

  async setToken() {
    if (localStorage.getItem('token')) {
      const userData = localStorage.getItem('userData');
      console.log('token = ', localStorage.getItem('token'));
      if (userData) {
        if (this.checkExpires(JSON.parse(userData))) {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          localStorage.removeItem('cartId');
          localStorage.removeItem('cartVersionId');
          this.setToken();
        } else {
          APICartNau.getCartCustomersCart(localStorage.getItem('token') || '', 'cart');
        }
      }
    } else if (localStorage.getItem('anonymousToken')) {
      const userData = localStorage.getItem('anonymousDataSet');
      if (userData) {
        if (this.checkExpires(JSON.parse(userData))) {
          localStorage.removeItem('anonymousId');
          localStorage.removeItem('anonymousToken');
          localStorage.removeItem('anonymousDataSet');
          this.setToken();
        } else {
          APICartNau.getCartCustomersCart(localStorage.getItem('anonymousToken') || '', 'cartAnonimus');
        }
      }
    } else {
      await APICartNau.getTokenForAnonymous();
      APICartNau.getCartCustomersCart(localStorage.getItem('anonymousToken') || '', 'cartAnonimus');
    }
  }

  checkExpires(userData: ClientCredentialsFlowResponse) {
    if (+new Date(userData.expires_in_date ? userData.expires_in_date : '') - +new Date() < 0) {
      return true;
    } else {
      return false;
    }
  }

  public async testProductAPI(): Promise<void> {
    console.log('________________________');
    console.log('Test Product API...');
    console.log('START >>>>>>>>>>>>>>>>>>');

    // this.APICart.getCartById(await this.testUserToken(), 'eab3b965-fc8f-46f1-a7a6-f14c7283e2d3').then((response) => {
    //   console.log('response = ', response);
    //   //this.ProductAPI.getAllProducts(response.access_token);
    //   //this.ProductAPI.getProduct(response.access_token, 'fbf119fb-303b-4ba3-8724-e9ea6873ec07');
    //   // this.API.getCustomer('39fd2612-1d14-4484-b6ac-1f4631a22f91', response.access_token);
    //   // this.API.getAllCustomers(response.access_token);
    //   // this.API.updateCustomer(response.access_token);
    // });

    //this.API.passwordFlow('johndo13e@example.com', 'secret123');
    console.log('END <<<<<<<<<<<<<<<<<<<');
    console.log('________________________');
  }

  async testCardAPI() {
    console.log('________________________');
    console.log('Test Cart API...');
    console.log('START >>>>>>>>>>>>>>>>>>');

    // this.API.getCustomer('eab3b965-fc8f-46f1-a7a6-f14c7283e2d3', 'wc8VJmXbN1qGhctx_ir6jjSzbbGAv5pO');
    //this.APICardNau.createCart('wc8VJmXbN1qGhctx_ir6jjSzbbGAv5pO');
    // this.APICardNau.getCartCustomersCart('njaAPwtEa-EM9dbBDJFF_R0ngcYOJdRe');
    // {"access_token":"wc8VJmXbN1qGhctx_ir6jjSzbbGAv5pO","expires_in":172800,"token_type":"Bearer","scope":"manage_project:611a116e-87f8-43a5-9c07-959851c6dff3 customer_id:eab3b965-fc8f-46f1-a7a6-f14c7283e2d3","refresh_token":"611a116e-87f8-43a5-9c07-959851c6dff3:0eO7NZl6L1uSwNPX8ZUEIZZypO_pqA6NqgS-RwrnSE8"}
    // // await this.APICardNau.getTokenForAnonymous();
    // const anonymousId = localStorage.getItem('anonymousId');
    // const anonymousToken = localStorage.getItem('anonymousToken');
    // if (anonymousId && anonymousToken) {
    //   await this.APICardNau.createCart(anonymousId, anonymousToken);
    //   await this.APICardNau.getCartbyCustomerCartId(anonymousId, anonymousToken);
    //   const cartId = localStorage.getItem('cartId');
    //   // const cartVersioId = localStorage.setItem('cartVersioId');
    //   if (cartId) {
    //     await this.APICardNau.getCartbyCartId(cartId, anonymousToken);
    //     await this.APICardNau.addProductToCart(cartId, anonymousToken, 'fbf119fb-303b-4ba3-8724-e9ea6873ec07', 2);
    //     await this.APICardNau.requestApiLogin('prostonau@mail.ru', 'QwertyQwerty%1982');
    //     const userToken = localStorage.getItem('token');
    //     if (userToken) {
    //       await this.APICardNau.addProductToCart(cartId, userToken, '0db9875a-d588-4661-9ab2-16e89f089183', 3);
    //       await this.APICardNau.getCartbyCartId(cartId, userToken);
    //       await this.APICardNau.addProductToCart(cartId, userToken, '0db9875a-d588-4661-9ab2-16e89f089183', 5);
    //       await this.APICardNau.getCartbyCartId(cartId, userToken).then(async (e) => {
    //         const lineId = e.lineItems.filter(
    //           (l: lineInCart) => l.productId === '0db9875a-d588-4661-9ab2-16e89f089183'
    //         )[0].id;
    //         await this.APICardNau.updateProductQuantityInCart(cartId, userToken, lineId, 2);
    //       });
    //       await this.APICardNau.getCartbyCartId(cartId, userToken);
    //       await this.APICardNau.getCartbyCartId(cartId, userToken).then(async (e) => {
    //         const lineId = e.lineItems.filter(
    //           (l: lineInCart) => l.productId === 'fbf119fb-303b-4ba3-8724-e9ea6873ec07'
    //         )[0].id;
    //         await this.APICardNau.removeLineItemFromCart(cartId, userToken, lineId);
    //       });
    //       await this.APICardNau.getCartbyCartId(cartId, userToken);
    //     }
    //   }
    // }
    console.log('END <<<<<<<<<<<<<<<<<<<');
    console.log('________________________');
  }
}

export default App;
