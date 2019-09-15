module.exports = (str) => {
  return str.trim().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
};
