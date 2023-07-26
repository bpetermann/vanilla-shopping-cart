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
    this.image = this.root.querySelector('.icon');
    this.close = this.root.querySelector('button');
    this.bar = this.root.querySelector('.inner');

    this.render();
  }

  render() {
    this.renderTime();

    // TODO: Validate
    if (this.subscription.email) {
      this.displaySuccess();
    }

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
    const distance = 40;
    const close = this.closeHandler;

    const intervalid = setInterval(() => {
      time -= 1;
      this.bar.style.width = `${time}%`;
      this.bar.style.transition = `width ${distance}ms`;
      if (time === 0) {
        clearInterval(intervalid);
        close();
      }
    }, distance);
  }

  closeHandler() {
    const main = document.querySelector('main');
    main.removeChild(document.querySelector('toast-element'));
  }
}

customElements.define('toast-element', Toast);
