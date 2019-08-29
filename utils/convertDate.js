const { isArray, isObject } = require('util');

const convert = (value) => ({
  ...value.dataValues,
  createdAt: value.createdAt.toISOString(),
  updatedAt: value.updatedAt.toISOString(),
});

module.exports = (data) => {
  if (isArray(data)) return data.map(convert);

  else if (isObject(data)) return convert(data);

  else return data;
};