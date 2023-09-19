import Component from '../../templates/components';
import { PageIds } from '../../../../controller/controller';
import APICartNau from '../../../../controller/apiCartNau';

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
    pageButtons.classList.add('header-list');
    Buttons.forEach((button) => {
      if (
        button.id === PageIds.CatalogPage ||
        button.id === PageIds.MainPage ||
        button.id === PageIds.LoginPage ||
        button.id === PageIds.RegistrationPage ||
        button.id === PageIds.AboutUsPage
      ) {
        const buttonHTML = document.createElement('a');
        buttonHTML.classList.add('header-item');
        buttonHTML.href = `#${button.id}`;
        buttonHTML.innerHTML = button.text;
        pageButtons.append(buttonHTML);
      }
      if (button.id === PageIds.CartPage) {
        pageButtons.append(this.renderCartIcon(button));
      }
      /* if (button.id !== 'logout-page' && button.id !== 'profile') {
        const buttonHTML = document.createElement('a');
        buttonHTML.classList.add('header-item');
        buttonHTML.href = `#${button.id}`;
        buttonHTML.innerHTML = button.text;
        pageButtons.append(buttonHTML);
      } */
    });
    this.container.append(pageButtons);
  }

  renderPageButtonsForMainPage() {
    const pageButtons = document.createElement('div');
    pageButtons.classList.add('header-list');
    Buttons.forEach((button) => {
      if (button.id !== PageIds.LogOutPage) {
        if (button.id !== PageIds.ProfilePage) {
          const div = document.createElement('div');
          const buttonHTML = document.createElement('a');
          buttonHTML.classList.add('header-item');
          buttonHTML.href = `#${button.id}`;
          buttonHTML.innerHTML = button.text;
          div.append(buttonHTML);
          pageButtons.append(div);
        }
      }
    });
    return pageButtons;
  }

  renderPageButtonsForLogOutMenu() {
    const pageButtons = document.createElement('div');
    pageButtons.classList.add('header-list');
    Buttons.forEach((button) => {
      if (
        button.id === PageIds.CatalogPage ||
        button.id === PageIds.MainPage ||
        button.id === PageIds.LogOutPage ||
        button.id === PageIds.ProfilePage ||
        button.id === PageIds.AboutUsPage
      ) {
        const buttonHTML = document.createElement('a');
        buttonHTML.classList.add('header-item');
        buttonHTML.href = `#${button.id}`;
        buttonHTML.innerHTML = button.text;
        if (button.id === 'logout-page') {
          buttonHTML.classList.add('logout', 'header-item');
          buttonHTML.href = `#${PageIds.LoginPage}`;
        }
        pageButtons.append(buttonHTML);
      }
      if (button.id === PageIds.CartPage) {
        pageButtons.append(this.renderCartIcon(button));
      }
    });
    this.container.append(pageButtons);
  }

  renderCartIcon(butt: { id: PageIds; text: string }) {
    const fragment = document.createDocumentFragment();
    const buttonHTML = document.createElement('a');
    buttonHTML.classList.add('header-cart');
    buttonHTML.href = `#${butt.id}`;

    const chariot = document.createElement('img');
    chariot.classList.add('header-cart__image');
    chariot.alt = 'chariot';
    chariot.src = './images/icons8-cart-64.png';

    buttonHTML.append(chariot);

    const cartId = APICartNau.getCartId();
    const token = APICartNau.getToken();

    if (cartId && token) {
      APICartNau.getCartbyCartId(cartId, token).then((cartResp) => {
        const prodCounter = document.createElement('span');
        prodCounter.classList.add('header-cart__quantity');
        if (cartResp?.lineItems) {
          prodCounter.textContent = APICartNau.cartCounter(cartResp?.lineItems).toString();
        }
        buttonHTML.append(prodCounter);
      });
    }
    fragment.append(buttonHTML);
    return fragment;
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
