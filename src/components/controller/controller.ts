import MainPage from '../view/main/index';
import Page from '../view/core/templates/page';
import LoginPage from '../view/login';
import RegistrationPage from '../view/registration';
import Header from '../view/core/components/header';
import ErrorPage from '../view/error';
import { errorTypes } from '../view/error';

export const enum PageIds {
  MainPage = 'main-page',
  RegistrationPage = 'registration-page',
  LoginPage = 'login-page',
  LogOutPage = 'logout-page',
}

class AppController {
  initialPage: MainPage;
  defaultPageId: string = 'current-page';
  container: HTMLElement = document.body;
  header: Header;

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header');
  }

  renderHeader() {
    this.container.append(this.header.render());
  }

  renderPageContent(idPage: string) {
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    console.log('idPage = ', idPage);
    if (idPage === PageIds.MainPage || idPage === '') {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.RegistrationPage) {
      if (!localStorage.getItem('token')) {
        page = new RegistrationPage(idPage);
      } else {
        window.location.hash = PageIds.MainPage;
      }
    } else if (idPage === PageIds.LoginPage) {
      if (!localStorage.getItem('token')) {
        page = new LoginPage(idPage);
      } else {
        window.location.hash = PageIds.MainPage;
      }
    } else if (idPage === PageIds.LogOutPage) {
      // window.location.hash = PageIds.LoginPage;
      page = new MainPage(PageIds.MainPage);
    } else {
      page = new ErrorPage(idPage, errorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = this.defaultPageId;
      pageHTML.classList.add(idPage);
      this.container.append(pageHTML);
    }

    // render actual view for menu
    localStorage.getItem('token') ? this.header.renderLogoutMenu() : this.header.renderDefaultMenu();
  }
}

export default AppController;
