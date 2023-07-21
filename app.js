import loadData from './services/Products.js';
import Router from './services/Router.js';
import Store from './services/Store.js';

HTMLElement.prototype.onClick = function (a, b) {
  this.addEventListener('click', a, b);
};

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener('DOMContentLoaded', async () => {
  app.store.products = await loadData();
  app.router.init();
});
