import React, {useEffect, useState} from 'react';
import {useTags} from '../../hooks/useTags';
import Icon from '../../components/Icon';
import {Link} from 'react-router-dom';
import {ChooseTag} from '../record/RecordChooseTag';


type Props = { tagId: number, onChange: (selectedTag: Tag) => void }

const TagsSection: React.FC<Props> = (props) => {
  const {tags} = useTags();
  const [selectedIcon, setSelectedIcon] = useState();
  useEffect(()=>{
    if (props.tagId){
      setSelectedIcon(props.tagId)
    }
  },[props.tagId])
  const onToggleTag = (tag: Tag) => {
    setSelectedIcon(tag.id);
    props.onChange(tag);
  };
  const getClass1 = (id: number) => selectedIcon === id ? 'selected' : '';
  const getClass2 = (name: string) => name.length >= 3 ? 'long' : '';
  return (
    <ChooseTag>
      <ol>
        {tags.map(tag =>
          <li key={tag.id} onClick={() => {onToggleTag(tag);}} className={`${getClass1(tag.id)} ${getClass2(tag.name)}`}>
            <Icon name={tag.icon}/>
            <span>{tag.name}</span>
          </li>
        )}
        <li className='long'><Link to='/tags' className='manage'><Icon name='guanli'/><span>管理标签</span></Link></li>
      </ol>

    </ChooseTag>
  );
};

export {TagsSection};