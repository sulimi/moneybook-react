import styled from 'styled-components';
import React from 'react';
import Icon from './Icon';

const Wrapper = styled.div`
  @keyframes show{
    0%{top: 0;}
    100%{top: 20px;}
  }
  padding: 12px 16px;background: #ffffff;border: 1px solid #E6E6E6;
  display: flex;justify-content: center;align-items: center;
  position: absolute;top: 20px;left: 50%;transform: translateX(-50%);
  animation: show 0.1s;
`;

const Message = (props: any) => {
  return (
    <Wrapper>
      <Icon name='success'/>
      <span>{props.children}</span>
    </Wrapper>
  );
};

export {Message};