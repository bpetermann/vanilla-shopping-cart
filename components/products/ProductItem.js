import HTMLComponent from '../HTMLComponent.js';
import { addToCart } from '../../services/Cart.js';
import { toggleFavorite } from '../../services/Favorites.js';

export default class ProductItem extends HTMLComponent {
  constructor() {
    super('products/ProductItem.css');
  }

  connectedCallback() {
    this.appendClone('product-item-template');

    this.product = JSON.parse(this.dataset.product);

    this.description = this.$('p');
    this.price = this.$('p.price');
    this.image = this.$('img');
    this.add = this.$('button.add');
    this.favorite = this.$('button.favorite');

    this.render();

    window.addEventListener('favoritesChanged', () => {
      this.favoriteClassList();
    });

    window.addEventListener('localesChanged', () => {
      this.locales();
    });
  }

  render() {
    this.description.textContent = this.product.description;
    this.price.textContent = `${this.product.price} €`;
    this.image.src = `images/products/${this.product.name}.webp`;
    this.image.alt = `${this.product.name} image`;

    this.favoriteClassList();
    this.addEventHandlers();
  }

  locales() {
    const { t } = app.store;
    this.add.innerHTML = t['Add to Cart'];
  }

  favoriteClassList() {
    const isFavorite = app.store.favorites.find(
      ({ id }) => id === this.product.id
    );
    isFavorite
      ? this.favorite.classList.add('liked')
      : this.favorite.classList.remove('liked');
  }

  addEventHandlers() {
    this.add.onClick(() => {
      this.addProduct();
    });
    this.favorite.onClick(() => {
      toggleFavorite(this.product);
    });
  }

  addProduct() {
    const { t } = app.store;

    this.add.innerHTML =
      '<img class="loading" src="/images/icons/spinner.gif" alt="...loading" width="24px" height="24px" />';
    setTimeout(() => {
      this.add.innerHTML = t['Add to Cart'];
      this.add.classList.add('added');
      setTimeout(() => {
        this.add.classList.remove('added');
        addToCart(this.product);
      }, 500);
    }, 250);
  }
}

customElements.define('product-item', ProductItem);
