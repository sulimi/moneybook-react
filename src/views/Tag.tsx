import Layout from '../components/Layout';
import React from 'react';
import {useTags} from '../useTags';
import styled from 'styled-components';
import Icon from '../components/Icon';


const TagList=styled.ol`
   font-size: 16px; 
   > li{
    border: 1px solid #d5d5d9; line-height: 20px;padding: 12px 16px;background: #fff;display: flex;justify-content: space-between;align-items: center;
    .icon{
      width: .7em;height: .7em;flex-shrink: 0;
    }
   }
`
function Tags() {
  const {tags, setTags} = useTags();
  return (
    <Layout>
      <TagList>
        {tags.map(tag=><li key={tag}>
          <span className='oneLine'>{tag}很纯洁的开发进度累计发电量降幅劳动纠纷扩大解放绿卡角度来看附近的路口开绿灯解放立刻搭街坊罗迪克了解对方立刻搭街坊李达康书记</span>
          <Icon name='right' />
        </li>)}
      </TagList>
    </Layout>
  );
}

export default Tags;