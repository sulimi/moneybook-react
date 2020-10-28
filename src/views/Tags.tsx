import Layout from '../components/Layout';
import React, {useState} from 'react';
import {useTags} from '../hooks/useTags';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';
import {Button} from '../components/Button';
import {Center} from '../components/Center';
import {Space} from '../components/Space';
import {TagList} from './tag/TagList';
import {ButtonWrapper, DelButton, RewriteButton} from './tag/ButtonWrapper';
import {Pop} from '../components/Pop';
import {Message} from '../components/Message';
import styled from 'styled-components';
import {CategorySection} from './money/CategorySection';

const Wrapper = styled.div`
  display: flex;flex-direction: column;
  .type{
    display: flex;justify-content: center;align-items: center;
  }
`;
const Header = styled.header`
  display: flex;justify-content: space-between;align-items: center;
  font-size: 20px;font-weight: bold;padding: 10px;
  .icon{
    width: 1.5em;
    height: 1.5em;
  }
`;

function Tags() {
  const {tags, addTag, deleteTag} = useTags();
  const [isClick, setIsClick] = useState(0);
  const [pop, setPop] = useState(false);
  const [success, setSuccess] = useState(false);
  const onIsClick = (e: any, tag: Tag) => {
    e.stopPropagation();
    setPop(false);
    if (isClick !== 0) {
      setIsClick(0);
    } else {
      setIsClick(tag.id);
    }
  };
  const classN = (id: number) => isClick === id ? 'show' : '';
  const onClickDel = (e: any) => {
    e.stopPropagation();
    setPop(!pop);
  };
  const onchangePop = () => {
    setPop(!pop);
    setIsClick(0);
  };
  const onChangeDel = (id: number) => {
    deleteTag(id);
    setIsClick(0);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };
  const onChange=()=>{}
  return (
    <Wrapper>
      <Header><Icon name='quxiao'/>分类管理<Icon name='add' onClick={addTag}/></Header>
      <div className='type'>
        <CategorySection category='-' onChange={category => onChange()}/>
      </div>
      <TagList>
        {success ? <Message>删除成功</Message> : ''}
        {tags.map(tag =>
          <React.Fragment key={tag.id}>
            <li key={tag.id} onClick={(e) => onIsClick(e, tag)}>
              <div className='oneLine'>
                <Icon name={tag.icon}/>
                {tag.name}
              </div>
              {isClick === tag.id ? '' : <Icon name='right'/>}
              <ButtonWrapper className={classN(tag.id)}>
                <DelButton onClick={(e) => onClickDel(e)}>删除</DelButton>
                <Link to={'/tags/' + tag.id}><RewriteButton>编辑</RewriteButton></Link>
              </ButtonWrapper>
            </li>
            {pop && isClick === tag.id ? <Pop message='确定要删除该标签吗' onChangePop={() => onchangePop()}
                                              onChangeDel={() => {onChangeDel(tag.id);}}/> : ''}
          </React.Fragment>
        )}
      </TagList>
    </Wrapper>
  );
}

export default Tags;