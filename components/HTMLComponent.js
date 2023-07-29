export default class HTMLComponent extends HTMLElement {
  constructor(path) {
    super();

    this.$ = (id) => this.root.querySelector(id);

    this.root = this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    this.root.appendChild(styles);

    this.main = document.querySelector('main');

    async function loadCSS() {
      const request = await fetch(`./components/${path}`);
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  appendClone(id) {
    const template = document.getElementById(id);
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }
}
