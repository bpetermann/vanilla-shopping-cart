import HTMLComponent from '../HTMLComponent.js';
import { addToCart } from '../../services/Order.js';
import { removeFromCart } from '../../services/Order.js';

export default class CartItem extends HTMLComponent {
  constructor() {
    super('./components/cart/CartItem.css');
  }

  connectedCallback() {
    this.appendClone('cart-item-template');

    this.product = JSON.parse(this.dataset.product);

    this.heading = this.root.querySelector('h4');
    this.price = this.root.querySelector('span.price');
    this.amount = this.root.querySelector('span.amount');
    this.close = this.root.querySelector('button.close');
    this.addButton = this.root.querySelector('button.add');
    this.deleteButton = this.root.querySelector('button.remove');

    this.render();
  }

  render() {
    this.heading.textContent = this.product.name;
    this.price.textContent = `${(
      this.product.price * this.product.amount
    ).toFixed(2)} €`;
    this.amount.textContent = `${this.product.amount} X`;

    this.addButton.onClick(() => {
      addToCart(this.product);
    });

    this.deleteButton.onClick(() => {
      removeFromCart(this.product);
    });
  }
}

customElements.define('cart-item', CartItem);
