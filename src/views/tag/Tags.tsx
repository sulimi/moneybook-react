import React, {useState} from 'react';
import {useTags} from '../../hooks/useTags';
import Icon from '../../components/Icon';
import {Link, useHistory} from 'react-router-dom';
import {TagList} from './TagList';
import {DelRewBtn, DelButton, RewriteButton} from './DelRewBtn';
import {Pop} from '../../components/Pop';
import {Message} from '../../components/Message';
import styled from 'styled-components';
import {CategorySection} from '../../components/CategorySection';

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
  const {tags, deleteTag} = useTags();
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
    }, 1500);
  };

  //稀里糊涂就实现了，哈哈哈
  const [cate, setCate] = useState<Category>('-');
  const onChange = (category: Category) => {
    setCate(category);
  };

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <Wrapper>
      <Header>
        <Icon name='quxiao' onClick={goBack}/>
        分类管理
        <Link to='/tagadd'>
          <Icon name='add'/>
        </Link>
      </Header>
      <div className='type'>
        <CategorySection category={cate} onChange={category => onChange(category)}/>
      </div>
      <TagList>
        {success ? <Message>删除成功</Message> : ''}
        {tags.filter(t => t.category === cate).map(tag =>
          <React.Fragment key={tag.id}>
            <li key={tag.id} onClick={(e) => onIsClick(e, tag)}>
              <div className='oneLine'>
                <Icon name={tag.icon}/>
                {tag.name}
              </div>
              {isClick === tag.id ? '' : <Icon name='mulu'/>}
              <DelRewBtn className={classN(tag.id)}>
                <DelButton onClick={(e) => onClickDel(e)}>删除</DelButton>
                <Link to={'/tags/' + tag.id}><RewriteButton>编辑</RewriteButton></Link>
              </DelRewBtn>
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