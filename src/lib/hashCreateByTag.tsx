import {RecordItem} from '../custom';

const hashCreateByTag=(arr:RecordItem[])=>{
  const hash: { [K: string]: RecordItem[] } = {};
  arr.forEach(r=>{
    const key=r.tag.name;
    if (!(key in hash)){
      hash[key]=[]
    }
    // +"&&"+r.tag.icon+"&&"+r.category
    hash[key].push(r)
  })
  return Object.entries(hash)
}

export {hashCreateByTag}