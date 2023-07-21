export default class Products extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch('./components/Products.css');
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }
  connectedCallback() {
    const template = document.getElementById('products-template');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener('productsChanges', () => {
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
      this.root.querySelector('#products').innerHTML = '';
      filteredproducts.map((product) => {
        const item = document.createElement('product-item');
        item.dataset.product = JSON.stringify(product);
        this.root.querySelector('#products').appendChild(item);
      });
    } else {
      this.root.querySelector('#products').innerHTML =
        '<img class="loading" src="/images/icons/spinner.gif" alt="...loading" width="24px" height="24px" />';
    }
  }
}

customElements.define('products-element', Products);
