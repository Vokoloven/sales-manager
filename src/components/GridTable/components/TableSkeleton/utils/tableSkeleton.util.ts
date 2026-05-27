const subscribe = (cb: () => void) => {
  window.addEventListener('resize', cb);
  return () => {
    window.removeEventListener('resize', cb);
  };
};

export { subscribe };
