import Layout from '../components/Layout';
import React from 'react';
import {useTags} from '../useTags';
import styled from 'styled-components';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';


const TagList = styled.ol`
   font-size: 16px; 
   background: #fff;
   > li{
    border-bottom: 1px solid #d5d5d9; line-height: 20px;
    margin-left: 16px;margin-right: 16px;
    > a{
    display: flex;justify-content: space-between;align-items: center;
    padding: 12px 0 16px 0;
    }
    .icon{
      width: .7em;height: .7em;flex-shrink: 0;
    }
   }
`;
const Button = styled.button`
  font-size: 18px;padding: 8px 12px;background: #f60;border-radius: 4px;color: #fff;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Space = styled.div`
  height: 16px;
`;

function Tags() {
  const {tags} = useTags();
  return (
    <Layout>
      <TagList>
        {tags.map(tag => <li key={tag.id}>
          <Link to={'/tags/' + tag.id}>
            <span className='oneLine'>{tag.name}</span>
            <Icon name='right'/>
          </Link>
        </li>)}
      </TagList>
      <Space/>
      <Center>
        <Button>新增标签</Button>
      </Center>
      <Space/>
    </Layout>
  );
}

export default Tags;