import './style.scss';
import './modal.scss';
import Page from '../core/templates/page';
import AppProductAPI from '../../controller/apiProduct';
import APICartNau from '../../controller/apiCartNau';
import { ImageData } from '../../../types';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ProductInCart } from '../../../types';
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
  APIcart: APICartNau;
  name: string;
  description: string;
  images: Array<ImageData>;
  price: string;
  discountPrice: string;
  currency: string;
  myModalSwiper: Swiper | null;
  removeShowHideButton: boolean;

  constructor(id: string, productId: string) {
    super(id);
    this.productId = productId;
    this.API = new AppProductAPI();
    this.APIcart = new APICartNau();
    this.name = '';
    this.description = '';
    this.images = [];
    this.price = '';
    this.discountPrice = '';
    this.currency = '';
    this.myModalSwiper = null;
    this.removeShowHideButton = false;
  }

  setRemoveShowHideButton = async () => {
    // console.log('asdf = ', await APICartNau.checkDoWeHaveThisProductIdInCart(this.productId).then((e) => e));

    this.removeShowHideButton = await APICartNau.checkDoWeHaveThisProductIdInCart(this.productId).then((e) => e);
  };

  async getMasterData(productId: string) {
    await this.setRemoveShowHideButton();
    await this.API.clientCredentialsFlow().then(async (response) => {
      // console.log('response = ', response);
      await this.API.getProduct(response.access_token, productId).then((response) => {
        // console.log('Content response = ', response);
        this.name = response.masterData.current.name['en-US'];
        //this.description = response.masterData.current.description['en-US'];
        if (response.masterData.current.description && response.masterData.current.description['en-US']) {
          // console.log('description = ', response.masterData.current.description['en-US']);
          this.description = response.masterData.current.description['en-US'];
        } else {
          this.description = 'None';
        }
        // console.log('this.description = ', this.description);
        this.images = response.masterData.staged.masterVariant.images;
        this.price = response.masterData.staged.masterVariant.prices[0].value.centAmount;
        if (
          response.masterData.staged.masterVariant.prices[0] &&
          response.masterData.staged.masterVariant.prices[0].discounted &&
          response.masterData.staged.masterVariant.prices[0].discounted.value &&
          response.masterData.staged.masterVariant.prices[0].discounted.value.centAmount
        ) {
          this.discountPrice = response.masterData.staged.masterVariant.prices[0].discounted.value.centAmount;
          this.discountPrice = (Number(this.discountPrice) / 100).toFixed(2);
        } else {
          this.discountPrice = '';
        }

        // console.log(
        //   'response.masterData.staged.masterVariant.prices[0].value.centAmount = ',
        //   response.masterData.staged.masterVariant.prices[0].value.centAmount
        // );
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
    // ${Number(this.discountPrice)}
    if (this.discountPrice === '') {
      productPrice.innerHTML = `<span> Price:</span> ${Number(this.price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })} ${this.currency}`;
    } else {
      productPrice.innerHTML = `<span> Price:</span> ${Number(this.discountPrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })} <span class="zacherknuto">${Number(this.price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })} </span> ${this.currency}`;
    }
    return productPrice;
  };

  createAddToCartButton = () => {
    const addToCartButtonContainer = document.createElement('div');
    addToCartButtonContainer.classList.add('addToCartButtonContainer');
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('card__button');
    addToCartButton.classList.add('card__button-product-add');
    addToCartButton.innerText = 'Add to cart';
    (addToCartButton as HTMLButtonElement).disabled = this.removeShowHideButton;

    addToCartButtonContainer.append(addToCartButton);

    return addToCartButtonContainer;
  };

  createRemoveFromCartButton = () => {
    const removeFromCartButton = document.createElement('div');
    removeFromCartButton.classList.add('removeFromCartButtonContainer');
    const removeButton = document.createElement('button');
    removeButton.classList.add('card__button');
    removeButton.classList.add('card__button-product-remove');
    removeButton.innerText = 'Remove';
    (removeButton as HTMLButtonElement).disabled = !this.removeShowHideButton;

    removeFromCartButton.append(removeButton);

    return removeFromCartButton;
  };

  createCheckCartInConsoleButton = () => {
    const checkCartInConsole = document.createElement('div');
    checkCartInConsole.classList.add('removeFromCartButtonContainer');
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('card__button');
    addToCartButton.classList.add('card__button-console');
    addToCartButton.innerText = 'Check Cart In Console';

    checkCartInConsole.append(addToCartButton);

    return checkCartInConsole;
  };

  createButtonsContainer = () => {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('product-buttons-container');
    buttonsContainer.append(this.createAddToCartButton());
    buttonsContainer.append(this.createRemoveFromCartButton());
    buttonsContainer.append(this.createCheckCartInConsoleButton());
    return buttonsContainer;
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
    new Swiper('.swiper-container', {
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
    // console.log('mySwiper = ', mySwiper);
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
    // console.log('mySwiperModal = ', mySwiper);
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
    // console.log('modalContent = ', modalContent);
    // console.log('modalSwiper = ', modalSwiper);
    modalContent?.append(modalSwiper);
    // console.log('modalContent = ', modalContent);
  }

  addCartToConsoleEventListener = () => {
    const node = document.querySelector('.card__button-console');
    if (node) {
      node.addEventListener('click', async () => {
        const cartId = APICartNau.getCartId();
        const token = APICartNau.getToken();
        if (cartId && token) {
          await APICartNau.getCartbyCartId(cartId, token).then((e) => {
            console.clear();
            localStorage.clear();
            console.log('cart = ', e);
          });
        }
      });
    }
  };

  addAddtoCartEventListener = () => {
    const addButton = document.querySelector('.card__button-product-add');
    const removeButton = document.querySelector('.card__button-product-remove');
    if (addButton && removeButton)
      addButton.addEventListener('click', async () => {
        const cartId = APICartNau.getCartId();
        const token = APICartNau.getToken();
        if (cartId && token) {
          await APICartNau.addProductToCart(cartId, token, this.productId, 1).then(() => {
            //console.clear();
            (addButton as HTMLButtonElement).disabled = true;
            (removeButton as HTMLButtonElement).disabled = false;
            APICartNau.showNotification('Added');
            // console.log('this.productId =', this.productId);
            // console.log('add to cart answer = ', e);
          });
        }
      });
  };

  addRemoveProductFromCartEventListener = () => {
    const addButton = document.querySelector('.card__button-product-add');
    const removeButton = document.querySelector('.card__button-product-remove');
    // Закрытие модального окна при клике на крестик
    if (addButton && removeButton)
      removeButton.addEventListener('click', async () => {
        const cartId = APICartNau.getCartId();
        const token = APICartNau.getToken();
        if (cartId && token) {
          await APICartNau.getCartbyCartId(cartId, token).then(async (e) => {
            if (e?.lineItems.filter((l: ProductInCart) => l.productId === this.productId)[0].id) {
              const lineId = e?.lineItems.filter((l: ProductInCart) => l.productId === this.productId)[0].id;
              await APICartNau.removeLineItemFromCart(cartId, token, lineId).then(() => {
                //console.clear();
                (addButton as HTMLButtonElement).disabled = false;
                (removeButton as HTMLButtonElement).disabled = true;
                APICartNau.showNotification('Removed');
                console.clear();
                // console.log('remove from cart answer = ', e);
              });
            }
          });
        }
      });
  };
  // (cartId: string, BEARER_TOKEN: string, productId: string, quantity: number) => {

  render(): HTMLElement {
    // console.log('this.productId BEFORE = ', this.productId);
    this.getMasterData(this.productId)
      .then(() => {
        // console.log('this AFTER = ', this);
        const title = this.createHeaderTitle(ProductPage.TextObject.ProductTitle);
        const wrapper = this.createProductWrapper();
        wrapper.append(title);
        wrapper.append(this.createProductTitle());
        wrapper.append(this.createProductDescription());
        wrapper.append(this.createProductPrice());
        wrapper.append(this.createButtonsContainer());

        // wrapper.append(this.createProductImages());
        wrapper.append(this.createProductImagesSliderContainer('normal'));
        wrapper.append(this.createModalWindow());

        this.container.append(wrapper);

        this.addModalEventListener();
        this.addSwiperIntoModal();
        this.createSliderModal();
        this.createSlider();

        this.addCartToConsoleEventListener();
        this.addAddtoCartEventListener();
        this.addRemoveProductFromCartEventListener();
      })
      .catch((error) => {
        console.error(error);
      });
    return this.container;
  }
}

export default ProductPage;
