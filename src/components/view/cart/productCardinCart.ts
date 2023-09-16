import { Product, ProductInCart, ValueResp } from '../../../types';
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
  constructor(product: Product, cartId: string | null, productInCart: ProductInCart) {
    super(product, cartId);
    this.productInCart = productInCart;
    this.inputBox = document.createElement('div');
    this.inputBox.classList.add('quantity__select_box');

    this.decButton = document.createElement('button');
    this.decButton.innerHTML = '<';
    this.incButton = document.createElement('button');
    this.incButton.innerHTML = '>';
    this.inputQuantity = new InputBox(
      'input',
      'quantity__select',
      'number',
      '',
      this.productInCart.quantity.toString(),
      false
    );
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
      this.addAddtoCartEventListener(cardToCart);

      cardBody.append(this.addQuantityInput(), cardPrice, cardToCart);
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
}
