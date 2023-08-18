HTMLElement.prototype.onClick = function (a, b) {
  this.addEventListener('click', a, b);
};

HTMLElement.prototype.onChange = function (a, b) {
  this.addEventListener('change', a, b);
};

const $ = (id) => document.querySelector(id);
const $$ = (id) => document.querySelectorAll(id);

export const Setup = {
  start() {
    this.select();
    this.render();
    this.addHandler();
  },

  select() {
    this.main = $('main');
    this.cartOpen = $('#open-cart');
    this.search = $('#searchbar-text');
    this.infoClose = $('button.icon-button');
    this.info = $('#info-bar');
    this.favOpen = $('#open-favs');
    this.searchbarBtn = $('.burger-button');
    this.categoryMobile = $('.category-mobile');
    this.languageSelect = $$('select');
    this.menuBtn = $$('button.menu-button');
  },

  render() {
    const products = document.createElement('products-element');
    this.main.append(products);

    const newletter = document.createElement('newsletter-element');
    this.main.append(newletter);
  },

  addHandler() {
    this.infoClose.onClick(() => {
      this.info.remove();
    });

    this.cartOpen.onClick(() => {
      const cart = document.createElement('cart-modal');
      this.main.appendChild(cart);
    });

    this.favOpen.onClick(() => {
      const modal = document.createElement('favorites-modal');
      this.main.appendChild(modal);
    });

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

    this.search.onChange((e) => {
      app.store.search = e.target.value;
    });

    this.searchbarBtn.onClick(() => {
      this.categoryMobile.classList.contains('hide')
        ? this.categoryMobile.classList.remove('hide')
        : this.categoryMobile.classList.add('hide');
    });

    this.languageSelect.forEach((item) =>
      item.onChange((e) => {
        app.store.language = e.target.value;
      })
    );
  },
};
