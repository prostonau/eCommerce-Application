import { Product } from '../../../types';

export class ProductCard {
  container: HTMLDivElement;
  product: Product;

  constructor(product: Product) {
    this.product = product;
    this.container = document.createElement('div');
    this.container.classList.add('card');
  }

  render(): HTMLElement {
    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    cardImg.src = this.product.masterVariant?.images[0]?.url || './images/not-found.png';

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card__description');

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card__description_title');
    cardTitle.innerHTML = this.product.name['en-US']; //TODO language swith

    const cardBody = document.createElement('h3');
    cardBody.classList.add('card__description_body');

    cardDescription.append(cardTitle, cardBody);

    this.container.append(cardImg, cardDescription);

    return this.container;
  }
}
