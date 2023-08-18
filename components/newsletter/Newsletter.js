import { HTMLComponent } from '../HTMLComponent.js';

export class Newsletter extends HTMLComponent {
  #subscribe = { email: '', interestedIn: 'wfashion' };

  constructor() {
    super('newsletter/Newsletter.css');
  }

  connectedCallback() {
    this.appendClone('newsletter-template');

    this.form = this.$('form');
    this.setFormBindings(this.form);
    this.locales();

    window.addEventListener('localesChanged', () => {
      this.locales();
    });
  }

  locales() {
    const { t } = app.store;
    this.$('#newsletter h2').innerHTML = t['JOIN OUR NEWSLETTER!'];
    this.$('#newsletter p').innerHTML = t['Keep up to date'];
    this.$('form p').innerHTML = t['I am mostly interested in'];
    this.$('label[for="wfashion"]').innerHTML = t["Women's Fashion"];
    this.$('label[for="mfashion"]').innerHTML = t["Men's Fashion"];
    this.$('#newsletter button[type="submit"]').innerHTML = t['Add my Email'];
    this.$('#unsubscribe').innerHTML = t['Unsubscribe'];
  }

  setFormBindings(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!document.querySelector('toast-element')) {
        const toast = document.createElement('toast-element');
        toast.dataset.data = JSON.stringify({
          email: this.#subscribe.email,
          interestedIn: this.#subscribe.interestedIn,
        });
        this.main.appendChild(toast);
      }

      form.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
      });
      this.#subscribe.email = '';
      this.#subscribe.interestedIn = 'wfashion';
    });

    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        element.addEventListener('change', () => {
          this.#subscribe[element.name] = element.value;
        });
      }
    });

    this.#subscribe = new Proxy(this.#subscribe, {
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;

        return true;
      },
    });
  }
}

customElements.define('newsletter-element', Newsletter);
