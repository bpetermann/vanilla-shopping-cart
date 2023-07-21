import { addToCart } from '../services/Order.js';
import { removeFromCart } from '../services/Order.js';

export default class CartItem extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch('./components/CartItem.css');
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById('cart-item-template');
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);

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
