import {
  DayDetailBottom,
  DayDetailHeader,
  DayDetailLength,
  DayDetailWrapper
} from '../detail/DayDetailHtml';
import {Topbar} from '../tag/AddRewHtml';
import Icon from '../../components/Icon';
import {Link, useHistory, useParams} from 'react-router-dom';
import {thousand} from '../../lib/thousandSeparator';
import {DayDetailList} from '../detail/DayDetailList';
import React from 'react';
import {useRecords} from '../../hooks/useRecords';

const AllByTags=()=>{
  type Params = {
    tag: string
  }
  const {tag} = useParams<Params>();

  const splitTag=tag.split('&&')
  const {records} = useRecords();
  const byTagRecords = records.filter(r => r.tag.name===splitTag[0]).filter(r=>new Date(r.createdAt).getMonth()===new Date(splitTag[3]).getMonth()
    &&new Date(r.createdAt).getFullYear()===new Date(splitTag[3]).getFullYear());
  const count=byTagRecords.reduce((sum,i)=>{return sum+=i.amount},0)

  //返回
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();


  };
  return (
    <DayDetailWrapper>
      <DayDetailHeader>
        <Topbar>
          <div className='back' onClick={onClickBack}>
            <Icon name='left'/>
            <span>统计</span>
          </div>
          <span>{splitTag[0]}流水</span>
          <Link to='/addmoney' className='save'>
            记一笔
          </Link>
        </Topbar>
        <DayDetailBottom>
          <div className='item bytag'>
            <div className='num'>-￥{thousand(count.toString())}</div>
            <div className='text'>总支出</div>
          </div>
        </DayDetailBottom>
      </DayDetailHeader>
      <DayDetailLength>账单({records.length})：</DayDetailLength>
      <DayDetailList records={byTagRecords}/>
    </DayDetailWrapper>
  )
}

export {AllByTags}