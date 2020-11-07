import React, {ChangeEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Icon from '../../components/Icon';
import {Input} from '../../components/Input';
import {AddRewHtml, Button, IconList, TagWrapper, Topbar} from './AddRewHtml';
import {TagsIcon} from '../../datas/manageTags';
import {createId} from '../../lib/createId';
import {useTags} from '../../hooks/useTags';
import {Pop} from '../../components/Pop';
import {Message} from '../../components/Message';
import {CategorySection} from '../../components/CategorySection';
import {Category} from '../../custom';


const TagAdd: React.FC = () => {
  const {tags, addTag} = useTags();

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

  const [maxlengthValue, setMax] = useState();
  const [tagName, setTagName] = useState('');
  const equalTag = tags.filter(t => t.name === tagName)[0];
  const isEqual = tags && equalTag && equalTag.name === tagName;
  const nameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 4) {
      setMax(4);
    }
    setTagName(value.split(' ').join(''));
  };

  const [isNone, setIsNone] = useState(false);
  const [success, setSuccess] = useState(false);
  const save = () => {
    if (!tagName || tagName === '') {
      setIsNone(true);
    } else if (isEqual) {
      setIsNone(true);
    } else {
      addTag({
        ...tag,
        id: createId(),
        name: tagName
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
      setIconSelect('fangdai');
      setTagName('');
    }
  };
  const onCoOn = () => {
    setIsNone(false);
  };
  const [cate, setCate] = useState<Category>('-');
  const onChange = (category: Category) => {
    setCate(category);
  };
  //返回
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
        <span>新建标签</span>
        <div className='save' onClick={save}>保存</div>
      </Topbar>
      <TagWrapper>
        <Icon name={iconSelect}/>
        <Input type='text' value={tagName} placeholder="分类名称(4个字符)" onChange={nameInput} maxLength={maxlengthValue}
        />
      </TagWrapper>
      <Button>
        <div>选择</div>
        <CategorySection category={cate} onChange={category => onChange(category)} />
        <div>图标</div>
      </Button>
      <IconList>
        {TagsIconList.filter(t=>t.category===cate).map(tag => <Icon className={setClass(tag.icon)} key={tag.icon} name={tag.icon}
                                       onClick={() => chooseIcon({icon: tag.icon, category: tag.category})}/>)}
      </IconList>
    </AddRewHtml>
  );
};
export {TagAdd};