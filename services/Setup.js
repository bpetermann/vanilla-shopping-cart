const Setup = () => {
  const main = document.querySelector('main');
  const cartOpen = document.querySelector('#open-cart');
  const searchInput = document.querySelector('#searchbar-text');
  const menuBtn = document.querySelectorAll('button.menu-button');

  const products = document.createElement('products-element');
  main.insertBefore(products, main.childNodes[4]);

  cartOpen.onClick(() => {
    const cart = document.createElement('cart-modal');
    main.appendChild(cart);
  });

  menuBtn.forEach((item) =>
    item.onClick((e) => {
      if (e.target.textContent !== app.store.category) {
        app.store.category = e.target.textContent;
        e.target.classList.add('active');
        menuBtn.forEach((item) => {
          if (item.textContent !== app.store.category) {
            item.classList.remove('active');
          }
        });
      }
    })
  );

  searchInput.addEventListener('change', (e) => {
    app.store.search = e.target.value;
  });
};

export default Setup;
