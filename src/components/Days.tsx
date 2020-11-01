import styled from 'styled-components';
import React from 'react';
import Icon from './Icon';
import {useDate} from '../hooks/useDate';

const DaysBody = styled.div`
  display: flex;flex-direction: column;align-items: center;
`;
const DaysHeader = styled.header`
  display: flex;justify-content: space-between;align-items: center;
`;
const DaysMain = styled.table`
  display: flex;flex-direction: column;align-items: center;
  > thead{
  > tr{
   display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        height: 40px;
   >th{
      width: 13.2vw;
      text-align: center;
      line-height: 40px;
   }
  }
  }
  > tbody{
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

const Days = () => {
  const {weekDay,showData,showDays, onSelectDay, isSelectDay, isToday, isThisMonthDay, onChangYear, onChangMonth} = useDate();
  const otherMonthClass = (day: Date) => !isThisMonthDay(day) ? 'other-month' : '';
  const selectClass = (day: Date) => isSelectDay(day)? 'is-select' : '';
  const todayClass = (day: Date) => isToday(day) ? 'is-today' : '';

  return (
    <DaysBody>
      <DaysHeader>
        <Icon name='yearleft' onClick={() => onChangYear('last')}/>
        <Icon name='monthleft' onClick={() => onChangMonth('last')}/>
        <span>{showData.year}年{showData.month+1}月{showData.day}日</span>
        <Icon name='monthright' onClick={() => onChangMonth('next')}/>
        <Icon name='yearrigth' onClick={() => onChangYear('next')}/>
        <div>今天</div>
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
                onClick={() => onSelectDay(d)}>
              {d.getDate()}
            </td>
          )}
        </tr>
        </tbody>
      </DaysMain>
    </DaysBody>
  );
};

export {Days};

