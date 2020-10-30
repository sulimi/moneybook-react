import styled from 'styled-components';
import React from 'react';
import Icon from './Icon';

const Wrapper = styled.div`
  @keyframes show{
    0%{top: -100%;}
    100%{top: 0;}
  }
  z-index: 10;
  width: 100vw;line-height: 20px; padding: 14px;background: #65C6BB;color: #008000;
  display: flex;justify-content: center;align-items: center;
  position: absolute;top: 0;left: 0;
  animation: show 0.1s;
  .icon{
    margin-right: 16px;
    width: 1.2em;height: 1.2em;
  }
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