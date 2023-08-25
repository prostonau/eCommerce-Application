// import { WinnerData } from '../../../types/index';
import './style.scss';
import Page from '../core/templates/page';
import Header from '../core/components/header';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  header = new Header('div', 'mainmenu');
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    const div = document.createElement('div');
    div.className = 'mainmenu';
    div.append(this.header.renderPageButtonsForMainPage());
    this.container.append(div);
    return this.container;
  }
}

export default MainPage;
