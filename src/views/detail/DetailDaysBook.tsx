import styled from 'styled-components';
import React, {useEffect} from 'react';
import Icon from '../../components/Icon';
import {useDate} from '../../hooks/useDate';
import {useRecords} from '../../hooks/useRecords';
import dayjs from 'dayjs';

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
    width: 2em;fill:#65C6BB;
  }
  .no,.now{
    color: #65C6BB;font-weight: bold;padding: 0 16px;
  }
  .title{
    color: #65C6BB;
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
        height: 30px; color: #65C6BB;
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
            background: #65C6BB;
            font-weight: 700;
          }

          &.other-month {
            color: #b5b5b5;
          }
          
     .record{
        font-size: 8px;width: 100%;text-overflow: ellipsis;white-space: nowrap;overflow:hidden;padding-bottom: 5px;
        text-align: center;
     }
  }
  }
   
  }
`;


type Props = {
  onChangeDay?: (d: sDate) => void,
  createdAt?: Date,
  onToggleClick?: () => void
  category:string
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
  const f = (d: Date) => {
    const isHave=records.filter(r => dayjs(d).isSame(r.createdAt,'day'))
    const typeRecord=isHave.filter(r=>r.category===props.category)
    const count=typeRecord.reduce((sum,item)=>{return sum+=item.amount},0)
    return {isHave,typeRecord,count};
  };
useEffect(()=>{
  if (props.onChangeDay){
    props.onChangeDay(showData)
  }
},[showData])
  const onMonth=(type:string)=>{
    onChangMonth(type)
  }
  const onYear=(type:string)=>{
    onChangYear(type)
  }

  const onClickFunc = (d: Date) => {
    onSelectDay(d);
    // if (props.onChangeDay) {
    //   props.onChangeDay(d);
    //   if (props.onToggleClick) {
    //     props.onToggleClick();
    //   }
    // }
  };
  return (
    <DaysBody>
      {showData.month+1}
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
              <div key={d.toISOString()} className={`${selectClass(d)} ${otherMonthClass(d)} ${todayClass(d)} td`}
                   onClick={() => onClickFunc(d)}
              >
                <div className='day'>{d.getDate()}</div>
                {f(d).count?<div className='record'>{props.category}￥{f(d).count}</div>:''}
              </div>
            )}
          </div>
        </div>
      </DaysMain>
    </DaysBody>
  );
};

export {DetailDaysBook};