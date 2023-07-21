import HTMLComponent from '../HTMLComponent.js';
import { addToCart } from '../../services/Order.js';

export default class ProductItem extends HTMLComponent {
  constructor() {
    super('./components/products/ProductItem.css');
  }

  connectedCallback() {
    this.appendClone('product-item-template');

    const product = JSON.parse(this.dataset.product);

    this.root.querySelector('p').textContent = product.description;
    this.root.querySelector('p.price').textContent = `${product.price} €`;
    this.root.querySelector('img').src = `images/products/${product.name}.webp`;
    this.root.querySelector('button.add').addEventListener('click', () => {
      addToCart(product);
    });
  }
}

customElements.define('product-item', ProductItem);
