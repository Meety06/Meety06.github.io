(() => {
  const panel = document.querySelector('.lab');
  if (!panel || !window.frameElement) return;

  const resize = () => {
    const height = Math.ceil(panel.getBoundingClientRect().height) + 2;
    if (Math.abs(window.frameElement.getBoundingClientRect().height - height) > 2) {
      window.frameElement.style.height = `${height}px`;
    }
  };

  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(panel);
  window.addEventListener('load', resize);
  resize();
})();
