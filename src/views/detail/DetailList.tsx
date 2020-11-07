import {None, ThirtyDay, ThirtyDayHeader} from '../money/MoneyHTML';
import dayjs from 'dayjs';
import {thousand} from '../../lib/thousandSeparator';
import React from 'react';
import {DayDetailList} from './DayDetailList';
import {HashRecord, RecordItem} from '../../custom';


type Props = {
  records: HashRecord[]
}
const DetailList: React.FC<Props> = (props) => {
  const amountCalculate = (arr: RecordItem[], type: string) => {
    return arr.filter(r => r.category === type).reduce((sum, item) => {return sum + item.amount;}, 0);
  };
  console.log(props.records);
  return props.records.length > 0 ?
    <ThirtyDay>
      {props.records.map(([date, records]) =>
        <ThirtyDay key={date}>
          <ThirtyDayHeader>
            <div className='day-header'>{dayjs(records[0].createdAt).isSame(dayjs(), 'day') ?
              <span className='today'>今天</span> : ''}<span>{dayjs(records[0].createdAt).format('MM月')}</span><span
              className='day'>{dayjs(records[0].createdAt).format('D')}</span>
            </div>
            <div className='num'>
              {amountCalculate(records, '-') ?
                <span className='item'>支出￥{thousand(amountCalculate(records, '-').toString())}</span> : ''}
              {amountCalculate(records, '+') ?
                <span className='item'>收入￥{thousand(amountCalculate(records, '+').toString())}</span> : ''}
            </div>
          </ThirtyDayHeader>
          <DayDetailList records={records}/>
        </ThirtyDay>
      )}
    </ThirtyDay>
    : <None>暂无记录...</None>;

};

export {DetailList};