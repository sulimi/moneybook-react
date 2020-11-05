import Layout from '../components/Layout';
import React from 'react';
import {useRecords} from '../hooks/useRecords';
import {hashCreate} from '../lib/hashCreate';
import dayjs from 'dayjs';
import {Echarts} from './statis/Echarts';
import styled from 'styled-components';
import {option} from './statis/lineOption';


const EchartsWrapper = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar{
  display: none;
  }
`;
const Statistics = () => {
  // const [category, setCategory] = useState<'-' | '+'>('-');
  const {records} = useRecords();
  const paidRecord = records.filter(r => r.category === '-');
  const earningRecord = records.filter(r => r.category === '+');
  const paidHashRecord = hashCreate(paidRecord);
  const earningHashRecord = hashCreate(earningRecord);
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

  return (
    <Layout>
      <EchartsWrapper>
        <Echarts option={option(keyX,paidValue,earningValue)}/>
      </EchartsWrapper>
    </Layout>
  );
};


export {Statistics};