export default function debounce(callback: any, timeout = 300) {
  let cleanup: any;
  return (...args: any[]) => {
    clearTimeout(cleanup);
    cleanup = setTimeout(callback.bind(null, ...args), timeout);
  };
}
