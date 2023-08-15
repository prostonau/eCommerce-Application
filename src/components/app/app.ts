import AppController from '../controller/controller';
import AppAPI from '../controller/api';
import { AppView } from '../view/appView';

class App {
  controller: AppController;
  API: AppAPI;
  view: AppView;
  container: HTMLElement;
  constructor() {
    this.controller = new AppController();
    this.API = new AppAPI();
    this.view = new AppView();
    this.container = document.body;
  }

  testCustomer = {
    email: 'joh2ndo13e@example.com',
    firstName: 'John',
    lastName: 'Doe2',
    password: 'secret123',
  };

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      console.log('hashchange');
      const hash = window.location.hash.slice(1);
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
  }

  public testAPI(): void {
    console.log('Test API...');

    this.API.clientCredentialsFlow().then((response) => {
      console.log('response = ', response);
      this.API.getCustomer('39fd2612-1d14-4484-b6ac-1f4631a22f91', response.access_token);
      this.API.getAllCustomers(response.access_token);
      //this.API.createCustomer(response.access_token, this.testCustomer);
    });

    this.API.passwordFlow('johndo13e@example.com', 'secret123');
  }
}

export default App;
