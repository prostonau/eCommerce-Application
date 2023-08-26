import './style.scss';
import Page from '../core/templates/page';

class CatalogPage extends Page {
  static TextObject = {
    CatalogTitle: 'Catalog page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(CatalogPage.TextObject.CatalogTitle);
    this.container.append(title);
    return this.container;
  }
}

export default CatalogPage;
