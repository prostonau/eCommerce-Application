import { Product } from '../../../types';
import { ProductCard } from '../catalog/poductCard';
// import { ProductInCart } from '../../../types';

export class ProductCardInCart extends ProductCard {
  constructor(product: Product, cartId: string | null) {
    super(product, cartId);
  }
}
