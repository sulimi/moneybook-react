import Layout from '../components/Layout';
import React, {useState} from 'react';
import {CategorySection} from './money/CategorySection';
import {useRecords} from '../hooks/useRecords';
import {useTags} from '../hooks/useTags';
import dayjs from 'dayjs';

function Statistics() {
  const [category, setCategory] = useState<'-' | '+'>('-');
  const {records} = useRecords();
  const {getName}=useTags()
  return (
    <Layout>
      <CategorySection category={category}
                       onChange={category => setCategory(category)}/>
      <div>
        {records.map(r=>{
          return (
            <div>
              {r.tagsId.map(tagId=><span>{getName(tagId)}</span>)}
              <hr />
              {r.amount}
              <hr/>
              {dayjs(r.createdAt).format('YYYY-MM-DD')}
            </div>
          )
        })}
      </div>
    </Layout>
  );
}

export default Statistics;