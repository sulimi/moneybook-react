import styled from 'styled-components';
import React from 'react';

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
  return (
    <Wrapper>
      <ul>
        <li className="selected">支出</li>
        <li>收入</li>
      </ul>
    </Wrapper>
  );
};
export {CategorySection};