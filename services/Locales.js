import { API } from './API.js';

const $ = (id) => document.querySelector(id);

export const Locale = {
  async load() {
    return await API.getLocale();
  },

  set() {
    const { t } = app.store;

    $('#info-bar > p').innerHTML = t['FREE SHIPPING AND RETURNS'];
    $('.shoes').innerHTML = t['Shoes'];
    $('.bags').innerHTML = t['Bags'];
    $('.mobile.shoes').innerHTML = t['Shoes'];
    $('.mobile.bags').innerHTML = t['Bags'];
    $('#en').innerHTML = t['en'];
    $('#de').innerHTML = t['de'];
    $('#hero p').innerHTML = t['The 3 Pairs of Shoes'];
    $('#hero button').innerHTML = t['Shop now'];
    $('.footer-links li:first-child').innerHTML = t['About'];
    $('.footer-links li:nth-child(2)').innerHTML = t['Imprint'];
    $('.footer-links li:nth-child(3)').innerHTML = t['Terms'];
    $('.footer-links li:nth-child(4)').innerHTML = t['Data settings'];
    $('nav.footer-social span').innerHTML = t['Find more inspiration:'];
  },
};
