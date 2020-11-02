import styled from 'styled-components';
import {CategorySection} from '../components/CategorySection';
import {TagsSection} from './tag/TagsSection';
import {NumberPadSection} from './numberPad/NumberPadSection';
import React, {useEffect, useState} from 'react';
import {useRecords} from '../hooks/useRecords';
import Icon from '../components/Icon';
import {useHistory} from 'react-router-dom';
import {useTags} from '../hooks/useTags';
import {Message} from '../components/Message';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;
const Header = styled.header`
  display: flex;justify-content: space-between;align-items: center;padding: 0 6px;flex-shrink: 0;
  .icon{
    width:2em;
    height:2em;
  }
`;

const AddMoney = () => {
  const initDefaul = {
    tag: {} as Tag,
    note: '',
    category: '-' as Category,
    amount: 0,
    createdAt: new Date()
  };
  const {tags} = useTags();
  let [defaultRecordData, setDef] = useState(initDefaul);
  useEffect(() => {
    if (tags.length !== 0) {
      setDef({...initDefaul, tag: tags[0]});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);
  const [record, setRecord] = useState(defaultRecordData);
  useEffect(() => {
    if (defaultRecordData.tag.id) {
      setRecord(defaultRecordData);
    }
  }, [defaultRecordData]);
  const onChange = (obj: Partial<typeof record>) => {
    setRecord({
      ...record,
      ...obj
    });
  };
  const [success, setSuccess] = useState(false);
  const {addRecord} = useRecords();
  const submit = () => {
    addRecord(record);
    if (addRecord(record)) {
      setRecord(defaultRecordData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
  };
  useEffect(()=>{
    if (success){
      setRecord(initDefaul)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[success])
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <Wrapper>
      {success ? <Message>记账成功</Message> : ''}
      <Header>
        <Icon name='quxiao' onClick={goBack}/>
        <CategorySection category={record.category}
                         onChange={category => onChange({category: category})}/>
        <Icon/>
      </Header>
      <TagsSection tagId={record.tag.id} tagCategory={record.category}
                   onChange={tag => onChange({tag})}/>

      <NumberPadSection amount={record.amount}
                        onChange={amount => onChange({amount: amount})}
                        onOk={submit}
                        note={record.note}
                        onChangeNote={note => onChange({note: note})}
                        createdAt={record.createdAt}
                        onChangeDay={createAt => onChange({createdAt: createAt})}

      />
    </Wrapper>
  );
};

export {AddMoney};