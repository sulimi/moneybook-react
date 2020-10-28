import React from 'react';
import {useTags} from '../hooks/useTags';
import {useParams, useHistory} from 'react-router-dom';
import Icon from '../components/Icon';
import styled from 'styled-components';
import {Input} from '../components/Input';

type Params = {
  id: string
}


const TagWrapper = styled.div`
  background: #fff;padding: 0 16px;margin-top: 16px;display: flex;align-items: center;
  .icon{
    width: 3em;height: 3em;
  }
`;
const Topbar = styled.header`
  display: flex;justify-content: space-between;align-items: center;
  line-height: 20px; padding: 14px; background: #fff;
  .back{
    display: flex;align-items: center;
    color: #aaa;width: 23.5vw;
    .icon{
      margin-right: 5px;
    }
  }
  .save{
   display: flex;align-items: center;justify-content: flex-end;
    width: 23.5vw;
  }
  > span{
    font-size: 20px;font-weight: bold;
  }
`;

const Wrapper=styled.div`
  display: flex;flex-direction: column;
  height: 100vh;
`
const IconList=styled.div`
  flex-grow: 1;overflow-y: auto;
  display: flex;flex-wrap: wrap;
  margin-top: 16px;
`
const Button=styled.div`
  display: flex;justify-content: center;align-items: center;
  margin-top: 10px;
  > div{
    background: #65C6BB;padding: 10px 16px;color: #ffff;font-weight: bold;border-radius: 20px;
  }
`
const TagAdd: React.FC = () => {
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();
  };
  return (
    <Wrapper>
      <Topbar>
        <div className='back' onClick={onClickBack}>
          <Icon name='left' />
          <span>分类管理</span>
        </div>
        <span>新建标签</span>
        <div className='save'>保存</div>
      </Topbar>
      <TagWrapper>
        <Icon name='fangdai'/>
        <Input placeholder="分类名称" />
      </TagWrapper>
      <Button>
        <div>选择图标</div>
      </Button>
      <IconList />
    </Wrapper>
  );
};
export {TagAdd};