export const addToCart = (product) => {
  const existingCartItemIndex = app.store.cart.findIndex(
    (item) => item.name === product.name
  );
  const existingCartItem = app.store.cart[existingCartItemIndex];
  let updatedCart;
  if (existingCartItem) {
    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount + 1,
    };
    updatedCart = [...app.store.cart];
    updatedCart[existingCartItemIndex] = updatedItem;

    app.store.cart = updatedCart;
  } else {
    app.store.cart = [...app.store.cart, product];
  }
};

export const removeFromCart = (product) => {
  const existingCartItemIndex = app.store.cart.findIndex(
    (item) => item.name === product.name
  );
  const existingCartItem = app.store.cart[existingCartItemIndex];

  let updatedCart;
  if (existingCartItem?.amount > 1) {
    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount - 1,
    };
    updatedCart = [...app.store.cart];
    updatedCart[existingCartItemIndex] = updatedItem;
    app.store.cart = updatedCart;
  } else {
    app.store.cart = app.store.cart.filter(
      (item) => item.name !== product.name
    );
    console.log(app.store.cart)
  }
};
