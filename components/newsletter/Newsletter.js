import HTMLComponent from '../HTMLComponent.js';

export default class Newsletter extends HTMLComponent {
  #subscribe = { email: '', interestedIn: '' };

  constructor() {
    super('newsletter/Newsletter.css');
  }

  connectedCallback() {
    this.appendClone('newsletter-template');

    this.form = this.root.querySelector('form');

    this.setFormBindings(this.form);
  }

  setFormBindings(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log({
        email: this.#subscribe.email,
        interestedIn: this.#subscribe.interestedIn,
      });

      form.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
      });
      this.#subscribe.email = '';
      this.#subscribe.interestedIn = '';
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
