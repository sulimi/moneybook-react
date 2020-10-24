import {useState} from 'react';
import {createId} from './lib/createId';


const defaultTags = [
  {id: createId(), name: '衣'},
  {id: createId(), name: '食'},
  {id: createId(), name: '住'},
  {id: createId(), name: '行'}
];
const useTags = () => { //封装一个自定义Hook
  // const [tags, setTags] = useState<{ id: number; name: string }[]>(defaultTags);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
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
  const addTag = () => {
    const TagName = window.prompt('新标签的名称为');
    if (TagName !== null) {
      setTags([...tags, {id: createId(), name:TagName}]);
    }
  };
  const updateTag = (id: number, obj: { name: string }) => {
    setTags(tags.map(tag => tag.id === id ? {id, name: obj.name} : tag));
  };
  const deleteTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };
  return {tags, setTags, findTag, addTag, updateTag, findTagIndex, deleteTag};
};

export {useTags};
