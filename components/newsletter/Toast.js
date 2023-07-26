import HTMLComponent from '../HTMLComponent.js';
import { validEmail } from '../../services/Helper.js';

export default class Toast extends HTMLComponent {
  constructor() {
    super('newsletter/Toast.css');
  }

  connectedCallback() {
    this.appendClone('toast-template');

    this.subscription = JSON.parse(this.dataset.data);

    this.toast = this.root.querySelector('#toast');
    this.message = this.root.querySelector('p');
    this.image = this.root.querySelector('.icon');
    this.close = this.root.querySelector('button');
    this.bar = this.root.querySelector('.inner');

    this.render();
  }

  render() {
    this.addEventHandlers();

    if (validEmail(this.subscription.email)) {
      this.displaySuccess();
    }

    this.renderTime();
  }

  addEventHandlers() {
    this.close.onClick(() => {
      this.closeHandler();
    });
  }

  displaySuccess() {
    this.toast.classList.add('success');
    this.message.innerHTML = 'Success';
    this.image.src = '/images/icons/done.png';
  }

  renderTime() {
    let time = 100;
    const close = this.closeHandler;

    this.intervalid = setInterval(() => {
      time -= 1;
      this.bar.style.width = `${time}%`;
      this.bar.style.transition = `width ${40}ms`;
      if (time === 0) {
        clearInterval(this.intervalid);
        close();
      }
    }, 40);
  }

  closeHandler() {
    clearInterval(this.intervalid);

    if (document.querySelector('toast-element'))
    this.main.removeChild(document.querySelector('toast-element'));
  }
}

customElements.define('toast-element', Toast);
