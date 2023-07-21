import HTMLComponent from '../HTMLComponent.js';
import { addToCart } from '../../services/Order.js';
import { removeFromCart } from '../../services/Order.js';

export default class CartItem extends HTMLComponent {
  constructor() {
    super('./components/cart/CartItem.css');
  }

  connectedCallback() {
    this.appendClone('cart-item-template');

    const product = JSON.parse(this.dataset.product);

    this.root.querySelector('h4').textContent = product.name;
    this.root.querySelector('span.price').textContent = `${(
      product.price * product.amount
    ).toFixed(2)} €`;
    this.root.querySelector('span.amount').textContent = `${product.amount} X`;

    this.root.querySelector('button.add').addEventListener('click', () => {
      addToCart(product);
    });
    this.root.querySelector('button.remove').addEventListener('click', () => {
      removeFromCart(product);
    });
  }
}

customElements.define('cart-item', CartItem);
