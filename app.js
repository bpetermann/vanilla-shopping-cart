import loadData from './services/Products.js';
import Setup from './services/Setup.js';
import Store from './services/Store.js';

// Components
import Cart from './components/Cart.js';
import Products from './components/Products.js';
import ProductItem from './components/ProductItem.js';
import CartItem from './components/CartItem.js';

HTMLElement.prototype.onClick = function (a, b) {
  this.addEventListener('click', a, b);
};

window.app = {};
app.store = Store;
app.setup = Setup;

window.addEventListener('DOMContentLoaded', async () => {
  app.setup();
  app.store.products = await loadData();
});

window.addEventListener('cartChanged', async () => {
  const badge = document.getElementById('badge');
  const qty = app.store.cart.reduce(function (acc, item) {
    return acc + item.amount;
  }, 0);
  badge.textContent = qty;
  badge.style = !qty ? 'display:none' : 'display:flex';
});
