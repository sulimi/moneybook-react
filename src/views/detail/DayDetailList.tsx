import {DisplayWrapper, DisplayWrapper2, ThirtyDay, ThirtyDayList} from '../money/MoneyHTML';
import Icon from '../../components/Icon';
import {thousand} from '../../lib/thousandSeparator';
import React from 'react';

type Props={
  records:RecordItem[]
}
const DayDetailList:React.FC<Props> = (props)=>{
  return <ThirtyDay>
    {props.records.map(r =>
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
}

export {DayDetailList}