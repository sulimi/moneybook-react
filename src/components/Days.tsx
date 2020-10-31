import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Icon from './Icon';
import {dateFunc} from '../lib/date';
import dayjs from 'dayjs';

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
            color: #DE7873;
            font-weight: 700;
          }

          &.is-select {
            border-radius: 50%;
            background: #DE7873;
            font-weight: 700;
            color: #fff;
          }

          &.other-month {
            border-radius: 50%;
            color: #b5b5b5;
          }
  }
  }
   
  }
`;


const Days = () => {
  const {weekDay, showDays, onSelectDay, isSelectDay, isToday, isThisMonthDay} = dateFunc();
  const [selectedDay, setSelDay] = useState(showDays().filter(d => isSelectDay(d))[0]);
  const otherMonthClass = (day: Date) => !isThisMonthDay(day) ? 'other-month' : '';
  const selectClass = (day: Date) => dayjs(day).isSame(selectedDay, 'day') ? 'is-select' : '';
  const todayClass = (day: Date) => isToday(day) ? 'is-today' : '';

  const onClickFunc = (day: Date) => {
    onSelectDay(day);
    setSelDay(day);
  };

  return (
    <DaysBody>
      <DaysHeader>
        <Icon name='yearleft'/>
        <Icon name='monthleft'/>
        <span>xx年xx月xx日</span>
        <Icon name='monthright'/>
        <Icon name='yearrigth'/>
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
          {showDays().map(d =>
            <td key={d.toISOString()} className={`${selectClass(d)} ${otherMonthClass(d)} ${todayClass(d)}`}
                onClick={() => onClickFunc(d)}>
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