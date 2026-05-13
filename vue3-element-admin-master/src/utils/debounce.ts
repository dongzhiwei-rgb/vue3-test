/**
 * 防抖函数
 *
 * @param fn 需要防抖的函数
 * @param wait 延迟时间，默认 200ms
 * @param immediate 是否立即执行
 * @returns 一个防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait = 200,
  immediate = false,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    };

    const callNow = immediate && timeout === null;

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = window.setTimeout(later, wait);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}
