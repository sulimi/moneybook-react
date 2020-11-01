import styled from 'styled-components';
import React from 'react';
import Icon from '../../components/Icon';
import {useDate} from '../../hooks/useDate';

const DaysBody = styled.div`
  position: absolute;top:0;left: 0;background: #fff;z-index: 20;width: 100vw;
  display: flex;flex-direction: column;align-items: center;
   @media (max-height:570px){
   font-size: 12px;
  }
`;
const DaysHeader = styled.header`
  display: flex;justify-content: space-between;align-items: center;text-align: right;
  width: 100vw; height: 3em;
     @media (max-height:570px){
    
  }
  > .icon{
    margin: 0 10px;
    height: 100%;
    width: 2em;
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
const DaysMain = styled.table`
  display: flex;flex-direction: column;align-items: center;width: 100vw;
  > thead{
  width: 100%;
  > tr{
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        height: 40px;
      @media (max-height:570px){
        height: 30px;
        }
   >th{
      width: 13.2vw;
      text-align: center;
      line-height: 40px;
        @media (max-height:570px){
        line-height: 30px;
        }
      
   }
  }
  }
  > tbody{
  width: 100%;
  > tr{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
  > td{
       width: 13.2vw;
      height: 40px;
      line-height: 40px;
      text-align: center;
        @media (max-height:570px){
        height: 30px;line-height: 30px;
        }
  &.is-today {
            color: #65C6BB;
            border: 1px solid #65C6BB;
            font-weight: 700;
          }

          &.is-select {
            background: #65C6BB;
            font-weight: 700;
            color: #fff;
          }

          &.other-month {
            color: #b5b5b5;
          }
  }
  }
   
  }
`;


type Props = {
  onChangeDay: (d:Date) => void,
  createdAt:Date
}
const DaysBook: React.FC<Props> =(props)=>{
  const {weekDay, showData,showDays, onSelectDay, isSelectDay, isToday, isThisMonthDay, onChangYear, onChangMonth,updateShowDate} = useDate();
  const otherMonthClass = (day: Date) => !isThisMonthDay(day) ? 'other-month' : '';
  const selectClass = (day: Date) => isSelectDay(day) ? 'is-select' : '';
  const todayClass = (day: Date) => isToday(day) ? 'is-today' : '';

  const onSetToday=()=>{
    updateShowDate({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    })
  }
  const onClickFunc=(d:Date)=>{
    onSelectDay(d)
    props.onChangeDay(d)
  }
  return (
    <DaysBody>
      <DaysHeader>
        {/*<div className='no' />*/}
        <DaysHeader>
          <Icon name='yearleft' onClick={() => onChangYear('last')}/>
          <Icon name='monthleft' onClick={() => onChangMonth('last')}/>
          <span className='title' onClick={onSetToday}>{showData.year}年{showData.month + 1}月{showData.day}日</span>
          <Icon name='monthright' onClick={() => onChangMonth('next')}/>
          <Icon name='yearrigth' onClick={() => onChangYear('next')}/>
        </DaysHeader>
        {/*<div className='now' onClick={onSetToday}>今天</div>*/}
      </DaysHeader>
      <DaysMain>
        <thead>
        <tr>
          {weekDay.map(d => <th key={d}>{d}</th>)}
        </tr>
        </thead>
        <tbody>
        <tr>
          {showDays(showData).map(d =>
            <td key={d.toISOString()} className={`${selectClass(d)} ${otherMonthClass(d)} ${todayClass(d)}`}
                onClick={() => onClickFunc(d)}
            >
              {d.getDate()}
            </td>
          )}
        </tr>
        </tbody>
      </DaysMain>
    </DaysBody>
  );
}

export {DaysBook}