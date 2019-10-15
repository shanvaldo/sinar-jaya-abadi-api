import redis from 'redis';

const host = process.env.DEV_REDIS_HOST;

export default redis.createClient({
  host,
  retry_strategy: () => new Error('The server refused the connection'),
});
