import './style.scss';
import Page from '../core/templates/page';

class ProductPage extends Page {
  static TextObject = {
    ProductTitle: 'Product page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(ProductPage.TextObject.ProductTitle);
    this.container.append(title);
    return this.container;
  }
}

export default ProductPage;
