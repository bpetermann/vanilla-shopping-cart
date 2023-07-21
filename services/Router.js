const Router = {
  init: () => {
    const modal = document.getElementById('modal');
    const openBtn = document.getElementById('open-cart');
    const closeBtn = document.getElementById('close-cart');

    openBtn.onClick(() => {
      modal.removeAttribute('hidden');
    });

    closeBtn.onClick(() => {
      modal.setAttribute('hidden', true);
    });
  },
};

export default Router;
