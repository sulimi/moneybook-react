import {CategorySection} from '../components/CategorySection';
import {TagsSection} from './tag/TagsSection';
import {NumberPadSection} from './numberPad/NumberPadSection';
import React, {useEffect, useState} from 'react';
import {useRecords} from '../hooks/useRecords';
import Icon from '../components/Icon';
import {useHistory} from 'react-router-dom';
import {useTags} from '../hooks/useTags';
import {Message} from '../components/Message';
import {AddHeader, AddMoneyWrapper} from './addMoney/AddMoneyHtml';
import dayjs from 'dayjs';
import {Category, Tag} from '../custom';
import {FalseAlert} from '../components/FalseAlert';


const AddMoney = () => {
  const initDefaul = {
    tag: {} as Tag,
    note: '',
    category: '-' as Category,
    amount: 0,
    createdAt: dayjs()
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
  const {addRecord, alertNum,alertTag} = useRecords();
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
  useEffect(() => {
    if (success) {
      setRecord(defaultRecordData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <AddMoneyWrapper>
      {alertNum && <FalseAlert>输入记账金额</FalseAlert>}
      {alertTag && <FalseAlert>选择一个分类</FalseAlert>}
      {success ? <Message>记账成功</Message> : ''}
      <AddHeader>
        <Icon name='quxiao' onClick={goBack}/>
        <CategorySection category={record.category}
                         onChange={category => onChange({category: category})}/>
        <Icon/>
      </AddHeader>
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
    </AddMoneyWrapper>
  );
};

export {AddMoney};