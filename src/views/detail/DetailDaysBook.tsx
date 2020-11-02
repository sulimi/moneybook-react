import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Icon from '../../components/Icon';
import {useDate} from '../../hooks/useDate';
import {useRecords} from '../../hooks/useRecords';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {NoneDetail} from './NoneDetail';

const DaysBody = styled.div`
  display: flex;flex-direction: column;align-items: center;justify-content: flex-end;background: #F8F8F6;
   @media (max-height:570px){
   font-size: 12px;
  }
`;
const DaysHeader = styled.header`
  display: flex;justify-content: space-between;align-items: center;text-align: right;font-weight: bold;
  width: 100vw; height: 2em;
     @media (max-height:570px){
    
  }
  > .icon{
    margin: 0 10px;
    height: 100%;
    width: 2em;fill:#A5C9C0;
  }
  .title{
    color: #A5C9C0;
    font-size: 16px;
  }
  .no,.now,.title{
    flex-shrink: 0;
  }
`;
const DaysMain = styled.div`
  display: flex;flex-direction: column;align-items: center;width: 100vw;;
  > .thead{
  width: 100%;
  > .tr{
        font-size: 12px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        height: 30px; color: #A5C9C0;
      @media (max-height:570px){
        height: 30px;
        }
   >.th{
      width: 13.2vw;
      text-align: center;
      line-height: 30px;
        @media (max-height:570px){
        line-height: 30px;
        }
      
   }
  }
  }
  > .tbody{
  width: 100%;
  > .tr{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
  > .td{
  display: flex;flex-direction: column;align-items: center;  width: 13.2vw;
  .day{
      height: 30px;
      line-height: 30px;
      text-align: center;
        @media (max-height:570px){
        height: 30px;line-height: 30px;
        }
  }
      
  &.is-today {
            border: 1px solid #65C6BB;
            font-weight: 700;
          }

          &.is-select {
            background: #A5C9C0;
            font-weight: 700;
          }

          &.other-month {
            color: #b5b5b5;
          }
          
     .record{
        font-size: 8px;width: 100%;text-overflow: ellipsis;white-space: nowrap;overflow:hidden;padding-bottom: 5px;
        text-align: center;height: 1.5em;
     }
  }
  }
   
  }
`;


type Props = {
  onChangeDay?: (d: sDate) => void,
  category: string
}
const DetailDaysBook: React.FC<Props> = (props) => {
  const
    {
      showData, showDays, onSelectDay, isSelectDay,
      isToday, isThisMonthDay, onChangYear, onChangMonth, updateShowDate
    } = useDate();
  const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  const otherMonthClass = (day: Date) => !isThisMonthDay(day) ? 'other-month' : '';
  const selectClass = (day: Date) => isSelectDay(day) ? 'is-select' : '';
  const todayClass = (day: Date) => isToday(day) ? 'is-today' : '';

  const onSetToday = () => {
    updateShowDate({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    });
  };

  const {records} = useRecords();
  const getAmount = (d: Date) => {
    const isHave = records.filter(r => dayjs(d).isSame(r.createdAt, 'day'));
    const typeRecord = isHave.filter(r => r.category === props.category);
    const count = typeRecord.reduce((sum, item) => {return sum += item.amount;}, 0);
    return {isHave, typeRecord, count};
  };
  useEffect(() => {
    if (props.onChangeDay) {
      props.onChangeDay(showData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showData]);
  const onMonth = (type: string) => {
    onChangMonth(type);
  };
  const onYear = (type: string) => {
    onChangYear(type);
  };
  const [isNone, setIsNone] = useState(false);
  const onClickFunc = (d: Date) => {
    onSelectDay(d);
    if (!getAmount(d).count) {
      setIsNone((isNone) => !isNone);
    }
  };
  return (
    <DaysBody>
      <DaysHeader>
        <DaysHeader>
          <Icon name='yearleft' onClick={() => onYear('last')}/>
          <Icon name='monthleft' onClick={() => onMonth('last')}/>
          <span className='title' onClick={onSetToday}>{showData.month + 1}月{showData.year}</span>
          <Icon name='monthright' onClick={() => onMonth('next')}/>
          <Icon name='yearrigth' onClick={() => onYear('next')}/>
        </DaysHeader>

      </DaysHeader>
      <DaysMain>
        <div className='thead'>
          <div className='tr'>
            {weekDay.map(d => <div className='th' key={d}>{d}</div>)}
          </div>
        </div>
        <div className='tbody'>
          <div className='tr'>
            {showDays(showData).map(d =>
              getAmount(d).count?
                <Link to='/daydetail' key={d.toISOString()}
                     className={`${selectClass(d)} ${otherMonthClass(d)} ${todayClass(d)} td`}
                     onClick={() => onClickFunc(d)}
                >
                  <div className='day'>{d.getDate()}</div>
                  <div className='record'>{getAmount(d).count ? props.category + '￥' + getAmount(d).count : ''}</div>
                </Link>
              :<div key={d.toISOString()}
                    className={`${selectClass(d)} ${otherMonthClass(d)} ${todayClass(d)} td`}
                    onClick={() => onClickFunc(d)}
              >
                <div className='day'>{d.getDate()}</div>
                <div className='record'>{getAmount(d).count ? props.category + '￥' + getAmount(d).count : ''}</div>
              </div>
            )}
          </div>
        </div>
      </DaysMain>
      {isNone && <NoneDetail onchange={() => setIsNone((isNone) => !isNone)}/>}
    </DaysBody>
  );
};

export {DetailDaysBook};