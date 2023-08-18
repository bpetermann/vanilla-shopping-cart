import { HTMLComponent } from '../HTMLComponent.js';

export class Products extends HTMLComponent {
  constructor() {
    super('products/Products.css');
  }
  connectedCallback() {
    this.appendClone('products-template');

    this.products = this.$('#products');

    ['productsChanged', 'categoryChanged', 'searchChanged'].map((e) =>
      window.addEventListener(e, () => {
        this.render();
      })
    );
  }

  render() {
    const filteredproducts = this.filteredProducs();

    if (filteredproducts) {
      this.products.innerHTML = '';
      this.renderItems(filteredproducts);
    } else {
      this.products.innerHTML =
        '<img class="loading" src="/images/icons/spinner.gif" alt="...loading" width="24px" height="24px" />';
    }
  }

  filteredProducs() {
    return app.store.products.filter(
      (item) =>
        item.description
          .toLowerCase()
          .includes(app.store.search.toLowerCase()) &&
        item.category.includes(app.store.category)
    );
  }

  renderItems(filteredproducts) {
    filteredproducts.map((product) => {
      const item = document.createElement('product-item');
      item.dataset.product = JSON.stringify(product);
      this.products.appendChild(item);
    });
  }
}

customElements.define('products-element', Products);
