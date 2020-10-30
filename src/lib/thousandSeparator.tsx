const thousand = (num: string) => {
  const arr = num.split('.');
  let left = arr[0];
  let right = '';
  if (arr.length === 2) {
    right = '.'+arr[1];
  }
  left = left.split('').reverse().join('');
  left = left.replace(/(\d{3})/g, function (m, m1) { return m1 + ','; });
  left = left.split('').reverse().join('');
  if (left[0] === ',') {
    left = left.slice(1);
  }
  return left + right;
};

export {thousand}