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


function Tags() {
  const {tags, addTag, deleteTag} = useTags();
  const [isClick, setIsClick] = useState(0);
  const [pop, setPop] = useState(false);

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
  };
  return (
    <Layout>
      <TagList>
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
      <Space/>
      <Center>
        <Button onClick={addTag}>新增标签</Button>
      </Center>
      <Space/>
    </Layout>
  );
}

export default Tags;