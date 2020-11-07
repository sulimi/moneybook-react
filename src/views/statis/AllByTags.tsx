import {
  DayDetailBottom,
  DayDetailHeader,
  DayDetailLength,
  DayDetailWrapper
} from '../detail/DayDetailHtml';
import {Topbar} from '../tag/AddRewHtml';
import Icon from '../../components/Icon';
import {useHistory, useParams} from 'react-router-dom';
import {thousand} from '../../lib/thousandSeparator';
import React from 'react';
import {useRecords} from '../../hooks/useRecords';
import {hashCreate} from '../../lib/hashCreate';
import {DetailList} from '../detail/DetailList';

const AllByTags = () => {
  type Params = {
    tag: string
  }
  const {tag} = useParams<Params>();

  const splitTag = tag.split('&&');
  const {records} = useRecords();
  const byTagRecords = records.filter(r => r.tag.name === splitTag[0]).filter(r => new Date(r.createdAt).getMonth() === new Date(splitTag[3]).getMonth()
    && new Date(r.createdAt).getFullYear() === new Date(splitTag[3]).getFullYear());
  const count = byTagRecords.reduce((sum, i) => {return sum += i.amount;}, 0);
  const showList = hashCreate(byTagRecords);
  console.log(showList);
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
          <span className='title'>{splitTag[0]}<span
            className='date'>({new Date(splitTag[3]).getFullYear() + '-' + (new Date(splitTag[3]).getMonth() + 1)})</span></span>
          <div className='save'>

          </div>
        </Topbar>
        <DayDetailBottom>
          <div className='item bytag'>
            <div className='num'>{splitTag[2]==="-"?'-':'+'}￥{thousand(count.toString())}</div>
            <div className='text'>总{splitTag[2]==="-"?'支出':'收入'}</div>
          </div>
        </DayDetailBottom>
      </DayDetailHeader>
      <DayDetailLength>流水({byTagRecords.length})：</DayDetailLength>
      <DetailList records={showList}/>
    </DayDetailWrapper>
  );
};

export {AllByTags};