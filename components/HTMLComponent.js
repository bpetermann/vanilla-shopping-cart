export default class HTMLComponent extends HTMLElement {
  constructor(path) {
    super();

    this.root = this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch(path);
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
