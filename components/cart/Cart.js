import HTMLComponent from '../HTMLComponent.js';

export default class Cart extends HTMLComponent {
  constructor() {
    super('./components/cart/Cart.css');
  }
  connectedCallback() {
    this.appendClone('cart-template');

    this.root.querySelector('button.close').addEventListener('click', () => {
      const main = document.querySelector('main');
      main.removeChild(document.querySelector('cart-modal'));
    });

    this.render();
    this.root.querySelector('h3').textContent = `Cart (${this.totalItems()})`;
    this.root.querySelector(
      'span.total'
    ).textContent = `${this.totalPrice()}  $`;

    window.addEventListener('cartChanged', () => {
      this.render();
      this.root.querySelector('h3').textContent = `Cart (${this.totalItems()})`;
      this.root.querySelector(
        'span.total'
      ).textContent = `${this.totalPrice()}  $`;
    });
  }

  totalPrice() {
    return app.store.cart
      .reduce(function (acc, prod) {
        return acc + prod.amount * prod.price;
      }, 0)
      .toFixed(2);
  }

  totalItems() {
    return app.store.cart.reduce(function (acc, item) {
      return acc + item.amount;
    }, 0);
  }

  render() {
    if (app.store.cart) {
      this.root.querySelector('ul').innerHTML = '';

      app.store.cart.map((product) => {
        const item = document.createElement('cart-item');
        item.dataset.product = JSON.stringify(product);
        this.root.querySelector('ul').appendChild(item);
      });
    }
  }
}

customElements.define('cart-modal', Cart);
