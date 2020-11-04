import styled from 'styled-components';
import React from 'react';
import {useRecords} from '../../hooks/useRecords';
import {DayDetailList} from '../detail/DayDetailList';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Topbar} from '../tag/AddRewHtml';
import Icon from '../../components/Icon';
import dayjs from 'dayjs';
import {Space} from '../../components/Space';

const Wrapper = styled.div`
`;
const Tip = styled.div`
  background:  #F8F8F6;margin: 5px 16px;padding: 20px;border-radius: 20px;font-size: 16px;
  .item{
  padding: 10px 0;
    .left{
    color: #A5C9C0;
  }
  .note{
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
  const removeRecord = () => {
    record.length > 0 && deleteRecord(record[0]);
    history.goBack();
  };
  return (
    <Wrapper>
      <Topbar>
        <div className='back' onClick={onClickBack}>
          <Icon name='left'/>
          <span>返回</span>
        </div>
        <span>小票</span>
        <div className='save'/>
      </Topbar>
      <DayDetailList records={record}/>
      <Tip>
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
      <Link to='/addmoney'><Tip>
        <div className='editor'>编辑</div>
      </Tip></Link>
      <Tip onClick={removeRecord}>
        <div className='delete'>删除</div>
      </Tip>
    </Wrapper>
  );
};

export {EditorRecord};