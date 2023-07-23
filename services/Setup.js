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
    this.searchbarBtn = document.querySelector('.burger-button');
    this.categoryMobile = document.querySelector('.category-mobile');
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

          this.menuBtn.forEach((item) => {
            item.textContent !== app.store.category
              ? item.classList.remove('active')
              : item.classList.add('active');
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

    this.searchbarBtn.onClick(() => {
      this.categoryMobile.classList.contains('hide')
        ? this.categoryMobile.classList.remove('hide')
        : this.categoryMobile.classList.add('hide');
    });
  },
};

export default Setup;
