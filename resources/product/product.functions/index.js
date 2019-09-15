module.exports = Object.freeze({
  create: require('./create.product'),
  delete: require('./delete.product'),
  findAll: require('./findAll.product'),
  findById: require('./findById.product'),
  findBySlug: require('./findBySlug.product'),
  incrementSeen: require('./incrementSeen.product'),
  recommendation: require('./recommendation.product'),
  update: require('./update.product'),
});
