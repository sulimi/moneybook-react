import styled from 'styled-components';

const AddRewHtml=styled.div`
  display: flex;flex-direction: column;
  height: 100vh;
`
const TagWrapper = styled.div`
  background: #fff;padding: 0 16px;margin-top: 16px;display: flex;align-items: center;
  .icon{
    width: 3em;height: 3em;
  }
`;
const Topbar = styled.header`
  display: flex;justify-content: space-between;align-items: center;
  line-height: 20px; padding: 14px; background: #fff;
  .back{
    display: flex;align-items: center;
    color: #aaa;width: 23.5vw;
    .icon{
      margin-right: 5px;
    }
  }
  .save{
   display: flex;align-items: center;justify-content: flex-end;
    width: 23.5vw;
  }
  > span{
    font-size: 20px;font-weight: bold;
  }
`;
const IconList=styled.div`
  flex-grow: 1;overflow-y: auto;
  display: flex;flex-wrap: wrap;
  margin-top: 16px;padding: 0 16px;
  .icon{
    width: 3em;height: 3em;
    &.selected{
      border: 1px solid #65C6BB;
      background: #CCE2DB;
    }
  }
`
const Button=styled.div`
  display: flex;justify-content: center;align-items: center;
  margin-top: 10px;
  > div{
    background: #65C6BB;padding: 10px 16px;color: #ffff;font-weight: bold;border-radius: 20px;
  }
`

export {AddRewHtml,TagWrapper,Topbar,IconList,Button}