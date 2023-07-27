import { badgeHelper } from './services/Helper.js';
import loadData from './services/Products.js';
import Locale from './services/Locales.js';
import Setup from './services/Setup.js';
import Store from './services/Store.js';

// Components
import Products from './components/products/Products.js';
import ProductItem from './components/products/ProductItem.js';
import Cart from './components/cart/Cart.js';
import CartItem from './components/cart/CartItem.js';
import Favorites from './components/favorites/Favorites.js';
import Newsletter from './components/newsletter/Newsletter.js';
import Toast from './components/newsletter/Toast.js';

window.app = {};
app.store = Store;
app.setup = Setup;
app.locale = Locale;

window.addEventListener('DOMContentLoaded', async () => {
  app.store.t = await app.locale.load();
  app.setup.start();
  app.store.products = await loadData();
});

window.addEventListener('cartChanged', () => {
  badgeHelper('cart-badge');
});

window.addEventListener('favoritesChanged', () => {
  badgeHelper('fav-badge');
});

window.addEventListener('languageChanged', async () => {
  app.store.t = await app.locale.load();
  app.locale.set();
});
