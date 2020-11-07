import {DisplayWrapper, DisplayWrapper2, ThirtyDayList} from '../money/MoneyHTML';
import Icon from '../../components/Icon';
import React from 'react';
import {thousand} from '../../lib/thousandSeparator';
import {RecordItem} from '../../custom';


type Props={
  record:RecordItem
}
const DetailItem:React.FC<Props> = (props)=>{
  const {record}=props
  return (
    <ThirtyDayList>
      <DisplayWrapper>
        <Icon name={record.tag.icon}/>
        <DisplayWrapper2>
          <div className='name'><span className='text'>{record.tag.name}</span></div>
          {record.note && <div className='note'>{record.note}</div>}
        </DisplayWrapper2>
      </DisplayWrapper>
      <div
        className={record.category === '-' ? 'amount' : 'amount zheng'}>{record.category === '-' ? '-' : '+'}￥{thousand(record.amount.toString())}</div>
    </ThirtyDayList>
  )
}

export {DetailItem}