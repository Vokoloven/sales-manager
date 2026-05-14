const debounceFn = <T extends unknown[]>(cb: (...params: T) => void, delay = 500) => {
  let timer: NodeJS.Timeout;

  return (...params: T) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb(...params);
    }, delay);
  };
};

export { debounceFn };
