import { runningCart } from '../checkout/carts-summary.js';
import { productGenerator } from '../../data/products.js'

productGenerator(render, 'cart')
const Cartsummery = new runningCart()
export function render(products) {
  Cartsummery.renderCartItem(products);
}


