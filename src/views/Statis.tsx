import Layout from '../components/Layout';
import React, {useState} from 'react';
import {CategorySection} from './money/CategorySection';
import {useRecords} from '../hooks/useRecords';
import {useTags} from '../hooks/useTags';
import dayjs from 'dayjs';
import styled from 'styled-components';


const Item = styled.div`
  display: flex;justify-content: space-between;background: #fff;font-size: 18px;line-height: 20px;padding: 10px 16px;
  > .note{
    margin-right: auto;margin-left: 16px;color: #999;
  }
`;

function Statistics() {
  const [category, setCategory] = useState<'-' | '+'>('-');
  const {records} = useRecords();
  const {getName} = useTags();
  return (
    <Layout>
      <CategorySection category={category}
                       onChange={category => setCategory(category)}/>
      <div>
        {records.map(r => {
          return (
            <Item>
              <div className="tags">{r.tagsId.map(tagId => <span>{getName(tagId)}</span>)}</div>
              {r.note&&<div className="note">{r.note}</div>}
              <div className="amount">￥{r.amount}</div>
              {/*<div className="date">{dayjs(r.createdAt).format('YYYY-MM-DD')}</div>*/}
            </Item>
          );
        })}
      </div>
    </Layout>
  );
}

export default Statistics;