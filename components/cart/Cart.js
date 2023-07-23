import HTMLComponent from '../HTMLComponent.js';

export default class Cart extends HTMLComponent {
  constructor() {
    super('cart/Cart.css');
  }
  connectedCallback() {
    this.appendClone('cart-template');

    this.list = this.root.querySelector('ul');
    this.heading = this.root.querySelector('h3');
    this.total = this.root.querySelector('div > span');
    this.amount = this.root.querySelector('span.total');
    this.close = this.root.querySelector('button.close');

    this.closeHandler();
    this.render();

    window.addEventListener('cartChanged', () => {
      this.render();
    });
  }

  closeHandler() {
    this.close.onClick(() => {
      const main = document.querySelector('main');
      main.removeChild(document.querySelector('cart-modal'));
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
    this.list.innerHTML = '';

    if (app.store.cart.length) {
      this.heading.textContent = `Cart (${this.totalItems()})`;
      this.total.textContent = `Total`;
      this.amount.textContent = `${this.totalPrice()}  $`;
      this.renderItems();
    } else {
      this.heading.style.display = 'none';
      this.total.style.display = 'none';
      this.amount.style.display = 'none';
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
