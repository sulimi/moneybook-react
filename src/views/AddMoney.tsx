import styled from 'styled-components';
import {CategorySection} from './money/CategorySection';
import {TagsSection} from './money/TagsSection';
import {NumberPadSection} from './money/NumberPadSection';
import React, {useState} from 'react';
import {useRecords} from '../hooks/useRecords';

const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`


const defaultRecordData = {
  // id: 0,
  tagsId: [] as number[],
  note: '',
  category: '-' as Category,
  amount: 0,
  // createdAt: ''
};

const AddMoney=()=>{
  const [record, setRecord] = useState(defaultRecordData);
  const onChange = (obj: Partial<typeof record>) => {
    setRecord({
      ...record,
      ...obj
    });
  };
  const {addRecord} = useRecords();
  const submit = () => {
    if (addRecord(record)) {
      alert('记账成功');
      setRecord(defaultRecordData);
    }
  };
  return (
    <Wrapper>
      <CategorySection category={record.category}
                       onChange={category => onChange({category: category})}/>
      <TagsSection tagsId={record.tagsId}
                   onChange={tagsId => onChange({tagsId})}/>

      <NumberPadSection amount={record.amount}
                        onChange={amount => onChange({amount: amount})}
                        onOk={submit}
                        note={record.note} onChangeNote={note => onChange({note: note})}
      />
    </Wrapper>
  )
}

export {AddMoney}