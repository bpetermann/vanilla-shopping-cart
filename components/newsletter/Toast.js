import HTMLComponent from '../HTMLComponent.js';

export default class Toast extends HTMLComponent {
  constructor() {
    super('newsletter/Toast.css');
  }

  connectedCallback() {
    this.appendClone('toast-template');

    this.subscription = JSON.parse(this.dataset.data);
    this.toast = this.root.querySelector('#toast');
    this.message = this.root.querySelector('p');
    this.close = this.root.querySelector('button');

    this.render();
  }

  render() {
    // TODO: Validate
    if (this.subscription.email) {
      this.toast.classList.add('success');
      this.message.innerHTML = 'Success';
    }

    this.close.onClick(() => {
      const main = document.querySelector('main');
      main.removeChild(document.querySelector('toast-element'));
    });
  }
}

customElements.define('toast-element', Toast);
