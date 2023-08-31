import './style.scss';
import './modal.scss';
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
  price: string;
  currency: string;
  myModalSwiper: Swiper | null;

  constructor(id: string, productId: string) {
    super(id);
    this.productId = productId;
    this.API = new AppProductAPI();
    this.name = '';
    this.description = '';
    this.images = [];
    this.price = '';
    this.currency = '';
    this.myModalSwiper = null;
  }

  async getMasterData(productId: string) {
    await this.API.clientCredentialsFlow().then(async (response) => {
      // console.log('response = ', response);
      await this.API.getProduct(response.access_token, productId).then((response) => {
        console.log('Content response = ', response);
        this.name = response.masterData.current.name['en-US'];
        this.description = response.masterData.current.description['en-US'];
        this.images = response.masterData.staged.masterVariant.images;
        this.price = response.masterData.staged.masterVariant.prices[0].value.centAmount;
        console.log(
          'response.masterData.staged.masterVariant.prices[0].value.centAmount = ',
          response.masterData.staged.masterVariant.prices[0].value.centAmount
        );
        this.price = (Number(this.price) / 100).toFixed(2);
        this.currency = response.masterData.staged.masterVariant.prices[0].value.currencyCode;
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

  createProductPrice = () => {
    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');
    productPrice.innerHTML = `<span>Price:</span> ${Number(this.price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })} ${this.currency}`;
    return productPrice;
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

  createProductImagesSliderContainer = (type: string) => {
    const conteinerName = type === 'modal' ? 'swiper-container-modal' : 'swiper-container';
    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add(conteinerName);
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

  createSlider = () => {
    const images = this.images;
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    images.map((image, index) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.label;
      img.width = image.dimensions.w;
      img.height = image.dimensions.h;

      img.addEventListener('click', () => {
        this.openModal();
        if (this.myModalSwiper) this.myModalSwiper.slideTo(index);
      });

      slide.appendChild(img);
      if (swiperWrapper) {
        swiperWrapper.appendChild(slide);
      }
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
        clickable: true,
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
  };

  createSliderModal() {
    const images = this.images;
    const swiperWrapper = document.querySelector('.swiper-container-modal .swiper-wrapper');

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
    const mySwiper = new Swiper('.swiper-container-modal', {
      modules: [Navigation, Pagination],
      // Optional parameters
      // direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
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
    this.myModalSwiper = mySwiper;
    console.log('mySwiperModal = ', mySwiper);
  }

  createModalWindow() {
    const modal = document.createElement('div');
    modal.innerHTML = `
    <button id="openModalButton" style="display:none;">Открыть модальное окно</button>
      <div id="modal" class="modal">
        <span id="closeModal" class="close">X</span>
        <div class="modal-content">
        </div>
      </div>
      <div id="overlay" class="overlay"></div>`;
    return modal;
  }

  // Функция открытия модального окна
  openModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    if (modal) modal.style.display = 'block';
    if (overlay) overlay.style.display = 'block';
  }

  // Функция закрытия модального окна
  closeModalFunction() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    if (modal) modal.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
  }

  addModalEventListener = () => {
    const closeModal = document.getElementById('closeModal');
    // Закрытие модального окна при клике на крестик
    if (closeModal) closeModal.addEventListener('click', this.closeModalFunction);

    // Закрытие модального окна при клике вне него
    window.addEventListener('click', (event) => {
      const overlay = document.getElementById('overlay');
      if (event.target == overlay) {
        this.closeModalFunction();
      }
    });

    // const openModalButton = document.getElementById('openModalButton');
    // // Открытие модального окна при клике на кнопку
    // if (openModalButton) openModalButton.addEventListener('click', this.openModal);
  };

  addSwiperIntoModal() {
    const modalContent = document.querySelector('.modal-content');
    const modalSwiper = this.createProductImagesSliderContainer('modal');
    console.log('modalContent = ', modalContent);
    console.log('modalSwiper = ', modalSwiper);
    modalContent?.append(modalSwiper);
    console.log('modalContent = ', modalContent);
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
        wrapper.append(this.createProductPrice());
        // wrapper.append(this.createProductImages());
        wrapper.append(this.createProductImagesSliderContainer('normal'));
        wrapper.append(this.createModalWindow());

        this.container.append(wrapper);

        this.addModalEventListener();
        this.addSwiperIntoModal();
        this.createSliderModal();
        this.createSlider();
      })
      .catch((error) => {
        console.error(error);
      });
    return this.container;
  }
}

export default ProductPage;
