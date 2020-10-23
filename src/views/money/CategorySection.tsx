import styled from 'styled-components';
import React, {useState} from 'react';

const Wrapper = styled.section` 
  > ul{
  display: flex;background: #c4c4c4;font-size: 24px;
    > li{
      width: 50%;text-align: center;padding: 16px 0;
      &.selected{
      position: relative;
        ::after{
          content: '';display: inline-block;height: 3px;background: #333;position: absolute;bottom: 0;left: 0;width: 100%;
        }
      }
    }
  }
`;

const CategorySection: React.FC = () => {
  const categoryMap = {'-': '支出', '+': '收入'};
  type Keys = keyof typeof categoryMap
  const [category, setCategory] = useState('-');
  const [categoryList] = useState<Keys[]>(['-', '+']);

  return (
    <Wrapper>
      <ul>
        {categoryList.map(c =>
          <li className={category === c ? 'selected' : ''}
              onClick={() => {setCategory(c);}}
          >{categoryMap[c]}</li>
        )}
      </ul>
    </Wrapper>
  );
};
export {CategorySection};