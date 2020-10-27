import styled from 'styled-components';
import React, {useEffect, useState} from 'react';

const Wrapper = styled.section` 
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  > .bgdiv{
    position: absolute;
    background: #fff;
    border-radius: 6px;
    height: 40px;
    width: 40px;
    transition: all 0.3s;
  }
  > ul{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  border-radius: 6px;
  background: #E6E6E6;
  margin: 6px 0;
  font-size: 14px;
    > li{
    width: 50%;
    margin: 2px;
    white-space: nowrap;
    text-align: center;
    padding: 6px;
    z-index: 2;
      &.selected{
      font-weight: bold;
      border-radius: 6px;
      z-index: 2;
      }
    }
  }
`;

type Props = { category: Category, onChange: (category: Category) => void }

const CategorySection: React.FC<Props> = (props) => {
  useEffect(() => {
    const selectedLi = document.getElementsByClassName('selected')[0];
    const bgDiv = document.getElementsByClassName('bgdiv')[0];
    if (selectedLi && bgDiv) {
      const {left, width, height} = selectedLi.getBoundingClientRect();
      bgDiv.setAttribute('style', `left:${left}px; width:${width}px; height:${height}px`);
    }
  }, [props.category]);


  const categoryMap = {'-': '支出', '+': '收入'};
  type Keys = keyof typeof categoryMap
  // const [category, setCategory] = useState('-');
  const category = props.category;
  const [categoryList] = useState<Keys[]>(['-', '+']);

  return (
    <Wrapper>
      <ul>
        {categoryList.map(c =>
          <li key={c}
              className={category === c ? 'selected' : ''}
              onClick={() => {
                props.onChange(c);
              }}
          >{categoryMap[c]}</li>
        )}
      </ul>
      <div className='bgdiv'/>
    </Wrapper>
  );
};
export {CategorySection};