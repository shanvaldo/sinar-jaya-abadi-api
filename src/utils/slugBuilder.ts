export default (str: string) => {
  return str.trim().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
};
