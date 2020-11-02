import {DisplayWrapper, DisplayWrapper2, None, ThirtyDay, ThirtyDayHeader, ThirtyDayList} from '../money/MoneyHTML';
import dayjs from 'dayjs';
import {thousand} from '../../lib/thousandSeparator';
import Icon from '../../components/Icon';
import React from 'react';


type Props = {
  records: HashRecord[]
}
const DetailList: React.FC<Props> = (props) => {
  const amountCalculate=(arr: RecordItem[],type:string)=>{
    return arr.filter(r => r.category === type).reduce((sum, item) => {return sum + item.amount;}, 0)
  }
  return props.records.length > 0 ?
        <ThirtyDay>
          {props.records.map(([date, records]) =>
            <ThirtyDay key={date}>
              <ThirtyDayHeader>
                <div className='day-header'>{dayjs(records[0].createdAt).isSame(new Date(), 'day') ?
                  <span className='today'>今天</span> : ''}<span>{dayjs(records[0].createdAt).format('MM月')}</span><span
                  className='day'>{dayjs(records[0].createdAt).format('D')}</span>
                </div>
                <div className='num'>
                <span>
                    {amountCalculate(records, '-') ?
                      '支出￥' + thousand(amountCalculate(records, '-').toString()) : ''}
                </span>
                  <span>
                   {amountCalculate(records, '+') ?
                     '收入￥' + thousand(amountCalculate(records, '+').toString()) : ''}
                </span>
                </div>
              </ThirtyDayHeader>
              <ThirtyDay>
                {records.map(r =>
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
            </ThirtyDay>
          )}
        </ThirtyDay>
        : <None>暂无记录...</None>

};

export {DetailList};