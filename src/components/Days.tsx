import styled from 'styled-components';
import React, {useState} from 'react';
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
// {year:new Date().getFullYear(),month: new Date().getMonth(),day: new Date().getDate()}

const Days = () => {
  const {weekDay, showData,showDays, onSelectDay, isSelectDay, isToday, isThisMonthDay, onChangYear, onChangMonth} = dateFunc();
  const [dateTitle, setDateTitle] = useState({...showData});
  const [selectedDay, setSelDay] = useState(showDays(dateTitle).filter(d => isSelectDay(d))[0]);
  // const [othermonth,setOtherMonth]=useState(showDays(dateTitle).filter(d => isThisMonthDay(d)))
  // console.log(othermonth.map(d=>d.getMonth()+'月'+d.getDate()));
  const onClickDayFunc = (day: Date) => {
    onSelectDay(day);
    setSelDay(day);
    setDateTitle({year: day.getFullYear(), month: day.getMonth(), day: day.getDate()});
  };
  const onClickMonthFunc = (type: string) => {
    onChangMonth(type);
    if (type === 'last') {
      setDateTitle({...dateTitle, month: dateTitle.month - 1});
      if (dateTitle.month <= 0) {
        setDateTitle({...dateTitle, year: dateTitle.year - 1, month: 11});
      }
    } else {
      setDateTitle({...dateTitle, month: dateTitle.month + 1});
      if (dateTitle.month >= 11) {
        setDateTitle({...dateTitle, year: dateTitle.year + 1, month: 0});
      }
    }
  };
  const onClickYearFunc = (type: string) => {
    onChangYear(type);
    type === 'last' ?
      setDateTitle({...dateTitle, year: dateTitle.year - 1})
      : setDateTitle({...dateTitle, year: dateTitle.year + 1});
  };
  const otherMonthClass = (day: Date) => !isThisMonthDay(day) ? 'other-month' : '';
  const selectClass = (day: Date) => dayjs(day).isSame(selectedDay, 'day') ? 'is-select' : '';
  const todayClass = (day: Date) => isToday(day) ? 'is-today' : '';

  return (
    <DaysBody>
      <DaysHeader>
        <Icon name='yearleft' onClick={() => onClickYearFunc('last')}/>
        <Icon name='monthleft' onClick={() => onClickMonthFunc('last')}/>
        <span>{dateTitle.year}年{dateTitle.month+1}月{dateTitle.day}日</span>
        <Icon name='monthright' onClick={() => onClickMonthFunc('next')}/>
        <Icon name='yearrigth' onClick={() => onClickYearFunc('next')}/>
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
          {showDays(dateTitle).map(d =>
            <td key={d.toISOString()} className={`${selectClass(d)} ${otherMonthClass(d)} ${todayClass(d)}`}
                onClick={() => onClickDayFunc(d)}>
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

