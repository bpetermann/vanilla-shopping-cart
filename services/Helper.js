export const badgeHelper = (id) => {
  const badge = document.getElementById(id);
  const qty =
    id === 'cart-badge'
      ? app.store.cart.reduce(function (acc, item) {
          return acc + item.amount;
        }, 0)
      : app.store.favorites.length;
  badge.textContent = qty;
  badge.style.display = !qty ? 'none' : 'flex';
};

export const validEmail = (value) => {
  return new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ).test(value);
};
