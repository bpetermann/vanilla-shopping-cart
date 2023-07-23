import HTMLComponent from '../HTMLComponent.js';

export default class Favorites extends HTMLComponent {
  constructor() {
    super('favorites/Favorites.css');
  }
  connectedCallback() {
    this.appendClone('favorites-template');

    this.list = this.root.querySelector('ul');
    this.close = this.root.querySelector('button.close');

    this.closeHandler();
    this.render();

    window.addEventListener('favoritesChanged', () => {
      this.render();
    });
  }

  closeHandler() {
    this.close.onClick(() => {
      const main = document.querySelector('main');
      main.removeChild(document.querySelector('favorites-modal'));
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
}

customElements.define('favorites-modal', Favorites);
