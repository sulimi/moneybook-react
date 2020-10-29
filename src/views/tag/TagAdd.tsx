import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Icon from '../../components/Icon';
import {Input} from '../../components/Input';
import {AddRewHtml, Button, IconList, TagWrapper, Topbar} from './AddRewHtml';
import {TagsIcon} from '../../datas/manageTags';



const TagAdd: React.FC = () => {
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();
  };
  const TagsIconList=TagsIcon
  const [iconSelect, setIconSelect]=useState('fangdai')
  const setClass=(icon: string)=>icon===iconSelect?'selected':''
  const chooseIcon=(icon: string)=>{
    setIconSelect(icon)
  }
  return (
    <AddRewHtml>
      <Topbar>
        <div className='back' onClick={onClickBack}>
          <Icon name='left' />
          <span>分类管理</span>
        </div>z
        <span>新建标签</span>
        <div className='save' onClick={()=>{}}>保存</div>
      </Topbar>
      <TagWrapper>
        <Icon name='fangdai'/>
        <Input placeholder="分类名称" onChange={(e)=>{console.log(e.target.value);}}/>
      </TagWrapper>
      <Button>
        <div>选择图标</div>
      </Button>
      <IconList>
        {TagsIconList.map(tag=><Icon className={setClass(tag.icon)} key={tag.icon} name={tag.icon} onClick={()=>chooseIcon(tag.icon)}/>)}
      </IconList>
    </AddRewHtml>
  );
};
export {TagAdd};