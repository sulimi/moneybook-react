import {CategorySection} from '../../components/CategorySection';
import {Message} from '../../components/Message';
import React, {useState} from 'react';
import {NumberPadSection} from '../numberPad/NumberPadSection';
import {TagsSection} from '../tag/TagsSection';
import Icon from '../../components/Icon';
import {useRecords} from '../../hooks/useRecords';
import {useHistory, useParams} from 'react-router-dom';
import {AddHeader, AddMoneyWrapper} from '../addMoney/AddMoneyHtml';
import {RecordItem} from '../../custom';
import {FalseAlert} from '../../components/FalseAlert';


const EditorIng = () => {
  type Params = {
    id: string
  }
  const {id} = useParams<Params>();
  const {updateRecord,alertNum} = useRecords();
  const records = JSON.parse(window.localStorage.getItem('records') || '[]') as RecordItem[];
  const [record,setRecord] = useState(records.filter(r => r.id === parseFloat(id))[0]);
  const onChange = (obj: Partial<typeof record>) => {
    //收集信息的
    setRecord({...record,...obj})
  };
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const submit = () => {
    updateRecord(record)
    if (updateRecord(record)){
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        history.goBack();
      }, 800);
    }
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <AddMoneyWrapper>
      {alertNum && <FalseAlert>请输入有效金额</FalseAlert>}
      {success ? <Message>编辑成功</Message> : ''}
      <AddHeader>
        <Icon name='quxiao' onClick={goBack}/>
        <CategorySection category={record.category}
                         onChange={category => onChange({category: category})}/>
        <Icon/>
      </AddHeader>
      <TagsSection tagId={record.tag.id} tagCategory={record.category}
                   onChange={tag => onChange({tag})}/>

      <NumberPadSection id={record.id}
                        amount={record.amount}
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

export {EditorIng};