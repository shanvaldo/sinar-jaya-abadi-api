import redisClient from './redis.config';

interface IResponseDataLoader {
  clear: (key: string) => Promise<void>;
  clearAll: () => Promise<void>;
  load: (key: string) => Promise<any>;
  loadMany: (keys: Array<string>) => Promise<Array<any>>;
  prime: (key: string, value: any) => Promise<void>;
}

interface IOptionsDataLoader {
  expire?: number;
  cache?: boolean;
}

interface ILoadData extends IOptionsDataLoader {
  keys: Array<string>;
  resource: string;
  fn: (keys: Array<string>) => Promise<Array<any>>;
}

const expire = Number(process.env.DEV_REDIS_EXPIRE) || 30;
const cache = true;

const loadData = (_: ILoadData): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!_.keys.length) {
      return resolve([]);
    }

    if (!_.cache) {
      return resolve(_.fn(_.keys));
    }

    redisClient.mget(_.keys.map((key) => `${_.resource}:${key}`), async (errGet, replies) => {
      if (!!errGet) {
        // tslint:disable-next-line: no-console
        console.error(errGet);
      }

      // handle redis if not active
      const responseFromRedis = !replies ? _.keys.map((k) => null) : replies;

      const emptyData = _.keys.filter((key, idx) => !responseFromRedis[idx] ? key : false);

      let data: Array<any> = [];
      if (emptyData.length) {
        try {
          data = await _.fn(emptyData);
        } catch (error) {
          return reject(error);
        }

        const exportMulti = redisClient.multi();

        data.forEach((d) => {
          exportMulti.set(`${_.resource}:${d.id}`, JSON.stringify(d));
          exportMulti.expire(`${_.resource}:${d.id}`, expire);
        });

        exportMulti.exec((errMulti) => {
          if (!!errMulti) {
            // tslint:disable-next-line: no-console
            console.error(errMulti);
          }
        });
      }

      const result = (<Array<string>> responseFromRedis).map((reply, idx) => {
        if (!!reply) {
          return JSON.parse((<Array<string>> responseFromRedis)[idx]);
        }

        return data.find((d) => d.id === _.keys[idx]);
      });

      return resolve(result);
    });
  });
};

// tslint:disable-next-line: max-line-length
export default (resource: string, fn: (keys: Array<string>) => Promise<Array<any>>, options: IOptionsDataLoader = { cache, expire }): IResponseDataLoader => {
  return {
    clear: (key: string) => {
      return new Promise((resolve) => {
        redisClient.del(`${resource}:${key}`, () => resolve());
      });
    },
    clearAll: () => {
      return new Promise((resolve) => {
        redisClient.scan(['0', 'MATCH', `${resource}:*`], (errScan, [, keys]) => {
          if (!!errScan) {
            // tslint:disable-next-line: no-console
            console.error(errScan);
          }

          redisClient.del(keys, () => resolve());
        });
      });
    },
    load: (key: string) => {
      return new Promise(async (resolve, reject) => {
        try {
          const [response] = await loadData({ keys: [key], resource, fn, ...options });

          return resolve(response);
        } catch (error) {
          return reject(error);
        }
      });
    },
    loadMany: (keys: Array<string>) => loadData({ keys, resource, fn, ...options }),
    prime: (key: string, value: any) => {
      return new Promise((resolve) => {
        redisClient.set(`${resource}:${key}`, JSON.stringify(value), (errSet) => {
          if (!!errSet) {
            // tslint:disable-next-line: no-console
            console.error(errSet);
          }

          return resolve();
        });
      });
    },
  };
};
