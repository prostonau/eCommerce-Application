import './style.scss';
import Page from '../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    CatalogTitle: 'Catalog page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.CatalogTitle);
    this.container.append(title);
    return this.container;
  }
}

export default MainPage;
