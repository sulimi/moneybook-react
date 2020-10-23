import styled from 'styled-components';
import React, {useState} from 'react';

const Wrapper = styled.section`
  background: #fff; padding: 12px 16px;flex-grow: 1;
  display: flex;flex-direction: column;justify-content: flex-end;align-items: flex-start;
    ol{
      margin: 0 -12px;
      li{
        background: #D9D9D9;border-radius: 18px;
        display: inline-flex;padding: 3px 18px;
        font-size: 14px;margin: 3px 12px;
        &.selected{
          background: #f60;
        }
      }
  }
  button{
    border-bottom: 1px solid #ddd;padding: 2px 4px;
    color: #666;margin-top:8px;
  }
`;

type Props = { tags: string[], onChange: (selected: string[]) => void }
const TagsSection: React.FC<Props> = (props) => {
  const [tags, setTags] = useState<string[]>(['衣', '食', '住', '行']); //默认值
  // const [selectedTags, setSelectedTags] = useState<string[]>([]); //默认空[]
  const selectedTags = props.tags;
  const onAddTag = () => {
    const TagName = window.prompt('新标签的名称为');
    if (TagName !== null) {
      setTags([...tags, TagName]);
    }
  };
  const onToggleTag = (tag: string) => {
    const index = selectedTags.indexOf(tag);
    if (index >= 0) {  //如果有，我就把除了你之外的所有人拿走组队不带你（Vue的话可以直接改，但是React不推荐直接改）
      props.onChange(selectedTags.filter(t => t !== tag));
    } else {
      props.onChange([...selectedTags, tag]);
    }
  };
  const getClass = (tag: string) => selectedTags.indexOf(tag) >= 0 ? 'selected' : '';
  return (
    <Wrapper>
      <ol>
        {tags.map(tag => <li key={tag} onClick={() => {onToggleTag(tag);}}
                             className={getClass(tag)}>{tag}</li>)}
      </ol>
      <button onClick={onAddTag}>添加标签</button>
    </Wrapper>
  );
};

export {TagsSection};