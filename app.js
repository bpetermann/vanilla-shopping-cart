import {
  badgeHelper,
  loadData,
  Locale,
  Setup,
  proxyStore as Store,
} from './services/index.js';

// Components
import {
  Products,
  ProductItem,
  Cart,
  CartItem,
  Favorites,
  Newsletter,
  Toast,
} from './components/index.js';

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
