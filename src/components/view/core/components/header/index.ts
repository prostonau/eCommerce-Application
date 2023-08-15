import Component from '../../templates/components';
import { PageIds } from '../../../../controller/controller';

const Buttons = [
  {
    id: PageIds.MainPage,
    text: 'Go Main page',
  },
  {
    id: PageIds.RegistrationPage,
    text: 'Go Registration',
  },
  {
    id: PageIds.LoginPage,
    text: 'Go Login',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerHTML = button.text;
      pageButtons.append(buttonHTML);
      // console.log('pageButtons = ', pageButtons);
    });
    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    console.log('this.container = ', this.container);
    return this.container;
  }
}

export default Header;
