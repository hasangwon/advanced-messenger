import _ from 'lodash';

export const isArrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => {
      return _.isEqual(val, b[index]);
    })
  );
};
