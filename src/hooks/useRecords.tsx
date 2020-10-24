import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

// type RecordItem = {
//   tagsId: number[]
//   note: string
//   category: '+' | '-'
//   amount: number
//   createdAt: string
// }
// type newRecordItem={
//   tagsId: number[]
//   note: string
//   category: '+' | '-'
//   amount: number
// }

//可以简写
type newRecordItem = {
  tagsId: number[]
  note: string
  category: '+' | '-'
  amount: number
}
type RecordItem = newRecordItem & {
  createdAt: string
}


const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);
  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, [records]);
  const addRecord = (record: newRecordItem) => {
    const recordAddTime = {...record, createdAt: (new Date()).toISOString()};
    setRecords([...records, recordAddTime]);
  };
  return {records, addRecord};
};

export {useRecords};