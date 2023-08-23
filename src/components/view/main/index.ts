// import { WinnerData } from '../../../types/index';
import './style.scss';
import Page from '../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main page 123',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default MainPage;
