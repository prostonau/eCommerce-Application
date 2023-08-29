import './style.scss';
import Page from '../core/templates/page';
import AppProductAPI from '../../controller/apiProduct';
import { ImageData } from '../../../types';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
//import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    productTitle.innerHTML = `<span>Name:</span> ${this.name}`;
    return productTitle;
  };

  createProductDescription = () => {
    const productDescription = document.createElement('div');
    productDescription.classList.add('product-description');
    productDescription.innerHTML = `<span>Description:</span> ${this.description}`;
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

  createProductImagesSliderContainer = () => {
    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add('swiper-container');
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    const swiperNext = document.createElement('div');
    swiperNext.classList.add('swiper-button-next');
    const swiperPrew = document.createElement('div');
    swiperPrew.classList.add('swiper-button-prev');
    const pagi = document.createElement('div');
    pagi.classList.add('swiper-pagination');
    const scroll = document.createElement('div');
    scroll.classList.add('swiper-scrollbar');
    swiperContainer.append(swiperWrapper);
    swiperContainer.append(swiperNext);
    swiperContainer.append(swiperPrew);
    swiperContainer.append(pagi);
    swiperContainer.append(scroll);
    return swiperContainer;
  };

  createSlider() {
    const images = this.images;
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    images.forEach(function (image) {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.label;
      img.width = image.dimensions.w;
      img.height = image.dimensions.h;

      slide.appendChild(img);
      if (swiperWrapper) swiperWrapper.appendChild(slide);
    });

    // Инициализация Swiper
    const mySwiper = new Swiper('.swiper-container', {
      modules: [Navigation, Pagination],
      // Optional parameters
      // direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // scrollbar: {
      //   el: '.swiper-scrollbar',
      //   hide: true,
      // },
    });
    console.log('mySwiper = ', mySwiper);
  }

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
        // wrapper.append(this.createProductImages());
        wrapper.append(this.createProductImagesSliderContainer());
        this.container.append(wrapper);

        this.createSlider();
      })
      .catch((error) => {
        console.error(error);
      });
    return this.container;
  }
}

export default ProductPage;
