import { HTMLComponent } from '../HTMLComponent.js';
import { validEmail } from '../../services/Helper.js';

export class Toast extends HTMLComponent {
  constructor() {
    super('newsletter/Toast.css');
  }

  connectedCallback() {
    this.appendClone('toast-template');

    this.subscription = JSON.parse(this.dataset.data);

    this.toast = this.$('#toast');
    this.message = this.$('p');
    this.image = this.$('.icon');
    this.close = this.$('button');
    this.bar = this.$('.inner');

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

    this.intervalid = setInterval(() => {
      time -= 1;
      this.bar.style.width = `${time}%`;
      this.bar.style.transition = `width ${40}ms`;
      if (time === 0) {
        this.closeHandler();
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
