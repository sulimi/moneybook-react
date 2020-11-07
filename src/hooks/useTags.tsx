import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';
import {Category, Tag} from '../custom';
import {initTags} from '../datas/initTags';


const useTags = () => { //封装一个自定义Hook
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = initTags;
    }
    setTags(localTags);
  }, []);
  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags));
  }, tags);
  const findTag = (id: number) => tags.filter(tag => tag.id === id)[0];
  const findTagIndex = (id: number) => {
    let result = -1;  //防止找不到i会返回tags.length
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };
  const addTag = (obj:{ id: number,name: string, icon: string, category:Category }) => {
      setTags([...tags, obj]);
  };
  const updateTag = (id: number, obj: Tag) => {
    setTags(tags.map(tag => tag.id === id ? tag={...obj}: tag));
  };
  const deleteTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };
  const getName = (id: number) => {
    const tag = tags.filter(t => t.id === id)[0];
    return tag ? tag.name : '';
  };
  return {tags, setTags, findTag, addTag, updateTag, findTagIndex, deleteTag, getName};
};

export {useTags};
