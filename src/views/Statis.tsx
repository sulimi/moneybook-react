import Layout from '../components/Layout';
import React, {useState} from 'react';
import {useRecords} from '../hooks/useRecords';
import {hashCreate} from '../lib/hashCreate';
import dayjs from 'dayjs';
import {Echarts} from './statis/Echarts';
import {option} from './statis/lineOption';
import {StatisDay} from './statis/StatisDay';
import {useDate} from '../hooks/useDate';
import {hashCreateByTag} from '../lib/hashCreateByTag';
import {StatiByTagItemWrapper} from './statis/StatiByTagItemWrapper';
import {optionPie} from './statis/pieOption';
import {None} from './money/MoneyHTML';
import {ByTagList, Category, HashRecord} from '../custom';
import {hashYear} from '../lib/hashYear';
import {StatisEchartsWrapper, StatisHave, StatisTitle, StatisTypeWrapper} from './statis/StatisHtml';



const Statistics = () => {
  //按年/月
  const [monthYear,setMonthYear]=useState(false)
  const toggleMonthYear=()=>{
    setMonthYear(()=>!monthYear)
  }

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
  const byDataRecords = monthYear?records.filter(r => dayjs(r.createdAt).year() === showData.year)
    :records.filter(r => dayjs(r.createdAt).month() === showData.month && dayjs(r.createdAt).year() === showData.year);
  const paidRecord = byDataRecords.filter(r => r.category === '-');
  const earningRecord = byDataRecords.filter(r => r.category === '+');
  const paidHashRecord = monthYear?hashYear(paidRecord):hashCreate(paidRecord);
  const earningHashRecord =  monthYear?hashYear(earningRecord):hashCreate(earningRecord);
  //造图表所需数据
  const lineEchartsXKeyValue = (hashTable: HashRecord[]) => {
    const today = dayjs(byDataRecords[0]?byDataRecords[0].createdAt:showData.year+'-'+showData.month+'-'+showData.day);
    const monthLength = dayjs(today).daysInMonth();
    const array = [];
    for (let i = 1; i <= monthLength; i++) {
      const date = dayjs(today).date(i).format('YYYY-MM-DD');
      const found = hashTable.filter(([k]) => k === date).map(([k, arr]) => arr);
      const value = found.map(r => r.reduce((s, i) => {return s += i.amount;}, 0))[0];
      array.push({date: date, value: value ? value : 0});
    }
    array.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
    return array;
  };

  const lineEchartsXKeyValueByYear = (hashTable: HashRecord[]) => {
    const today = dayjs(byDataRecords[0]?byDataRecords[0].createdAt:showData.year+'-'+showData.month+'-'+showData.day);
    const array = [];
    for (let i = 0; i <= 11; i++) {
      const date = dayjs(today).month(i).format('YYYY-MM');
      const found = hashTable.filter(([k]) => k === date).map(([k, arr]) => arr);
      const value = found.map(r => r.reduce((s, i) => {return s += i.amount;}, 0))[0];
      array.push({date: date, value: value ? value : 0});
    }
    array.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
    return array;
  };

  const keyX = monthYear?lineEchartsXKeyValueByYear(paidHashRecord).map(i => i.date):lineEchartsXKeyValue(paidHashRecord).map(i => i.date);
  const paidValue = monthYear?lineEchartsXKeyValueByYear(paidHashRecord).map(i => i.value):lineEchartsXKeyValue(paidHashRecord).map(i => i.value);
  const earningValue = monthYear?lineEchartsXKeyValueByYear(earningHashRecord).map(i => i.value):lineEchartsXKeyValue(earningHashRecord).map(i => i.value);

  const paidCount = paidValue.reduce((prev, init) => {return prev + init;}, 0);
  const earningCount = earningValue.reduce((prev, init) => {return prev + init;}, 0);


  //消费分类展示
  const [cate, setCate] = useState<Category>('-');
  const onChange = (category: Category) => {
    setCate(category);
  };

  const byTag = hashCreateByTag(byDataRecords.filter(r => r.category === cate));
  const byTagList: ByTagList[] = byTag.map(([k, v]) =>
    [k + '&&' + v[0].tag.icon + '&&' + v[0].category + '&&' + v[0].createdAt+'&&'+monthYear,
      v.reduce((sum, i) => {return sum += i.amount;}, 0)]);

  const pieEchart=byTagList.map(([i,v])=>{return {value:v,name:i.split('&&')[0]}})

  //结余
  const num=()=>{
    if (earningCount - paidCount > 0){
      return '+'
    }else if (earningCount - paidCount===0){
      return ''
    }else {
      return '-'
    }
  }
  return (
    <Layout message={monthYear?showData.year+'':showData.year + '-' + (showData.month + 1)} chooseDay={() => onToggle()} monthYear={monthYear} toggleMonthYear={()=>toggleMonthYear()}>
      {showChooseDay && <StatisDay monthYear={monthYear} chooseDay={(d) => chooseDay(d)} onToggle={() => onToggle()}/>}
      <StatisEchartsWrapper>
        <Echarts option={option(keyX, paidValue, earningValue,monthYear)}/>
      </StatisEchartsWrapper>
      <StatisTypeWrapper>
        <div className={cate === '+' ? 'selected item' : 'item'} onClick={() => onChange('+')}>
          <div className='line in'/>
          <div className='in'>收入(<span>￥{earningCount}</span>)</div>
        </div>
        <div className={cate === '-' ? 'selected item' : 'item'} onClick={() => onChange('-')}>
          <div className='line out'/>
          <div className='out'>支出(<span>￥{paidCount}</span>)</div>
        </div>
      </StatisTypeWrapper>
      <StatisHave>
        <div className='have'>结余：{num()}￥{Math.abs(earningCount - paidCount)}</div>
      </StatisHave>
      {byTagList.length>0?<div>
        <StatisTitle>类别分析：</StatisTitle>
        <Echarts option={optionPie(pieEchart,cate)}/>
        <StatisTitle>查看明细：</StatisTitle>
        <StatiByTagItemWrapper byTagListValue={byTagList}/>
      </div>:<None>暂无记录...</None>
      }

    </Layout>
  );
}


export {Statistics};