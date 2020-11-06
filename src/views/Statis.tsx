import Layout from '../components/Layout';
import React, {useState} from 'react';
import {useRecords} from '../hooks/useRecords';
import {hashCreate} from '../lib/hashCreate';
import dayjs from 'dayjs';
import {Echarts} from './statis/Echarts';
import styled from 'styled-components';
import {option} from './statis/lineOption';
import {StatisDay} from './statis/StatisDay';
import {useDate} from '../hooks/useDate';
import {hashCreateByTag} from '../lib/hashCreateByTag';
import {StatiByTagItemWrapper} from './statis/StatiByTagItemWrapper';
// import {StatiByTagItemWrapper} from './statis/StatiByTagItemWrapper';


const EchartsWrapper = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar{
  display: none;
  }
`;
const TypeWrapper = styled.div`
  display: flex;justify-content: center;align-items: center;
    .item{
    display: flex;align-items: center;padding:5px 10px;
     .line{
    height: 4px;
    width: 45px;
    border-radius: 2px;
    margin-right: 5px;
    &.in{
    background: #A5C9C0;
    }
    &.out{
    background: #ffc0cb;
    }
  }
  .out{
    color: #ffc0cb;
    span{
    font-weight: bold;
    font-size: 10px;
    word-break: break-all;
    }
  }
  .in{
    color: #A5C9C0;
    span{
    font-weight: bold;
    font-size: 10px;
    word-break: break-all;
    }
  }
  &.selected{
    .line{
    height: 10px;
    width: 50px;
    border-radius: 5px;
    transition: all 0.3s;
  }
  .out{
    font-size: 16px;font-weight: bold;
    span{
    font-size: 12px;
    }
  }
  .in{
  font-size: 16px;font-weight: bold;
    span{
    font-size: 12px;
    }
  }
  }
    }
`;
const Have = styled.div`
display: flex;justify-content: flex-end;align-items: center;padding: 6px 16px;font-size: 10px;
  .have{
    color: #AAA;word-break: break-all;
  }
`;


const Statistics = () => {
  //选择日期
  const {showData, setShowData} = useDate();
  const [showChooseDay, setShow] = useState(false);
  const onToggle = () => {
    setShow((showChooseDay) => !showChooseDay);
  };
  const chooseDay = (d: number) => {
    if (d === 13) {
      setShowData({...showData, year: showData.year + 1});
    } else if (d === -1) {
      setShowData({...showData, year: showData.year - 1});
    } else {
      setShowData({...showData, month: d});
    }
  };

  //开始按日期和消费方式分类账单数据
  const {records} = useRecords();
  const byDataRecords = records.filter(r => new Date(r.createdAt).getMonth() === showData.month);
  const paidRecord = byDataRecords.filter(r => r.category === '-');
  const earningRecord = byDataRecords.filter(r => r.category === '+');
  const paidHashRecord = hashCreate(paidRecord);
  const earningHashRecord = hashCreate(earningRecord);
  //造图表所需数据
  const lineEchartsXKeyValue = (hashTable: HashRecord[]) => {
    const today = new Date();
    const monthLength = dayjs(today).daysInMonth();
    const array = [];
    for (let i = 1; i <= monthLength; i++) {
      const date = dayjs(today).date(i).format('YYYY-M-DD');
      const found = hashTable.filter(([k, arr]) => k === date).map(([k, arr]) => arr);
      const value = found.map(r => r.reduce((s, i) => {return s += i.amount;}, 0))[0];
      array.push({date: date, value: value ? value : 0});
    }
    array.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
    return array;
  };
  const keyX = lineEchartsXKeyValue(paidHashRecord).map(i => i.date);
  const paidValue = lineEchartsXKeyValue(paidHashRecord).map(i => i.value);
  const earningValue = lineEchartsXKeyValue(earningHashRecord).map(i => i.value);
  const paidCount = paidValue.reduce((prev, init) => {return prev + init;}, 0);
  const earningCount = earningValue.reduce((prev, init) => {return prev + init;}, 0);


  //消费分类展示
  const [cate, setCate] = useState<Category>('-');
  const onChange = (category: Category) => {
    setCate(category);
  };
  const byTag = hashCreateByTag(byDataRecords.filter(r => r.category === cate));
  const byTagList:ByTagList[] = byTag.map(([k, v]) => [k+"&&"+v[0].tag.icon+"&&"+v[0].category, v.reduce((sum, i) => {return sum += i.amount;}, 0)]);
  return (
    <Layout message={showData.year + '-' + (showData.month + 1)} chooseDay={() => onToggle()}>
      {showChooseDay && <StatisDay chooseDay={(d) => chooseDay(d)} onToggle={() => onToggle()}/>}
      <EchartsWrapper>
        <Echarts option={option(keyX, paidValue, earningValue)}/>
      </EchartsWrapper>
      <TypeWrapper>
        <div className={cate === '+' ? 'selected item' : 'item'} onClick={() => onChange('+')}>
          <div className='line in'/>
          <div className='in'>收入(<span>￥{earningCount}</span>)</div>
        </div>
        <div className={cate === '-' ? 'selected item' : 'item'} onClick={() => onChange('-')}>
          <div className='line out'/>
          <div className='out'>支出(<span>￥{paidCount}</span>)</div>
        </div>
      </TypeWrapper>
      <Have>
        <div className='have'>结余：{earningCount - paidCount > 0 ? '+' : '-'}￥{Math.abs(earningCount - paidCount)}</div>
      </Have>
      <StatiByTagItemWrapper byTagListValue={byTagList}/>
    </Layout>
  );
};


export {Statistics};