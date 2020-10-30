import React, {useState} from 'react';
import {useTags} from '../../hooks/useTags';
import {useParams, useHistory} from 'react-router-dom';
import Icon from '../../components/Icon';
import {Input} from '../../components/Input';
import {Center} from '../../components/Center';
import {Space} from '../../components/Space';
import {useUpdate} from '../../hooks/useUpdate';
import {AddRewHtml, Button, IconList, TagWrapper, Topbar} from './AddRewHtml';
import {TagsIcon} from '../../datas/manageTags';
import {Message} from '../../components/Message';




const TagEdit: React.FC = () => {
  type Params = {
    id: string
  }
  const {tags,findTag, updateTag} = useTags();
  const {id} = useParams<Params>();
  const tag = findTag(parseInt(id));

  //图标选择：
  const TagsIconList=TagsIcon
  useUpdate(() => {
    setIconSelect(tag.icon)
  }, [tag]);
  const [iconSelect, setIconSelect] = useState();
  const setClass = (icon: string) => icon === iconSelect ? 'selected' : '';
  const chooseIcon = (icon: string) => {
    setIconSelect(icon);
  };



  const [isNone, setIsNone] = useState(false);
  const [success, setSuccess] = useState(false);


  const save=()=>{

  }


  //返回：
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();
  };


  return (
    <AddRewHtml>
      {success ? <Message>添加成功</Message> : ''}
{/*      {isNone ? <Pop message={isEqual ? '该分类名称已存在' : '分类名称不能为空'} onChangeDel={onCoOn}/> : ''}*/}
      <Topbar>
        <div className='back' onClick={onClickBack}>
          <Icon name='left'/>
          <span>分类管理</span>
        </div>
        <span>编辑标签</span>
        <div className='save' onClick={save}>保存</div>
      </Topbar>
      {tag ? <TagWrapper>
        <Icon name={iconSelect}/>
        <Input placeholder="分类名称" defaultValue={tag.name}
               onChange={(e) => {updateTag(tag.id, {name: e.target.value, icon: '', category: '-'});}}/>
      </TagWrapper>
        : <div><Space/><Space/><Space/><Center>标签不存在</Center></div>}
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