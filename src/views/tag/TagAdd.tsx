import React, {ChangeEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Icon from '../../components/Icon';
import {Input} from '../../components/Input';
import {AddRewHtml, Button, IconList, TagWrapper, Topbar} from './AddRewHtml';
import {TagsIcon} from '../../datas/manageTags';
import {createId} from '../../lib/createId';
import {useTags} from '../../hooks/useTags';



const TagAdd: React.FC = () => {
  const {addTag} = useTags();
  const TagsIconList = TagsIcon;
  const [iconSelect, setIconSelect] = useState('fangdai');
  const setClass = (icon: string) => icon === iconSelect ? 'selected' : '';
  const obj = {
    id: 0,
    name: '',
    icon: iconSelect,
    category: '-' as Category
  };
  const [tag, setTag] = useState(obj);
  const chooseIcon = (obj: { icon: string, category: Category }) => {
    setIconSelect(obj.icon);
    setTag({
      ...tag,
      ...obj
    });
  };

  const onTagName = (e: ChangeEvent<HTMLInputElement>) => {
    setTag({
      ...tag,
      name: e.target.value
    });
  };
const save=()=>{
  addTag({
    ...tag,
    id: createId()
  })
}

  //返回
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();
  };
  return (
    <AddRewHtml>
      <Topbar>
        <div className='back' onClick={onClickBack}>
          <Icon name='left'/>
          <span>分类管理</span>
        </div>
        <span>新建标签</span>
        <div className='save' onClick={save}>保存</div>
      </Topbar>
      <TagWrapper>
        <Icon name={iconSelect}/>
        <Input placeholder="分类名称" onBlur={(e) => onTagName(e)}/>
      </TagWrapper>
      <Button>
        <div>选择图标</div>
      </Button>
      <IconList>
        {TagsIconList.map(tag => <Icon className={setClass(tag.icon)} key={tag.icon} name={tag.icon}
                                       onClick={() => chooseIcon({icon: tag.icon, category: tag.category})}/>)}
      </IconList>
    </AddRewHtml>
  );
};
export {TagAdd};