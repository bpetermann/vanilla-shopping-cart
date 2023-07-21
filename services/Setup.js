const Setup = () => {
    const main = document.querySelector('main');
    const openBtn = document.getElementById('open-cart');
    const menutBtn = document.querySelectorAll('button.menu-button');

    const products = document.createElement('products-element');
    main.insertBefore(products, main.childNodes[4]);

    openBtn.onClick(() => {
      const cart = document.createElement('cart-modal');
      main.appendChild(cart);
    });

    menutBtn.forEach((item) =>
      item.onClick((e) => {
        app.store.category = e.target.textContent;
      })
    );
    };

export default Setup;
