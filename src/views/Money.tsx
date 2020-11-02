import React, {useState} from 'react';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';
import {useRecords} from '../hooks/useRecords';
import dayjs from 'dayjs';
import {hashCreate} from '../lib/hashCreate';
import {thousand} from '../lib/thousandSeparator';
import {DisplayWrapper, DisplayWrapper2, MyLayout, ThirtyDay, ThirtyDayHeader, ThirtyDayList} from './money/MoneyHTML';



function Money() {
  const {records} = useRecords();
  const todayRecord = records.filter(r => dayjs(r.createdAt).isSame(new Date(), 'day'));
  const recordArr = hashCreate(records).filter(([d, r], i, arr) =>
    dayjs(d) > dayjs(dayjs(arr[0][0]).subtract(29, 'day').format('YYYY-MM-DD')));

  const [showR, setShowR] = useState(false);
  const onShowR = () => {
    setShowR((showR) => !showR);
  };
  return (
    <MyLayout message='TODAY'>
      <div className='about'>
        <div className='paytext'>今日支出</div>
        <div
          className='paynum'>-￥{thousand(todayRecord.filter(r => r.category === '-').reduce((sum, item) => {return sum += item.amount;}, 0).toString())}</div>
        <div className='in'>收入￥{thousand(todayRecord.filter(r => r.category === '+').reduce((sum, item) => {return sum += item.amount;}, 0).toString())}</div>
      </div>
      <Link className='add-wrapper' to='/addmoney'>
        <button className='addmoney'>记一笔</button>
      </Link>
      <div className='toggle' onClick={onShowR}>展示近30天账单 ({recordArr.map(([d, r]) => r.length).reduce((sum,item)=>{return sum+item},0)})
        {showR ? <Icon name='xia'/> : <Icon name='right'/>}
      </div>
      {showR && <ThirtyDay>
        {recordArr.map(([date, records]) =>
          <ThirtyDay key={date}>
            <ThirtyDayHeader>
              <div className='day-header'>{dayjs(records[0].createdAt).isSame(new Date(), 'day') ?
                <span className='today'>今天</span> : ''}<span>{dayjs(records[0].createdAt).format('MM月')}</span><span
                className='day'>{dayjs(records[0].createdAt).format('D')}</span>
              </div>
              <div className='num'>
                <span>
                    {records.filter(r => r.category === '-').reduce((sum, item) => {return sum + item.amount;}, 0) ?
                      '支出￥' + thousand(records.filter(r => r.category === '-').reduce((sum, item) => {return sum + item.amount;}, 0).toString()) : ''}
                </span>
                <span>
                   {records.filter(r => r.category === '+').reduce((sum, item) => {return sum + item.amount;}, 0) ?
                     '收入￥' + thousand(records.filter(r => r.category === '+').reduce((sum, item) => {return sum + item.amount;}, 0).toString()) : ''}
                </span>
              </div>
            </ThirtyDayHeader>
            <ThirtyDay>
              {records.map(r =>
                <ThirtyDayList key={r.id}>
                  <DisplayWrapper>
                    <Icon name={r.tag.icon}/>
                    <DisplayWrapper2>
                      <div className='name'>{r.tag.name}</div>
                      {r.note && <div className='note'>{r.note}</div>}
                    </DisplayWrapper2>
                  </DisplayWrapper>
                  <div
                    className={r.category === '-' ? 'amount' : 'amount zheng'}>{r.category === '-' ? '-' : '+'}￥{thousand(r.amount.toString())}</div>
                </ThirtyDayList>
              )}
            </ThirtyDay>
          </ThirtyDay>
        )}
      </ThirtyDay>}

    </MyLayout>
  );
}

export default Money;
