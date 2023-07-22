import HTMLComponent from '../HTMLComponent.js';
import { addToCart } from '../../services/Order.js';

export default class ProductItem extends HTMLComponent {
  constructor() {
    super('./components/products/ProductItem.css');
  }

  connectedCallback() {
    this.appendClone('product-item-template');

    this.product = JSON.parse(this.dataset.product);

    this.description = this.root.querySelector('p');
    this.price = this.root.querySelector('p.price');
    this.image = this.root.querySelector('img');
    this.add = this.root.querySelector('button.add');

    this.render();
  }

  render() {
    this.description.textContent = this.product.description;
    this.price.textContent = `${this.product.price} €`;
    this.image.src = `images/products/${this.product.name}.webp`;
    this.add.onClick(() => {
      this.addProduct();
    });
  }

  addProduct() {
    this.add.innerHTML =
      '<img class="loading" src="/images/icons/spinner.gif" alt="...loading" width="24px" height="24px" />';
    setTimeout(() => {
      this.add.innerHTML = 'Add to Cart';
      this.add.classList.add('added');
      setTimeout(() => {
        this.add.classList.remove('added');
        addToCart(this.product);
      }, 500);
    }, 250);
  }
}

customElements.define('product-item', ProductItem);