import './style.scss';
import Page from '../core/templates/page';
import AppProductAPI from '../../controller/apiProduct';
import { ImageData } from '../../../types';

class ProductPage extends Page {
  static TextObject = {
    ProductTitle: 'Product page',
  };

  productId: string;
  API: AppProductAPI;
  name: string;
  description: string;
  images: Array<ImageData>;

  constructor(id: string, productId: string) {
    super(id);
    this.productId = productId;
    this.API = new AppProductAPI();
    this.name = '';
    this.description = '';
    this.images = [];
  }

  async getMasterData(productId: string) {
    await this.API.clientCredentialsFlow().then(async (response) => {
      // console.log('response = ', response);
      await this.API.getProduct(response.access_token, productId).then((response) => {
        console.log('Content response = ', response);
        this.name = response.masterData.current.name['en-US'];
        this.description = response.masterData.current.description['en-US'];
        this.images = response.masterData.staged.masterVariant.images;
      });
    });
  }

  createProductWrapper = () => {
    const productWrapper = document.createElement('div');
    productWrapper.classList.add('product-wrapper');
    return productWrapper;
  };

  createProductTitle = () => {
    const productTitle = document.createElement('h2');
    productTitle.classList.add('product-name');
    productTitle.innerText = this.name;
    return productTitle;
  };

  createProductDescription = () => {
    const productDescription = document.createElement('div');
    productDescription.classList.add('product-description');
    productDescription.innerText = this.description;
    return productDescription;
  };

  createProductImages = () => {
    const productImages = document.createElement('div');
    productImages.classList.add('product-images');
    this.images.map((img) => {
      const productImage = document.createElement('img');
      productImage.classList.add('product-image');
      productImage.src = img.url;
      productImage.title = img.label;
      productImages.append(productImage);
    });
    return productImages;
  };

  render(): HTMLElement {
    console.log('this.productId BEFORE = ', this.productId);
    this.getMasterData(this.productId)
      .then(() => {
        console.log('this AFTER = ', this);
        const title = this.createHeaderTitle(ProductPage.TextObject.ProductTitle);
        const wrapper = this.createProductWrapper();
        wrapper.append(title);
        wrapper.append(this.createProductTitle());
        wrapper.append(this.createProductDescription());
        wrapper.append(this.createProductImages());
        this.container.append(wrapper);
      })
      .catch((error) => {
        console.error(error);
      });
    return this.container;
  }
}

export default ProductPage;
