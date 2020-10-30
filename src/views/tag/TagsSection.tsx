import styled from 'styled-components';
import React, {useState} from 'react';
import {useTags} from '../../hooks/useTags';
import Icon from '../../components/Icon';
import {Link} from 'react-router-dom';

const Wrapper = styled.section`
    background: #F8F8F6; padding: 12px 16px;flex-grow: 1;overflow-y: auto;
  display: flex;flex-direction: column;align-items: flex-start;
    ol{
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      > li{
        display: inline-flex;flex-direction: column;justify-content: center;align-items: center;
        width: 20%;margin-bottom: 12px;
        border-radius: 18px;
        font-size: 14px;padding: 6px;
        > .icon{
         width: 3em;
         height: 3em;
         margin-bottom: 6px;
        }
        > span{
          white-space: nowrap;
        }
        &.long{
          span{
          font-size: 8px;
          }
        }
        &.selected{
          border: 1px solid #65C6BB;
          background: #CCE2DB;
          font-weight: bold;
        }
        > .manage{
          display: inline-flex;flex-direction: column;justify-content: center;align-items: center;
              > .icon{
         width: 3em;
         height: 3em;
         margin-bottom: 6px;
        }
        > span{
          white-space: nowrap;
        }
        &.long{
          span{
          font-size: 8px;
          }
        }
        }
      }
     // @media (max-width:570px){
     // > li, .manage{
     //   font-size: 10px;
     // }
     //}
}`;

type Props = { tagId: number, onChange: (selectedTag: Tag) => void }
const TagsSection: React.FC<Props> = (props) => {
  const {tags} = useTags();
  const [selectedId,setSelectedId] = useState(props.tagId);

  const onToggleTag = (tag:Tag) => {
    setSelectedId(tag.id)
    props.onChange(tag)
  };
  const getClass1 = (id: number) => selectedId===id ? 'selected' : '';
  const getClass2 = (name: string) => name.length >= 3 ? 'long' : '';
  return (
    <Wrapper>
      <ol>
        {tags.map(tag =>
          <li key={tag.id} onClick={() => {onToggleTag(tag)}} className={`${getClass1(tag.id)} ${getClass2(tag.name)}`}>
            <Icon name={tag.icon} />
            <span>{tag.name}</span>
        </li>
        )}
        <li  className='long'><Link to='/tags' className='manage'><Icon name='guanli' /><span>管理标签</span></Link></li>
      </ol>

    </Wrapper>
  );
};

export {TagsSection};