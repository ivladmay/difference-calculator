import stylish from './stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`${format} is not defined`);
  }
};
