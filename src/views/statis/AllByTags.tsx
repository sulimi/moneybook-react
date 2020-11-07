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
import dayjs from 'dayjs';

const AllByTags = () => {
  type Params = {
    tag: string
  }
  const {tag} = useParams<Params>();

  const splitTag = tag.split('&&');
  const {records} = useRecords();
  const byTagRecords = records.filter(r => r.tag.name === splitTag[0]).filter(r => dayjs(r.createdAt).month() === dayjs(splitTag[3]).month()
    && dayjs(r.createdAt).year() === dayjs(splitTag[3]).year());
  const count = byTagRecords.reduce((sum, i) => {return sum += i.amount;}, 0);
  const showList = hashCreate(byTagRecords);
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
            className='date'>({dayjs(splitTag[3]).year() + '-' + (dayjs(splitTag[3]).month() + 1)})</span></span>
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