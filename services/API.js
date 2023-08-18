export const API = {
  // url: `https://my-json-server.typicode.com/bpetermann/shopping-cart-jsonserver/storeItems`,
  url: `./data/db.json`,
  getProducts: async () => {
    const result = await fetch(API.url);
    return await result.json();
  },
  getLocale: async () => {
    const url =
      app.store.language === 'de'
        ? '../data/locales/de.json'
        : '../data/locales/en.json';

    const result = await fetch(url);
    return await result.json();
  },
};
