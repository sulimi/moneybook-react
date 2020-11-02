import Layout from '../components/Layout';
import styled from 'styled-components';
import React, {useState} from 'react';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';
import {useRecords} from '../hooks/useRecords';
import dayjs from 'dayjs';
import {hashCreate} from '../lib/hashCreate';
import {thousand} from '../lib/thousandSeparator';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;align-items: center;
  > .about{
   display:flex;flex-direction: column;justify-content: flex-end;align-items: center;flex-shrink: 0;
   height: 30vh;font-weight: bold;
    .paytext{
      color: #A5C9C0;text-align: center;
      font-size: 14px;
    }
    .paynum{
      color: #A5C9C0;font-size: 32px;text-align: center;padding: 10px;word-break: break-all
    }
    .in{
      font-size: 14px;color: #AAAAAA;text-align: center;word-break: break-all
    }
  }
  > .add-wrapper{
      height: 20vh;padding-bottom: 30px;
      display:flex;flex-direction: column;justify-content: flex-end;align-items: center;flex-shrink: 0;
    > .addmoney{
  font-size: 16px;font-weight: bold;color: #444444;
    background: #BFD9D3;border: 1px solid #65C6BB;padding: 12px 40px;border-radius: 10px;
  }
  }

  > .toggle{
  display: flex;justify-content: center;align-items: center;flex-shrink: 0;
    font-size: 14px;color: #AAAAAA;padding: 16px;
    .icon{
      fill: #AAAAAA;margin-left: 10px;
    }
    
  }
  
`;
const ThirtyDay = styled.div`
  display: flex;flex-direction: column;width: 100%;
`;

const ThirtyDayHeader = styled.div`
display: flex;align-items: center;justify-content: space-between;width: 100%;padding: 10px 24px 10px 30px;

.day-header{
  color:#65C6BB;font-size: 12px;background: #fff;flex-shrink: 0;margin-right: 5px;
  .today{
     margin-right: 5px;
  }
  .day{
    font-weight: bold;
    font-size: 16px;margin-left: 5px;
  }
}
.num{
display: flex;align-items: center;justify-content: flex-end;flex-wrap: wrap;
  > span{
    padding-left: 10px;word-break: break-all;
  }
}
`;
const ThirtyDayList = styled.div`
display: flex;align-items: center;justify-content: space-between;padding: 16px;background: #F8F8F6;
margin: 5px 16px;border-radius: 10px;
  .icon{
    width: 3em;height: 3em;flex-shrink: 0;
  }
  .amount{
    font-size: 18px;font-weight: bold;flex-shrink: 0;
    &.zheng{
      color:#65C6BB
    }
  }
`;
const DisplayWrapper = styled.div`
  display: flex;align-items: center;
`;
const DisplayWrapper2 = styled.div`
  display: flex;flex-direction:column;justify-content: center;flex-grow: 1;
  .name{
    flex-grow: 1;flex-shrink: 0;padding: 0 3px 3px;
    height: 2em;display: flex;align-items: flex-end;
  }
  .note{
      font-size: 10px;color: #AAA;padding: 0 3px 5px;height: 1.5em;max-width: 28vw;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
  }
`;


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
