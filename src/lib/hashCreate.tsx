import dayjs from 'dayjs';
import {RecordItem} from '../custom';

const hashCreate = (arr: RecordItem[]) => {
  const hash: { [K: string]: RecordItem[] } = {};
  arr.forEach(r => {
    const key = dayjs(r.createdAt).format('YYYY-MM-DD');
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].push(r);
  });
  return  Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    } else if (a[0] > b[0]) {
      return -1;
    } else if (a[0] < b[0]) {
      return 1;
    } else {
      return 0;  //解决TS报错
    }
  });
};

export {hashCreate};