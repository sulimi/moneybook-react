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
  const {tags, addTag} = useTags();
  const [isClick, setIsClick] = useState(0);
  const [pop, setPop] = useState(false);

  const onIsClick = (tag: Tag) => {
    if (isClick !== 0) {
      setIsClick(0);
    } else {
      setIsClick(tag.id);
    }
  };
  const classN = (id: number) => isClick === id ? 'show' : '';
  const onClickDel = (e: any,id: number) => {
    e.stopPropagation()
    // deleteTag(id);
    setPop(true);
  };
  return (
    <Layout>
      <TagList>
        {tags.map(tag =>
          <li key={tag.id} onClick={() => onIsClick(tag)}>
            <div className='oneLine'>
              <Icon name={tag.icon}/>
              {tag.name}
            </div>
            {isClick === tag.id ? '' : <Icon name='right'/>}
            <ButtonWrapper className={classN(tag.id)}>
              <DelButton onClick={(e) => onClickDel(e,tag.id)}>删除</DelButton>
              <Link to={'/tags/' + tag.id}><RewriteButton>编辑</RewriteButton></Link>
            </ButtonWrapper>
          </li>
        )}
        {pop ? <Pop message='确定要删除该标签吗' onChange={() => setPop(!pop)}/> : ''}
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