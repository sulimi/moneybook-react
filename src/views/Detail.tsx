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
import Icon from '../components/Icon';
import {Category, sDate} from '../custom';
import {ByYear} from './detail/ByYear';

const CateWrapper = styled.div`
flex-shrink: 0;position: relative;display: flex;
.toggle{
  width: 30vw;display: flex;justify-content: center;align-items: center;
  font-weight: bold;font-size: 16px;background: #A5C9C0;
  border-bottom-right-radius: 30px;border-top-right-radius: 30px;color: #fff;
   @media (max-height:570px){
       font-size: 14px;
     }
  .icon{
    fill: #fff;margin-left: 5px;
  }
}
.category{
flex-grow: 1;
.bgdiv{
  background: #A5C9C0;border-radius: 10px;
}
 ul{
    background: #fff;margin-bottom: 0;color: #A5C9C0;font-weight: bold;
     li{
 padding: 16px;
       @media (max-height:570px){
        padding: 8px 16px;
     }
     &.selected{
      color: #fff;
      }
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
  padding: 10px 36px;color:#b5b5b5;background: #F8F8F6;display: flex;align-items: center;
  .icon{
  fill:#AAA;
  margin-left: 5px;
  }
}
`;

const Detail = () => {
  //选择按月/年
  const [monthYear,setMonthYear]=useState(false)
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

  const calculateRecord = monthYear?records.filter(r => dayjs(showDataValue).isSame(r.createdAt, 'year')).filter(r => r.category === cate)
    :records.filter(r => dayjs(showDataValue).isSame(r.createdAt, 'month')).filter(r => r.category === cate);
  const hashRecord = hashCreate(calculateRecord);
  const count = thousand(calculateRecord.reduce((sum, item) => {return sum += item.amount;}, 0).toString());
  const [showR, setShowR] = useState(false);
  const onShowR = () => {
    setShowR((showR) => !showR);
  };

  return (
    <Layout>
      <CateWrapper>
        <div className='toggle' onClick={()=>setMonthYear(()=>!monthYear)}>{monthYear?'按年':'按月'}<Icon name='right'/></div>
        <div className='category'>
          <CategorySection category={cate} onChange={category => onChange(category)}/>
        </div>
      </CateWrapper>
      {monthYear?<ByYear onChangeDay={(d) => onChangeDay(d)}/>:<DetailDaysBook category={cate} onChangeDay={(d) => onChangeDay(d)}/>}
      <List>
        <div className='title'>{monthYear?showData.year+'年':showData.month + 1+'月'}总{cate === '-' ? '支出' : '收入'}</div>
        <div className='amount'>{cate === '-' ? '-' : '+'}￥{count}</div>
        <div className='list' onClick={onShowR}>{!showR ? '隐藏' : '展示'}{monthYear?showData.year+'年':showData.month + 1+'月'}{cate === '-' ? '支出' : '收入'}账单明细
          {!showR ? <Icon name='xia'/> : <Icon name='right'/>}
        </div>
      </List>
      {!showR && <DetailList records={hashRecord}/>}
    </Layout>
  );
};

export {Detail};