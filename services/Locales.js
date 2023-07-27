import API from './Api.js';

const $ = (id) => document.querySelector(id);

const Locale = {
  async load() {
    return await API.getLocale();
  },

  set() {
    $('#info-bar > p').innerHTML = app.store.t['FREE SHIPPING AND RETURNS'];
    $('.shoes').innerHTML = app.store.t['Shoes'];
    $('.bags').innerHTML = app.store.t['Bags'];
    $('.mobile.shoes').innerHTML = app.store.t['Shoes'];
    $('.mobile.bags').innerHTML = app.store.t['Bags'];
    $('#en').innerHTML = app.store.t['en'];
    $('#de').innerHTML = app.store.t['de'];
  },
};

export default Locale;
