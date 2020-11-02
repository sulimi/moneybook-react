import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled.div`
position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.2);z-index: 30;
display: flex;flex-direction: column;justify-content: flex-end;align-items: center;
`;
const Content = styled.div`
  display: flex;flex-direction: column;justify-content: center;background: #fff;
  width: 100%;
  .header{
    padding: 10px;text-align: center;
    background: #F8F8F6;
    color: #AAA;
  }
  .record{
    border-bottom: 1px solid #F8F8F6;text-align: center;padding: 16px;color: #65C6BB;font-weight: bold;
  }
  .no{
    text-align: center;padding: 16px;color: #65C6BB;font-weight: bold;
  }
`;

type Props = {
  onchange: () => void
}
const NoneDetail: React.FC<Props> = (props) => {
  const onClickFunc=(e: any)=>{
    e.stopPropagation()
    props.onchange()
  }
  return (
    <Wrapper onClick={onClickFunc}>
      <Content>
        <div className='header'>该日暂无记账记录，要去记一笔吗？</div>
        <Link to='/addmoney' className='record'>记一笔</Link>
        <div onClick={onClickFunc} className='no'>取消</div>
      </Content>
    </Wrapper>
  );
};

export {NoneDetail};