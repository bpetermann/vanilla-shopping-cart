const Store = {
  products: null,
  category: 'Shoes',
  search: '',
  cart: [],
  favorites: [],
  language: 'en',
  t: {},
};

export const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property === 'products') {
      window.dispatchEvent(new Event('productsChanged'));
    }
    if (property === 'category') {
      window.dispatchEvent(new Event('categoryChanged'));
    }
    if (property === 'search') {
      window.dispatchEvent(new Event('searchChanged'));
    }
    if (property === 'cart') {
      window.dispatchEvent(new Event('cartChanged'));
    }
    if (property === 'favorites') {
      window.dispatchEvent(new Event('favoritesChanged'));
    }
    if (property === 'language') {
      window.dispatchEvent(new Event('languageChanged'));
    }
    if (property === 't') {
      window.dispatchEvent(new Event('localesChanged'));
    }
    return true;
  },
});
