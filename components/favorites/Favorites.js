import HTMLComponent from '../HTMLComponent.js';

export default class Favorites extends HTMLComponent {
  constructor() {
    super('./components/favorites/Favorites.css');
  }
  connectedCallback() {
    this.appendClone('favorites-template');

    this.close = this.root.querySelector('button.close');

    this.closeHandler();
    this.render();
  }

  closeHandler() {
    this.close.onClick(() => {
      const main = document.querySelector('main');
      main.removeChild(document.querySelector('favorites-modal'));
    });
  }

  render() {}
}

customElements.define('favorites-modal', Favorites);
