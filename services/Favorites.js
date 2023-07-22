export const toggleFavorite = (product) => {
  const existingFavoriteItem = app.store.favorites.find(
    (item) => item.name === product.name
  );

  if (!existingFavoriteItem) {
    app.store.favorites = [...app.store.favorites, product];
  } else {
    app.store.favorites = app.store.favorites.filter(
      (item) => item.name !== product.name
    );
  }
};
