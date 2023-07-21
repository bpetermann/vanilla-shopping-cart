export const addToCart = (product) => {
  const cart = app.store.cart;
  const existingCartItemIndex = cart.findIndex(
    (item) => item.name === product.name
  );
  const existingCartItem = cart[existingCartItemIndex];
  let updatedCart;
  if (existingCartItem) {
    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount + 1,
    };
    updatedCart = [...cart];
    updatedCart[existingCartItemIndex] = updatedItem;

    app.store.cart = updatedCart;
  } else {
    app.store.cart = [...cart, product];
  }
};

export const removeFromCart = (product) => {
  // TODO
};
