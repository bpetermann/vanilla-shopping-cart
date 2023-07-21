const Store = {
  products: null,
  category: 'Shoes',
  cart: [],
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property === 'products') {
      window.dispatchEvent(new Event('productsChanges'));
    }
    if (property === 'category') {
      window.dispatchEvent(new Event('categoryChanged'));
    }
    if (property === 'cart') {
      window.dispatchEvent(new Event('cartChanged'));
    }
    return true;
  },
});

export default proxiedStore;
