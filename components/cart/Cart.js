import HTMLComponent from '../HTMLComponent.js';

export default class Cart extends HTMLComponent {
  constructor() {
    super('cart/Cart.css');
  }
  connectedCallback() {
    this.appendClone('cart-template');

    this.backdrop = this.root.querySelector('#backdrop');
    this.list = this.root.querySelector('ul');
    this.heading = this.root.querySelector('h3');
    this.total = this.root.querySelector('div > span');
    this.amount = this.root.querySelector('span.total');
    this.close = this.root.querySelector('button.close');
    this.order = this.root.querySelector('button.order');

    this.addEventHandler();
    this.render();

    window.addEventListener('cartChanged', () => {
      this.render();
    });
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

  render() {
    this.list.innerHTML = '';

    if (app.store.cart.length) {
      this.heading.textContent = `Cart (${this.totalItems()})`;
      this.total.textContent = `Total`;
      this.amount.textContent = `${this.totalPrice()}  $`;
      this.renderItems();
    } else {
      [
        this.list,
        this.heading,
        this.total,
        this.amount,
        this.close,
        this.total,
      ].map((el) => (el.style.display = 'none'));
      this.order.innerHTML = 'No items (yet)';
    }
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
