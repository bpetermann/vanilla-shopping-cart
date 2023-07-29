import HTMLComponent from '../HTMLComponent.js';

export default class Cart extends HTMLComponent {
  constructor() {
    super('cart/Cart.css');
  }
  connectedCallback() {
    this.appendClone('cart-template');

    this.backdrop = this.$('#backdrop');
    this.cart = this.$('#cart > div');
    this.list = this.$('ul');
    this.heading = this.$('h3');
    this.total = this.$('div > span');
    this.amount = this.$('span.total');
    this.close = this.$('button.close');
    this.order = this.$('button.order');

    this.addEventHandler();
    this.render();

    window.addEventListener('cartChanged', () => {
      this.render();
    });
  }

  render() {
    this.list.innerHTML = '';
    const { t } = app.store;

    if (app.store.cart.length) {
      this.heading.textContent = `${
        app.store.t['Cart']
      } (${this.totalItems()})`;
      this.total.textContent = app.store.t['Total Amount'];
      this.amount.textContent = `${this.totalPrice()}  $`;
      this.renderItems();
    } else {
      this.cart.style.display = 'none';
      this.order.innerHTML = t['No items'];
    }
  }

  addEventHandler() {
    [this.backdrop, this.order, this.close].map((el) =>
      el.onClick(() => {
        const main = document.querySelector('main');
        main.removeChild(document.querySelector('cart-modal'));
      })
    );
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

  renderItems() {
    app.store.cart.map((product) => {
      const item = document.createElement('cart-item');
      item.dataset.product = JSON.stringify(product);
      this.list.appendChild(item);
    });
  }
}

customElements.define('cart-modal', Cart);
