(() => {
  const root = document.documentElement;
  try {
    const parentRoot = window.parent.document.documentElement;
    const sync = () => {
      root.dataset.theme = parentRoot.classList.contains('dark') ? 'dark' : 'light';
    };
    sync();
    new MutationObserver(sync).observe(parentRoot, {
      attributes: true,
      attributeFilter: ['class'],
    });
  } catch {
    root.dataset.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
})();
