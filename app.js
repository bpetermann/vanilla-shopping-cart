import { badgeHelper } from './services/Helper.js';
import loadData from './services/Products.js';
import Setup from './services/Setup.js';
import Store from './services/Store.js';

// Components
import Products from './components/products/Products.js';
import ProductItem from './components/products/ProductItem.js';
import Cart from './components/cart/Cart.js';
import CartItem from './components/cart/CartItem.js';
import Favorites from './components/favorites/Favorites.js';

HTMLElement.prototype.onClick = function (a, b) {
  this.addEventListener('click', a, b);
};

window.app = {};
app.store = Store;
app.setup = Setup;

window.addEventListener('DOMContentLoaded', async () => {
  app.setup.start();
  app.store.products = await loadData();
});

window.addEventListener('cartChanged', () => {
  badgeHelper('cart-badge');
});

window.addEventListener('favoritesChanged', () => {
  badgeHelper('fav-badge');
});
