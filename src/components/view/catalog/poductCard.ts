import { PriceValue, Product, ValueResp } from '../../../types';
import Label from '../core/templates/label';
import APICartNau from '../../controller/apiCartNau';
import { EventDelegator } from '../../features/eventDelegator';
// import { ProductInCart } from '../../../types';

export class ProductCard {
  container: HTMLAnchorElement;
  product: Product;
  showHideAddToCartButton: boolean;
  cartId: string | null;

  constructor(product: Product, cartId: string | null) {
    this.product = product;
    this.container = document.createElement('a');
    // this.container.href = `#product/${this.product.id}`;
    this.container.classList.add('card');
    this.showHideAddToCartButton = false;
    this.cartId = cartId;
  }

  async getMasterData() {
    await this.setRemoveShowHideButton();
  }

  render(): HTMLElement {
    this.getMasterData().then(() => {
      const cardImg = document.createElement('img');
      cardImg.classList.add('card__img');
      cardImg.src = this.product.masterVariant?.images[0]?.url || './images/not-found.png';

      const cardImgContainer = document.createElement('div');
      cardImgContainer.classList.add('card__img_container');
      cardImgContainer.addEventListener('click', () => {
        window.location.hash = `product/${this.product.id}`;
      });

      cardImgContainer.append(cardImg);

      const cardDescription = document.createElement('div');
      cardDescription.classList.add('card__description');

      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('card__description_title');
      cardTitle.innerHTML = this.product.name['en-US']; //TODO language swith
      // window.location.hash
      cardTitle.addEventListener('click', () => {
        window.location.hash = `product/${this.product.id}`;
      });
      //console.log('this.product = ', this.product);

      const cardBody = document.createElement('div');
      cardBody.classList.add('card__description_body'); //TODO language variants types
      const text = this.product.masterVariant?.attributes.map((atribute) => {
        let property = atribute.name;
        if (typeof atribute.value !== 'string' && atribute.value) {
          property += ': ' + (atribute.value as ValueResp).key;
          if (this.product.variants[0]) {
            this.product.variants.forEach((variant) => {
              variant.attributes.forEach((subAttribute) => {
                if (property.includes(subAttribute.name) && !property.includes((subAttribute.value as ValueResp).key)) {
                  property += ' | ' + (subAttribute.value as ValueResp).key;
                }
              });
            });
          }
        } else if (atribute.value) {
          property += ': ' + atribute.value;
        }
        return property;
      });

      const properties = document.createElement('div');
      cardBody.append(
        text.reduce((acc, props) => {
          const textHtml = new Label('p', 'card__property_text', '', '', props);
          acc.append(textHtml.render());
          return acc;
        }, properties)
      );
      properties.classList.add('card__description_body-properties');

      const cardPrice = document.createElement('h4');
      cardPrice.classList.add('card__description_price');

      cardPrice.innerHTML = this.getPrice('USD'); //TODO language swith
      if (this.getPrice('USD').includes('<span')) {
        cardPrice.classList.add('card__price--discounted');
      }

      const cardToCart = document.createElement('button');
      cardToCart.classList.add('card__button');
      cardToCart.innerText = 'Add to cart';
      cardToCart.disabled = this.showHideAddToCartButton;
      if (cardToCart.disabled) {
        cardToCart.innerText = 'Added';
      }
      this.addAddtoCartEventListener(cardToCart);

      cardBody.append(cardPrice, cardToCart);
      cardDescription.append(cardTitle, cardBody);

      this.container.append(cardImgContainer, cardDescription);
    });

    return this.container;
  }

  getPrice(country: string): string {
    const prices = this.product.masterVariant.prices;
    let result = '';
    prices.forEach((price) => {
      if (price.value.currencyCode === country) {
        result = (price.value.centAmount / 100).toString() + ' ' + price.value.currencyCode;
        if (price.discounted) {
          result += this.getDiscount(price.discounted.value);
        }
      }
    });
    if (result === '') {
      prices.forEach((price) => {
        if (price.country === 'USD') {
          result = (price.value.centAmount / 100).toString() + ' ' + price.value.currencyCode;
          if (price.discounted) {
            result += this.getDiscount(price.discounted.value);
          }
        }
      });
    }

    return result;
  }

  getDiscount(discount: PriceValue): string {
    return '<span>' + (discount.centAmount / 100).toString() + ' ' + discount.currencyCode + '</span>';
  }

  addAddtoCartEventListener = (button: HTMLButtonElement) => {
    if (button) {
      EventDelegator.addDelegatedListener('click', button, async () => {
        console.log('click');
        const token = APICartNau.getToken();
        if (this.cartId && token) {
          await APICartNau.addProductToCart(this.cartId, token, this.product.id, 1).then(() => {
            button.disabled = true;
            button.innerText = 'Added';
            APICartNau.showNotification('Added');
          });
        }
      });
    }
  };

  setRemoveShowHideButton = async () => {
    // console.log('asdf = ', await APICartNau.checkDoWeHaveThisProductIdInCart(this.productId).then((e) => e));
    this.showHideAddToCartButton = await APICartNau.checkDoWeHaveThisProductIdInCart(this.product.id).then((e) => e);
  };
}
