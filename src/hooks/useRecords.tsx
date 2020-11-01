import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';
import {createRecordId} from '../lib/createRecordId';

// type newRecordItem = Omit<RecordItem, 'id' | 'createdAt'>

const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);
  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, records);
  const addRecord = (record: newRecordItem) => {
    if (record.amount <= 0) {
      alert('金额小于0');
      return false;
    }
    if (!record.tag||record.tag.name===undefined) {
      alert('请选择标签');
      return false;
    }
    const recordAddId = {...record, id: createRecordId()};
    setRecords([...records, recordAddId]);
    return true;
  };
  return {records, addRecord};
};

export {useRecords};