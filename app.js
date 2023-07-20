import Store from './services/Store.js';
import loadProducts from './services/Products.js';

window.app = {};
app.store = Store;

window.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();
  console.log(app.store.products);
});
