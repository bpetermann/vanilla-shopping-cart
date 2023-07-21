import { addToCart } from '../services/Order.js';

export default class ProductItem extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch('./components/ProductItem.css');
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById('product-item-template');
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);

    const product = JSON.parse(this.dataset.product);

    this.root.querySelector('p').textContent = product.description;
    this.root.querySelector('p.price').textContent = `${product.price} €`;
    this.root.querySelector('img').src = `images/products/${product.name}.webp`;
    this.root.querySelector('button.add').addEventListener('click', () => {
      addToCart(product);
    });
  }
}

customElements.define('product-item', ProductItem);
