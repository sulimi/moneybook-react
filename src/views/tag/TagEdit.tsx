import React, {ChangeEvent, useEffect, useState} from 'react';
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
import {Pop} from '../../components/Pop';
import {CategorySection} from '../../components/CategorySection';


const TagEdit: React.FC = () => {
  type Params = {
    id: string
  }
  const {tags, findTag, updateTag} = useTags();
  const {id} = useParams<Params>();
  const tag = findTag(parseInt(id));

  //图标选择：
  const TagsIconList = TagsIcon;
  const [iconSelect, setIconSelect] = useState();
  const [initIcon, setInitIcon] = useState();
  const [tagName, setTagName] = useState();
  const [initName, setInitName]=useState()
  useUpdate(() => {
    setInitIcon(tag.icon);
    setInitName(tag.name)
  }, [tag]);
  useEffect(() => {
    setIconSelect(initIcon);
  },[initIcon]);
  useEffect(()=>{
    setTagName(initName)
  },[initName])
  const setClass = (icon: string) => icon === iconSelect ? 'selected' : '';
  const chooseIcon = (icon: string) => {
    setIconSelect(icon);
  };
  const [maxlengthValue, setMax] = useState();
  const nameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 4) {
      setMax(4);
    }
    setTagName(value.split(' ').join(''));
  };


  const [isNone, setIsNone] = useState(false);
  const [success, setSuccess] = useState(false);
  const equalTag = tags.filter(t => t.name === tagName)[0];
  const isEqual = tags && equalTag && equalTag.name === tagName;
  const save = () => {
    if (!tagName || tagName === '') {
      setIsNone(true);
    } else if (isEqual) {
      setIsNone(true);
    } else {
      updateTag(tag.id, {
        id:tag.id,
        name: tagName,
        icon: iconSelect,
        category: TagsIconList.filter(t => t.icon === iconSelect)[0].category
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
  };

  const onCoOn = () => {
    setIsNone(false);
  };

  const [cate, setCate] = useState<Category>('-');
  const onChange = (category: Category) => {
    setCate(category);
  };
  //返回：
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();
  };


  return (
    <AddRewHtml>
      {success ? <Message>添加成功</Message> : ''}
      {isNone ? <Pop message={isEqual ? '该分类名称已存在' : '分类名称不能为空'} onChangeDel={onCoOn}/> : ''}
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
          <Input placeholder="分类名称" defaultValue={tagName}
                 onChange={nameInput} maxLength={maxlengthValue}/>
        </TagWrapper>
        : <div><Space/><Space/><Space/><Center>标签不存在</Center></div>}
      <Button>
        <div>改成</div>
        <CategorySection category={cate} onChange={category => onChange(category)} />
        <div>分类</div>
      </Button>
      <IconList>
        {TagsIconList.filter(t=>t.category===cate).map(tag => <Icon className={setClass(tag.icon)} key={tag.icon} name={tag.icon}
                                       onClick={() => chooseIcon(tag.icon)}/>)}
      </IconList>
    </AddRewHtml>
  );
};
export {TagEdit};