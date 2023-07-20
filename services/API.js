const API = {
  url: `https://my-json-server.typicode.com/bpetermann/shopping-cart-jsonserver/storeItems`,
  getProducts: async () => {
    const result = await fetch(API.url);
    return await result.json();
  },
};

export default API;
