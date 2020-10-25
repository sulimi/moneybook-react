import Layout from '../components/Layout';
import React, {useState} from 'react';
import {CategorySection} from './money/CategorySection';
import {RecordItem, useRecords} from '../hooks/useRecords';
import {useTags} from '../hooks/useTags';
import dayjs from 'dayjs';
import styled from 'styled-components';


const Item = styled.div`
  display: flex;justify-content: space-between;background: #fff;font-size: 18px;line-height: 20px;padding: 10px 16px;
  > .note{
    margin-right: auto;margin-left: 16px;color: #999;
  }
`;
const Header=styled.h3`
  font-size: 18px;line-height: 20px;padding: 10px 16px;
`
function Statistics() {
  const [category, setCategory] = useState<'-' | '+'>('-');
  const {records} = useRecords();
  const {getName} = useTags();
  const hash: { [K: string]: RecordItem[] } = {}; //{'2020-10-23':[item,item],'2020-10-11':[item,item],'2020-10-13':[item,item,item,item]}
  const recordsType = records.filter(r => r.category === category);
  recordsType.map(r => {
    const key = dayjs(r.createdAt).format('YYYY-MM-DD');
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].push(r);
  });
  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    } else if (a[0] > b[0]) {
      return -1;
    } else if (a[0] < b[0]) {
      return 1;
    } else {
      return 0;  //解决TS报错
    }
  });
  return (
    <Layout>
      <CategorySection category={category}
                       onChange={category => setCategory(category)}/>
      {array.map(([date,records]) => <div>
        <Header>{date}</Header>
        <div>
          {records.map(r => {
            return (
              <Item>
                <div className="tags">{r.tagsId.map(tagId => <span key={tagId}>{getName(tagId)}</span>)}</div>
                {r.note && <div className="note">{r.note}</div>}
                <div className="amount">￥{r.amount}</div>
                {/*<div className="date">{dayjs(r.createdAt).format('YYYY-MM-DD')}</div>*/}
              </Item>
            );
          })}
        </div>
      </div>)}
    </Layout>
  );
}

export default Statistics;