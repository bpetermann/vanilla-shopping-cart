export class Cart extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch('./components/Cart.css');
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }
  connectedCallback() {
    const template = document.getElementById('cart-template');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

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
      console.log(app.store.cart);
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
