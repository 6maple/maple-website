// 斐波那契数列 延迟的时间
export const createDynamicTimeout = (
  initialTimeout: number = 100,
  maxIncreasedTimeout: number = 30000,
) => {
  let prevTimeout = 0;
  let timeout = initialTimeout;
  const getTimeout = () => {
    return timeout;
  };
  const resetTimeout = () => {
    prevTimeout = 0;
    timeout = initialTimeout;
  };
  const increaseTimeout = () => {
    if (timeout >= maxIncreasedTimeout) {
      return;
    }
    const value = prevTimeout + timeout;
    prevTimeout = timeout;
    timeout = Math.min((1 + Math.random() * 0.1) * value, maxIncreasedTimeout);
  };
  return { getTimeout, resetTimeout, increaseTimeout };
};
