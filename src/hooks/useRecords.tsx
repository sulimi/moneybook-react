import {useState} from 'react';

type RecordItem = {
  tagIds: number[]
  note: string
  category: '+' | '-'
  amount: number
}
const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const addRecord = (record: RecordItem) => {
    setRecords([...records, record]);
  };
};

export {useRecords};