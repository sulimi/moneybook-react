import styled from 'styled-components';
import React from 'react';
import Icon from './Icon';

const Wrapper = styled.div`
  position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);
  display: flex;justify-content: center;align-items: center;color: rgba(0,0,0,.65);
`;
const Content = styled.div`
  width: 96%;height: 20%;background: #fff;padding: 16px 16px 10px;
  display: flex;flex-direction:column;justify-content: center;
  > .message-wrapper{
    display: flex;align-items: center;margin-bottom: 32px;
    > .icon{
      width: 1.5em;height: 1.5em;margin-right: 10px;
    }
    > .message{
      font-size: 14px;
  }
  }
  > .button-wrapper{
   align-self: flex-end;
   > button{
      padding: 6px 16px;margin-left: 6px;border: 1px solid #F1F3F4;border-radius: 5px;
      &.ok{
        background: #65C6BB;color: #fff;
      }
   }
  }
`;

type Props = {
  message: string,
  onChange: () => void
}

const Pop = (props: Props) => {
  return (
    <Wrapper>
      <Content>
        <div className='message-wrapper'>
          <Icon name='wenhao'/>
          <div className='message'>{props.message}</div>
        </div>
        <div className='button-wrapper'>
          <button onClick={props.onChange}>取消</button>
          <button className='ok'>确定</button>
        </div>
      </Content>
    </Wrapper>
  );
};

export {Pop};