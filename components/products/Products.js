import HTMLComponent from '../HTMLComponent.js';

export default class Products extends HTMLComponent {
  constructor() {
    super('./components/products/Products.css');
  }
  connectedCallback() {
    this.appendClone('products-template');

    this.products = this.root.querySelector('#products');

    window.addEventListener('productsChanged', () => {
      this.render();
    });

    window.addEventListener('categoryChanged', () => {
      this.render();
    });

    window.addEventListener('searchChanged', () => {
      this.render();
    });
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

  renderItems(filteredproducts) {
    filteredproducts.map((product) => {
      const item = document.createElement('product-item');
      item.dataset.product = JSON.stringify(product);
      this.products.appendChild(item);
    });
  }
}

customElements.define('products-element', Products);
