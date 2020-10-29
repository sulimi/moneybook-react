import React, {useEffect, useState} from 'react';
import {useTags} from '../../hooks/useTags';
import {useParams, useHistory} from 'react-router-dom';
import Icon from '../../components/Icon';
import {Input} from '../../components/Input';
import {Center} from '../../components/Center';
import {Space} from '../../components/Space';
import {useUpdate} from '../../hooks/useUpdate';
import {AddRewHtml, Button, IconList, TagWrapper, Topbar} from './AddRewHtml';
import {TagsIcon} from '../../datas/manageTags';



const TagEdit: React.FC = () => {
  type Params = {
    id: string
  }
  const {findTag, updateTag} = useTags();
  const {id} = useParams<Params>();
  const tag = findTag(parseInt(id));

  //图标选择：
  const TagsIconList=TagsIcon
  const [initIcon, setInitIcon] = useState();
  useUpdate(() => {
    setInitIcon(tag.icon);
  }, [tag]);
  const [iconSelect, setIconSelect] = useState();
  useEffect(() => {
    setIconSelect(initIcon);
  },[initIcon]);
  const setClass = (icon: string) => icon === iconSelect ? 'selected' : '';
  const chooseIcon = (icon: string) => {
    setIconSelect(icon);
  };


  //返回：
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();
  };

  //结构抽离块：
  const tagContent = (tag: Tag) => (
    <TagWrapper>
      <Icon name={tag.icon}/>
      <Input placeholder="分类名称" defaultValue={tag.name}
             onChange={(e) => {updateTag(tag.id, {name: e.target.value, icon: '', category: '-'});}}
      />
    </TagWrapper>
  );
  const noTag = (<div><Space/><Space/><Space/><Center>标签不存在</Center></div>);


  return (
    <AddRewHtml>
      <Topbar>
        <div className='back' onClick={onClickBack}>
          <Icon name='left'/>
          <span>分类管理</span>
        </div>
        <span>编辑标签</span>
        <div className='save'>保存</div>
      </Topbar>
      {tag ? tagContent(tag) : noTag}
      <Button>
        <div>选择图标</div>
      </Button>
      <IconList>
        {TagsIconList.map(tag => <Icon className={setClass(tag.icon)} key={tag.icon} name={tag.icon}
                                       onClick={() => chooseIcon(tag.icon)}/>)}
      </IconList>
    </AddRewHtml>
  );
};
export {TagEdit};