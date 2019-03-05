const debounce = (delay, func) => {
  let inDebounce;

  return () => {
    const context = this;
    const args = arguments;

    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

export { debounce };