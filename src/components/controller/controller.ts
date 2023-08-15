import MainPage from '../view/main/index';
import Page from '../view/core/templates/page';
import LoginPage from '../view/login';
import RegistrationPage from '../view/registration';
import Header from '../view/core/components/header';

export const enum PageIds {
  MainPage = 'main-page',
  RegistrationPage = 'registration-page',
  LoginPage = 'login-page',
}

class AppController {
  initialPage: MainPage;
  defaulyPageId: string = 'current-page';
  container: HTMLElement = document.body;
  private header: Header;

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header');
  }

  renderHeader() {
    this.container.append(this.header.render());
  }

  renderPageContent(idPage: string) {
    const currentPageHTML = document.querySelector(`#${this.defaulyPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.RegistrationPage) {
      page = new RegistrationPage(idPage);
    } else if (idPage === PageIds.LoginPage) {
      page = new LoginPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = this.defaulyPageId;
      this.container.append(pageHTML);
    }
  }
}

export default AppController;
