export const EXPIRED_IN_HOURS = (hour: number = 1) => (Math.floor(Date.now() / 1000) + (hour * 60 * 60));
