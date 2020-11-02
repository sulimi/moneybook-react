import Layout from '../components/Layout';
import React, {useState} from 'react';
import {CategorySection} from '../components/CategorySection';
import {useRecords} from '../hooks/useRecords';
import {useTags} from '../hooks/useTags';
import styled from 'styled-components';
import {hashCreate} from '../lib/hashCreate';


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
  const recordsType = records.filter(r => r.category === category);
  const array=hashCreate(recordsType)
  return (
    <Layout>
      <CategorySection category={category}
                       onChange={category => setCategory(category)}/>
      {array.map(([date,records]) => <div key={date}>
        <Header>{date}</Header>
        <div>
          {records.map(r => {
            return (
              <Item key={r.id}>
                <div className="tags">{<span>{getName(r.tag.id)}</span>}</div>
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