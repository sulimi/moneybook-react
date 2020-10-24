import React from 'react';
import {useTags} from '../useTags';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import {Button} from '../components/Button';
import styled from 'styled-components';
import {Input} from '../components/Input';

type Params = {
  id: string
}


const Wrapper=styled.div`
  background: #fff;padding: 0 16px;margin-top: 16px;
`
const Topbar=styled.header`
  display: flex;justify-content: space-between;align-items: center;
  line-height: 20px; padding: 14px; background: #fff;
`
const TagEdit: React.FC = (props) => {
  const {findTag} = useTags();
  const {id} = useParams<Params>();
  const tag = findTag(parseInt(id));
  return (
    <Layout>
      <Topbar>
        <Icon name='left'/>
        <span>编辑标签</span>
        <Icon />
      </Topbar>
      <Wrapper>
        {/*<label>*/}
        {/*  <span>标签名</span>*/}
        {/*  <input type="text" placeholder="标签名" defaultValue={tag.name}/>*/}
        {/*</label>*/}
        <Input text='标签名' placeholder="请输入标签名" />
      </Wrapper>
      <div>
        <Button>删除标签</Button>
      </div>
    </Layout>
  );
};

export {TagEdit};