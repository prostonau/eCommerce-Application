// import { WinnerData } from '../../../types/index';
import './style.css';
import Page from '../core/templates/page';
import Header from '../core/components/header';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main page 123',
  };

  header = new Header('div', 'mainmenu');
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    const elem = document.createElement('div');
    elem.className = 'mainmenu';
    elem.append(this.header.renderPageButtonsForMainPage());
    this.container.append(elem);
    return this.container;
  }
}

export default MainPage;
