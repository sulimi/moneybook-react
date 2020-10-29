import {useEffect, useState} from 'react';
import {createId} from '../lib/createId';
import {useUpdate} from './useUpdate';


const useTags = () => { //封装一个自定义Hook
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = [
        {
          id: createId(),
          name: '旅游',
          icon:'lvxing',
          category: '-'
        },
        {
          id: createId(),
          name: '房贷',
          icon:'fangdai',
          category: '-'
        },
        {
          id: createId(),
          name: '收入',
          icon:'shouru',
          category: '+'
        },
      ];
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
  const updateTag = (id: number, obj: { name: string, icon: string, category:Category }) => {
    setTags(tags.map(tag => tag.id === id ? {id, name: obj.name, icon: '', category:'-'} : tag));
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
