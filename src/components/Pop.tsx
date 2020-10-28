import styled from 'styled-components';
import React from 'react';
import Icon from './Icon';

const Wrapper = styled.div`
  @keyframes show{
    0%{height: 0; padding: 0}
    100%{height: 20%; padding: 16px 16px 10px;}
  }
  position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);
  color: rgba(0,0,0,.65);z-index: 10;
  display: flex;justify-content: center;align-items: center;

  > .content{
    width: 96%;height: 20%;background: #fff;padding: 16px 16px 10px;
     display: flex;flex-direction:column;justify-content: center;
     animation: show 0.1s;
  > .message-wrapper{
      display: flex;align-items: center;margin-bottom: 32px;
    > .icon{
      width: 1.5em;height: 1.5em;margin-right: 10px;
    }
    > .message{
      font-size: 16px;
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
  
  }
`;


type Props = {
  message: string;
  onChangePop: () => void;
  onChangeDel: () => void
}

const Pop = (props: Props) => {
  return (
    <Wrapper>
      <div className='content'>
        <div className='message-wrapper'>
          <Icon name='wenhao'/>
          <div className='message'>{props.message}</div>
        </div>
        <div className='button-wrapper'>
          <button onClick={props.onChangePop}>取消</button>
          <button className='ok' onClick={props.onChangeDel}>确定</button>
        </div>
      </div>
    </Wrapper>
  );
};

export {Pop};