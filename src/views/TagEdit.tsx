import React from 'react';
import {useTags} from '../useTags';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import {Button} from '../components/Button';
import styled from 'styled-components';
import {Input} from '../components/Input';
import {Center} from '../components/Center';
import {Space} from '../components/Space';

type Params = {
  id: string
}


const Wrapper = styled.div`
  background: #fff;padding: 0 16px;margin-top: 16px;
`;
const Topbar = styled.header`
  display: flex;justify-content: space-between;align-items: center;
  line-height: 20px; padding: 14px; background: #fff;
`;
const TagEdit: React.FC = () => {
  const {findTag, updateTag} = useTags();
  const {id} = useParams<Params>();
  const tag = findTag(parseInt(id));
  return (
    <Layout>
      {tag.name}
      <Topbar>
        <Icon name='left'/>
        <span>编辑标签</span>
        <Icon/>
      </Topbar>
      <Wrapper>
        <Input text='标签名' placeholder="请输入标签名" defaultValue={tag.name}
               onChange={(e) => {updateTag(tag.id, {name: e.target.value});}}
         />
         </Wrapper>
         <Space />
         <Space />
         <Center>
         <Button>删除标签</Button>
         </Center>
         <Space />
         <Space />
         </Layout>
         );
         };
export {TagEdit};