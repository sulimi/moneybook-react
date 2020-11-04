import React from 'react';
import Icon from '../../components/Icon';
import {useDate} from '../../hooks/useDate';
import {DaysBody, DaysFoot, DaysHeader, DaysMain, Top} from './DaysBookHtml';



type Props = {
  onChangeDay?: (d:Date) => void,
  createdAt?:Date,
  onToggleClick?:(e:any)=>void
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
  const onClickFunc=(e:any,d:Date)=>{
    onSelectDay(d)
    if (props.onChangeDay){
      props.onChangeDay(d)
      if (props.onToggleClick){
        props.onToggleClick(e)
      }
    }
  }
  return (
    <DaysBody>
      <Top onClick={props.onToggleClick}/>
      <DaysHeader>

        <DaysHeader>
          <Icon name='yearleft' onClick={() => onChangYear('last')}/>
          <Icon name='monthleft' onClick={() => onChangMonth('last')}/>
          <span className='title' onClick={onSetToday}>{showData.year}年{showData.month + 1}月{showData.day}日</span>
          <Icon name='monthright' onClick={() => onChangMonth('next')}/>
          <Icon name='yearrigth' onClick={() => onChangYear('next')}/>
        </DaysHeader>

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
                onClick={(e) => onClickFunc(e,d)}
            >
              {d.getDate()}
            </td>
          )}
        </tr>
        </tbody>
      </DaysMain>
      <DaysFoot>
        <div className='no' onClick={props.onToggleClick}>取消</div>
        <div className='ok' onClick={props.onToggleClick}>确定</div>
      </DaysFoot>
    </DaysBody>
  );
}

export {DaysBook}