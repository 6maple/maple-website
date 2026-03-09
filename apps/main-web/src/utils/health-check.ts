import { createIntervalManager } from './schedule';
import { check, refresh } from '@/api/auth';

const HEALTH_CHECK_INTERVAL = 3 * 1000;
const handleCheck = async () => {
  const data = await check();
  if (data.needRefresh) {
    await refresh();
  }
};
const manager = createIntervalManager(HEALTH_CHECK_INTERVAL, handleCheck);

export const startHealthCheck = () => {
  manager.start();
};
export const stopHealthCheck = () => {
  manager.stop();
};
