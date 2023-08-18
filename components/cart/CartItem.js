import { HTMLComponent } from '../HTMLComponent.js';
import { addToCart, removeFromCart } from '../../services/index.js';

export class CartItem extends HTMLComponent {
  constructor() {
    super('cart/CartItem.css');
  }

  connectedCallback() {
    this.appendClone('cart-item-template');

    this.product = JSON.parse(this.dataset.product);

    this.heading = this.$('h4');
    this.price = this.$('span.price');
    this.amount = this.$('span.amount');
    this.close = this.$('button.close');
    this.addButton = this.$('button.add');
    this.deleteButton = this.$('button.remove');

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
