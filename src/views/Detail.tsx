import React, {useState} from 'react';
import Layout from '../components/Layout';
import {DetailDaysBook} from './detail/DetailDaysBook';
import {CategorySection} from '../components/CategorySection';
import styled from 'styled-components';
import {useRecords} from '../hooks/useRecords';
import dayjs from 'dayjs';
import {thousand} from '../lib/thousandSeparator';
import {useDate} from '../hooks/useDate';
import {hashCreate} from '../lib/hashCreate';
import {DetailList} from './detail/DetailList';

const CateWrapper = styled.div`
flex-shrink: 0;position: relative;
.bgdiv{
  background: #A5C9C0;border-radius: 10px;
}
 ul{
    background: #fff;margin-bottom: 0;color: #A5C9C0;font-weight: bold;
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
padding: 40px 16px;color: #A5C9C0;
.amount{
    font-size: 32px;font-weight: bold;padding: 16px;word-break: break-all;
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
      <DetailList records={hashRecord} />
    </Layout>
  );
};

export {Detail};