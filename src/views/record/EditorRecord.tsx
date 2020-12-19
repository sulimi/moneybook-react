import styled from 'styled-components';
import React, {useState} from 'react';
import {useRecords} from '../../hooks/useRecords';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Topbar} from '../tag/AddRewHtml';
import Icon from '../../components/Icon';
import dayjs from 'dayjs';
import {Space} from '../../components/Space';
import {DetailItem} from '../detail/DetailItem';
import {thousand} from '../../lib/thousandSeparator';
import {Message} from '../../components/Message';

const Wrapper = styled.div`
`;
const Tip = styled.div`
  background:  #F8F8F6;margin: 5px 16px;padding: 20px;border-radius: 20px;font-size: 16px;
  .item{
  padding: 10px 0;
    .left{
    color: #A5C9C0;
  }
  .note,.num{
    word-break: break-all;
  }
  
  }
    .editor,.delete{
  text-align: center;font-weight: bold;
  }
    .editor{
  color: #65C6BB;
  }
  .delete{
   color: #FA8072;
  }
`;

const EditorRecord = () => {
  type Params = {
    id: string
  }
  const {id} = useParams<Params>();
  const {records, deleteRecord} = useRecords();
  const record = records.filter(r => r.id === parseFloat(id));


  //返回
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();
  };
  const [success, setSuccess] = useState(false);
  const removeRecord = () => {
    setSuccess(true);
    record.length > 0 && deleteRecord(record[0]);
   setTimeout(()=>{
     setSuccess(false);
     history.goBack();
   },900)
  };
  return (
    <Wrapper>
      <Topbar>
        {success ? <Message>删除成功</Message> : ''}
        <div className='back' onClick={onClickBack}>
          <Icon name='left'/>
          <span>返回</span>
        </div>
        <span>小票</span>
        <div className='save'/>
      </Topbar>
      {record.map(r=>
        <DetailItem record={r} key={r.id}/>
      )}
      <Tip>
        <div className='item'><span
          className='left'>金额：</span><span className='num'>{record.length > 0 && record[0].category === '-' ? '-' : '+'}￥{record.length > 0 && thousand(record[0].amount.toString())}</span>
        </div>
        <div className='item'><span
          className='left'>日期：</span><span>{record.length > 0 && dayjs(record[0].createdAt).format('YYYY-MM-DD')}</span>
        </div>
        <div className='item'><span
          className='left'>类型：</span><span>{record.length > 0 && record[0].category === '-' ? '支出' : '收入'}</span></div>
        <div className='item'><span className='left'>备注：</span><span
          className='note'>{record.length > 0 && record[0].note}</span></div>
      </Tip>
      <Space/>
      <Space/>
      <Space/>
      <Link to={'/editoring/' + id}><Tip>
        <div className='editor'>编辑</div>
      </Tip></Link>
      <Tip onClick={removeRecord}>
        <div className='delete'>删除</div>
      </Tip>
    </Wrapper>
  );
};

export {EditorRecord};