import {CategorySection} from './money/CategorySection';
import {NoteSection} from './money/NoteSection';
import Layout from '../components/Layout';
import {NumberPadSection} from './money/NumberPadSection';
import {TagsSection} from './money/TagsSection';
import styled from 'styled-components';
import React, {useState} from 'react';
import {useRecords} from '../hooks/useRecords';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;

type Category = '-' | '+'
const defaultRecordData = {
  tagsId: [] as number[],
  note: '',
  category: '-' as Category,
  amount: 0
};

function Money() {
  const [record, setRecord] = useState(defaultRecordData);
  const onChange = (obj: Partial<typeof record>) => {
    setRecord({
      ...record,
      ...obj
    });
  };
  const {addRecord} = useRecords();
  const submit = () => {
    addRecord(record);
    alert('记账成功');
    setRecord(defaultRecordData);
  };
  return (
    <MyLayout>
      <TagsSection tagsId={record.tagsId}
                   onChange={tagsId => onChange({tagsId})}/>
      <NoteSection note={record.note}
                   onChange={note => onChange({note: note})}/>
      <CategorySection category={record.category}
                       onChange={category => onChange({category: category})}/>
      <NumberPadSection amount={record.amount}
                        onChange={amount => onChange({amount: amount})}
                        onOk={submit}
      />
    </MyLayout>
  );
}

export default Money;

