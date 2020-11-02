import React, {useState} from 'react';
import Layout from '../components/Layout';
import {DetailDaysBook} from './detail/DetailDaysBook';
import {CategorySection} from '../components/CategorySection';
import styled from 'styled-components';
import {useRecords} from '../hooks/useRecords';
import dayjs from 'dayjs';
import {DisplayWrapper, DisplayWrapper2, ThirtyDay, ThirtyDayHeader, ThirtyDayList} from './money/MoneyHTML';
import Icon from '../components/Icon';
import {thousand} from '../lib/thousandSeparator';
import {useDate} from '../hooks/useDate';
import {hashCreate} from '../lib/hashCreate';

const CateWrapper = styled.div`
flex-shrink: 0;position: relative;
.bgdiv{
  background: #65C6BB;border-radius: 10px;
}
 ul{
    background: #fff;margin-bottom: 0;
     li{
 padding: 16px;
     &.selected{
      color: #fff;
      }
 }
 }

`;

const List = styled.div`
display: flex;flex-direction: column;align-items: center;flex-grow: 1;flex-shrink: 0;overflow-y: auto;
padding: 40px 16px;color: #65C6BB;
.amount{
    font-size: 18px;font-weight: bold;padding: 16px;word-break: break-all;
}
.list{
  padding: 10px 36px;color:#b5b5b5;background: #F8F8F6;;
}
`;

const Detail = () => {
  const {showData, setShowData} = useDate();
  const {records} = useRecords();
  const [cate, setCate] = useState<Category>('-');
  const onChange = (category: Category) => {
    setCate(category);
  };
  const onChangeDay = (d: sDate) => {
    setShowData(d);
  };
  const showDataValue = dayjs().set('date', showData.day).set('month', showData.month).set('year', showData.year);
  const calculateRecord = records.filter(r => dayjs(showDataValue).isSame(r.createdAt, 'month')).filter(r => r.category === cate);
  const hashRecord=hashCreate(calculateRecord)
  const count = thousand(calculateRecord.reduce((sum, item) => {return sum += item.amount;}, 0).toString());
  const amountCalculate=(arr: RecordItem[],type:string)=>{
    return arr.filter(r => r.category === type).reduce((sum, item) => {return sum + item.amount;}, 0)
  }
  return (
    <Layout message='明细'>
      <CateWrapper>
        <CategorySection category={cate} onChange={category => onChange(category)}/>
      </CateWrapper>
      <DetailDaysBook category={cate} onChangeDay={(d) => onChangeDay(d)}/>
      <List>
        <div className='title'>{showData.month + 1}月总支出</div>
        <div className='amount'>{cate === '-' ? '-' : '+'}￥{count}</div>
        <div className='list'>{showData.month + 1}月支出账单明细</div>
      </List>
      <ThirtyDay>
        {hashRecord.map(([date, records]) =>
          <ThirtyDay key={date}>
            <ThirtyDayHeader>
              <div className='day-header'>{dayjs(records[0].createdAt).isSame(new Date(), 'day') ?
                <span className='today'>今天</span> : ''}<span>{dayjs(records[0].createdAt).format('MM月')}</span><span
                className='day'>{dayjs(records[0].createdAt).format('D')}</span>
              </div>
              <div className='num'>
                <span>
                    {amountCalculate(records,'-') ?
                      '支出￥' + thousand(amountCalculate(records,'-').toString()) : ''}
                </span>
                <span>
                   {amountCalculate(records,'+')?
                     '收入￥' + thousand(amountCalculate(records,'+').toString()) : ''}
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
    </Layout>
  );
};

export {Detail};