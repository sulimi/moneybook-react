import Layout from '../components/Layout';
import React, {useState} from 'react';
import {CategorySection} from './money/CategorySection';

function Statistics() {
  const [category, setCategory]=useState<'-'|'+'>('-')
  return (
    <Layout>
      <CategorySection category={category}
                       onChange={category => setCategory(category)}/>
    </Layout>
  );
}

export default Statistics