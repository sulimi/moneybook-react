import styled from 'styled-components';

const DelRewBtn = styled.div`
  position: absolute;right: -100%;top: 0;height: 100%;
  display: flex;justify-content: center;align-items: center;
  &.show{
    right:-16px;
  }
  transition: all 0.3s; 
  > a{
    display: block;
    height: 100%;
    width: 4em;
    background: #CCE2DB;color: #fff;
  }

`;
const DelButton = styled.button`
  width: 4em;height: 100%;
  background: red;color: #fff;
`;
const RewriteButton = styled.button`
    height: 100%;
    width: 4em;
    background: #CCE2DB;color: #fff;
`;
export {DelRewBtn, DelButton, RewriteButton};