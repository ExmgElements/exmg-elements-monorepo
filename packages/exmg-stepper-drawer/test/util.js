export const promisifyFlush = (flush) => () => new Promise(resolve => flush(resolve));
