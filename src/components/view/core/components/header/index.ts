import Component from '../../templates/components';
import { PageIds } from '../../../../controller/controller';

const Buttons = [
  {
    id: PageIds.MainPage,
    text: 'Main page',
  },
  {
    id: PageIds.RegistrationPage,
    text: 'Registration',
  },
  {
    id: PageIds.LoginPage,
    text: 'Login',
  },
  {
    id: PageIds.CatalogPage,
    text: 'Catalog',
  },
  {
    id: PageIds.ProfilePage,
    text: 'Profile',
  },
  {
    id: PageIds.LogOutPage,
    text: 'LogOut',
  },
  {
    id: PageIds.AboutUsPage,
    text: 'About us',
  },
  {
    id: PageIds.CartPage,
    text: 'Cart page',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      if (button.id !== 'logout-page' && button.id !== 'profile') {
        const buttonHTML = document.createElement('a');
        buttonHTML.href = `#${button.id}`;
        buttonHTML.innerHTML = button.text;
        pageButtons.append(buttonHTML);
        //console.log('pageButtons = ', pageButtons);
      }
    });
    this.container.append(pageButtons);
  }

  renderPageButtonsForMainPage() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      if (button.id !== PageIds.LogOutPage) {
        if (button.id !== PageIds.ProfilePage) {
          const div = document.createElement('div');
          const buttonHTML = document.createElement('a');
          buttonHTML.href = `#${button.id}`;
          buttonHTML.innerHTML = button.text;
          div.append(buttonHTML);
          pageButtons.append(div);
          //console.log('pageButtons = ', pageButtons);
        }
      }
    });
    return pageButtons;
  }

  renderPageButtonsForLogOutMenu() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      if (
        button.id === PageIds.CatalogPage ||
        button.id === 'main-page' ||
        button.id === 'logout-page' ||
        button.id === PageIds.ProfilePage ||
        button.id === PageIds.CartPage
      ) {
        const buttonHTML = document.createElement('a');
        buttonHTML.href = `#${button.id}`;
        buttonHTML.innerHTML = button.text;
        if (button.id === 'logout-page') {
          buttonHTML.className = 'logout';
          buttonHTML.href = `#${PageIds.LoginPage}`;
        }
        pageButtons.append(buttonHTML);
      }
      // console.log('pageButtons = ', pageButtons);
    });
    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    // console.log('this.container = ', this.container);
    return this.container;
  }

  renderLogoutMenu() {
    const header = document.querySelector('.header');
    if (header) {
      header.innerHTML = '';
      this.renderPageButtonsForLogOutMenu();
      // console.log('header = ', header);
      // console.log('this.container = ', this.container);
      // console.log('this.container.firstChild = ', this.container.firstChild);
      // console.log('typeof header = ', typeof header);
      if (this.container.firstChild) header.append(this.container.firstChild);
    }

    const logout = document.querySelector('.logout');
    logout?.addEventListener('click', () => {
      localStorage.clear();
      this.renderDefaultMenu();
    });
  }

  renderDefaultMenu() {
    const header = document.querySelector('.header');
    if (header) {
      header.innerHTML = '';
      this.renderPageButtons();
      if (this.container.firstChild) header.append(this.container.firstChild);
    }
  }
}

export default Header;
