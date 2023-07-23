const Setup = {
  start() {
    this.select();
    this.render();
    this.addHandler();
  },

  select() {
    this.main = document.querySelector('main');
    this.cartOpen = document.querySelector('#open-cart');
    this.search = document.querySelector('#searchbar-text');
    this.infoClose = document.querySelector('button.icon-button');
    this.info = document.querySelector('#info-bar');
    this.menuBtn = document.querySelectorAll('button.menu-button');
    this.favOpen = document.querySelector('#open-favs');
  },

  render() {
    const products = document.createElement('products-element');
    this.main.insertBefore(products, this.main.childNodes[4]);

    this.cartOpen.onClick(() => {
      const cart = document.createElement('cart-modal');
      this.main.appendChild(cart);
    });

    this.favOpen.onClick(() => {
      const modal = document.createElement('favorites-modal');
      this.main.appendChild(modal);
    });
  },

  addHandler() {
    this.menuBtn.forEach((item) =>
      item.onClick((e) => {
        if (e.target.textContent !== app.store.category) {
          app.store.category = e.target.textContent;
          e.target.classList.add('active');
          this.menuBtn.forEach((item) => {
            if (item.textContent !== app.store.category) {
              item.classList.remove('active');
            }
          });
        }
      })
    );

    this.infoClose.onClick(() => {
      this.info.remove();
    });

    this.search.addEventListener('change', (e) => {
      app.store.search = e.target.value;
    });
  },
};

export default Setup;
