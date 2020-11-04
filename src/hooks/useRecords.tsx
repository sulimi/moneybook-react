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
  const indexRecord = (record: RecordItem) => {
    return records.indexOf(record);
  };
  const addRecord = (record: newRecordItem) => {
    if (record.amount <= 0) {
      alert('金额小于0');
      return false;
    }
    if (!record.tag || record.tag.name === undefined) {
      alert('请选择标签');
      return false;
    }
    const recordAddId = {...record, id: createRecordId()};
    setRecords([...records, recordAddId]);
    return true;
  };
  const deleteRecord = (record: RecordItem) => {
    indexRecord(record)>=0 && records.splice(indexRecord(record), 1);
    window.localStorage.setItem('records', JSON.stringify(records));
  };
  return {records, addRecord,deleteRecord,indexRecord};
};

export {useRecords};