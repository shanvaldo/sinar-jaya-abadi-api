module.exports = (hour = 1) => (Math.floor(Date.now() / 1000) + (hour * 60 * 60));
