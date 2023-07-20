import API from './API.js';

const loadProducts = async () => {
  app.store.products = await API.getProducts();
};

export default loadProducts;
