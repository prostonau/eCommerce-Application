import { PriceValue, Product, ProductInCart, ValueResp } from '../../../types';
import { ProductCard } from '../catalog/poductCard';
import InputBox from '../core/templates/input';
import Label from '../core/templates/label';
// import { ProductInCart } from '../../../types';

export class ProductCardInCart extends ProductCard {
  productInCart: ProductInCart;
  inputBox: HTMLDivElement;
  decButton: HTMLButtonElement;
  incButton: HTMLButtonElement;
  inputQuantity: InputBox;
  cardToCart: HTMLButtonElement;
  cardPrice: HTMLHeadingElement;
  constructor(product: Product, cartId: string | null, productInCart: ProductInCart) {
    super(product, cartId);
    this.productInCart = productInCart;
    this.inputBox = document.createElement('div');
    this.inputBox.classList.add('quantity__select_box');

    this.decButton = document.createElement('button');
    this.decButton.classList.add('quantity__select_button');
    this.decButton.innerHTML = '<';
    this.incButton = document.createElement('button');
    this.incButton.classList.add('quantity__select_button');
    this.incButton.innerHTML = '>';
    this.inputQuantity = new InputBox(
      'input',
      'quantity__select',
      'number',
      '',
      this.productInCart.quantity.toString(),
      false
    );
    this.cardToCart = document.createElement('button');
    this.cardPrice = document.createElement('h4');
  }

  render(): HTMLElement {
    this.container.innerHTML = '';
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

      this.cardPrice.classList.add('card__description_price');

      this.cardPrice.innerHTML = this.getPrice('USD');
      if (this.getPrice('USD').includes('<span')) {
        this.cardPrice.classList.add('card__price--discounted');
      }

      this.cardToCart.classList.add('card__button');
      this.cardToCart.innerHTML = 'Remove';

      cardBody.append(this.addQuantityInput(), this.cardPrice, this.cardToCart);
      cardDescription.append(cardTitle, cardBody);

      this.container.append(cardImgContainer, cardDescription);
    });

    return this.container;
  }

  addQuantityInput() {
    const inputQuantityEl = this.inputQuantity.render();
    if (inputQuantityEl instanceof HTMLInputElement) {
      inputQuantityEl.min = '1';
    }
    this.inputBox.append(this.decButton, inputQuantityEl, this.incButton);

    return this.inputBox;
  }

  getPrice(country: string): string {
    const prices = this.product.masterVariant.prices;
    let result = '';
    prices.forEach((price) => {
      if (price.value.currencyCode === country) {
        result =
          ((price.value.centAmount / 100) * +this.inputQuantity.getValue()).toString() + ' ' + price.value.currencyCode;
        if (price.discounted) {
          result += this.getDiscount(price.discounted.value);
        }
      }
    });
    if (result === '') {
      prices.forEach((price) => {
        if (price.country === 'USD') {
          result =
            ((price.value.centAmount / 100) * +this.inputQuantity.getValue()).toString() +
            ' ' +
            price.value.currencyCode;
          if (price.discounted) {
            result += this.getDiscount(price.discounted.value);
          }
        }
      });
    }

    return result;
  }

  getDiscount(discount: PriceValue): string {
    return (
      '<span id="discounted__span">' +
      ((discount.centAmount / 100) * +this.inputQuantity.getValue()).toString() +
      ' ' +
      discount.currencyCode +
      '</span>'
    );
  }
}
