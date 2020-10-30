import styled from 'styled-components';
import {CategorySection} from '../components/CategorySection';
import {TagsSection} from './tag/TagsSection';
import {NumberPadSection} from './numberPad/NumberPadSection';
import React, {useState} from 'react';
import {useRecords} from '../hooks/useRecords';
import Icon from '../components/Icon';
import {useHistory} from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;
const Header = styled.header`
  display: flex;justify-content: space-between;align-items: center;padding: 0 6px;
  .icon{
    width:2em;
    height:2em;
  }
`;

const defaultRecordData = {
  // id: 0,
  tag:{} as Tag,
  note: '',
  category: '-' as Category,
  amount: 0,
  // createdAt: ''
};

const AddMoney = () => {
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
  const history=useHistory()
  const goBack = () => {
    history.goBack()
  };
  return (
    <Wrapper>
      <Header>
        <Icon name='quxiao' onClick={goBack}/>
        <CategorySection category={record.category}
                         onChange={category => onChange({category: category})}/>
        <Icon/>
      </Header>
      <TagsSection tagId={record.tag.id}
                   onChange={tag => onChange({tag})}/>

      <NumberPadSection amount={record.amount}
                        onChange={amount => onChange({amount: amount})}
                        onOk={submit}
                        note={record.note} onChangeNote={note => onChange({note: note})}
      />
    </Wrapper>
  );
};

export {AddMoney};