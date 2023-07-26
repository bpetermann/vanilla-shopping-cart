import HTMLComponent from '../HTMLComponent.js';

export default class Favorites extends HTMLComponent {
  constructor() {
    super('favorites/Favorites.css');
  }
  connectedCallback() {
    this.appendClone('favorites-template');

    this.list = this.root.querySelector('ul');
    this.backdrop = this.root.querySelector('#backdrop');
    this.close = this.root.querySelector('button.close');

    this.addEventHandlers();
    this.render();

    window.addEventListener('favoritesChanged', () => {
      this.render();
    });
  }

  render() {
    this.list.innerHTML = '';

    app.store.favorites.map((product) => {
      const item = document.createElement('product-item');
      item.dataset.product = JSON.stringify(product);
      this.list.appendChild(item);
    });
  }

  addEventHandlers() {
    [this.backdrop, this.close].map((el) =>
      el.onClick(() => {
        this.main.removeChild(document.querySelector('favorites-modal'));
      })
    );
  }
}

customElements.define('favorites-modal', Favorites);
