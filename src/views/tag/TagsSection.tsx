import React, {useEffect, useState} from 'react';
import {useTags} from '../../hooks/useTags';
import Icon from '../../components/Icon';
import {Link} from 'react-router-dom';
import {ChooseTag} from '../record/RecordChooseTag';


type Props = { tagId: number, tagCategory: Category, onChange: (selectedTag: Tag) => void }

const TagsSection: React.FC<Props> = (props) => {
  const {tags} = useTags();
  const [selectedIcon, setSelectedIcon] = useState();
  const showTags=tags.filter(tag=>tag.category===props.tagCategory)
  const firstTag=showTags.map((t,i,arr)=>arr[0])[0]
  useEffect(()=>{
    if (firstTag){
      setSelectedIcon(firstTag.id);
      props.onChange(firstTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[firstTag])
  const onToggleTag = (tag: Tag) => {
    setSelectedIcon(tag.id);
    props.onChange(tag);
  };

  const getClass1 = (id: number) => selectedIcon === id ? 'selected' : '';
  const getClass2 = (name: string) => name.length >= 3 ? 'long' : '';
  return (
    <ChooseTag>
      <ol>
        {showTags.map(tag =>
            <li key={tag.id} onClick={() => {onToggleTag(tag);}}
                className={`${getClass1(tag.id)} ${getClass2(tag.name)}`}>
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