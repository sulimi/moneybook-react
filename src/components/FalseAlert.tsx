import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
  @keyframes show{
    0%{top: -100%;}
    100%{top: 0;}
  }
  z-index: 10;
  width: 100vw;line-height: 20px; padding: 14px;background: red;color: #fff;
  display: flex;justify-content: center;align-items: center;
  position: absolute;top: 0;left: 0;
  animation: show 0.1s;
`;

const FalseAlert = (props: any) => {
  return (
    <Wrapper>
      <span>{props.children}</span>
    </Wrapper>
  );
};

export {FalseAlert};