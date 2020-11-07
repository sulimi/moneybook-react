import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';
import {createRecordId} from '../lib/createRecordId';
import {newRecordItem, RecordItem} from '../custom';

// type newRecordItem = Omit<RecordItem, 'id' | 'createdAt'>

const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [alertTag, setAlertTag] = useState(false);
  const [alertNum, setAlertNum] = useState(false);
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);
  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, records);
  const findRecord = (id: number) => {
    return records.filter(r => r.id === id)[0];
  };
  const indexRecord = (record: RecordItem) => {
    const r = records.filter(r => r.id === record.id)[0];
    return records.indexOf(r);
  };
  const addRecord = (record: newRecordItem) => {
    if (record.amount <= 0) {
      setAlertNum(() => true);
      setTimeout(() => {
        setAlertNum(() => false);
      }, 1000);
      return false;
    }
    if (!record.tag || record.tag.name === undefined) {
      setAlertTag(() => true);
      setTimeout(() => {
        setAlertTag(() => false);
      }, 1000);
      return false;
    }
    const recordAddId = {...record, id: createRecordId()};
    setRecords([...records, recordAddId]);
    return true;
  };
  const updateRecord = (record: RecordItem) => {
    if (record.amount <= 0) {
      setAlertNum(() => true);
      setTimeout(() => {
        setAlertNum(() => false);
      }, 1000);
      return false;
    }
    records.splice(indexRecord(record), 1, record);
  };
  const deleteRecord = (record: RecordItem) => {
    indexRecord(record) >= 0 && records.splice(indexRecord(record), 1);
    window.localStorage.setItem('records', JSON.stringify(records));
  };
  return {
    records, addRecord, deleteRecord, indexRecord, findRecord, setRecords, updateRecord,
    alertTag, alertNum
  };
};

export {useRecords};