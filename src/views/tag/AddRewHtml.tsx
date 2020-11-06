import styled from 'styled-components';

const AddRewHtml=styled.div`
  display: flex;flex-direction: column;
  height: 100vh;
`
const TagWrapper = styled.div`
  background: #fff;padding: 0 16px;margin-top: 16px;display: flex;align-items: flex-end;
  .icon{
    width: 2em;height: 2em;margin-right: 5px;
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
  .title{
  
    > .date{
      font-size: 12px;padding-left:5px;
    }
  }
  .save{
   display: flex;align-items: center;justify-content: flex-end;
    width: 23.5vw;color: #65C6BB;font-weight: bold;
  }
  > span{
    font-size: 18px;font-weight: bold;
  }
`;
const IconList=styled.div`
  flex-grow: 1;overflow-y: auto;background: #F8F8F6;
  display: flex;flex-wrap: wrap;
  padding: 16px;
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
  background: #65C6BB;margin-top: 16px;
  > div{
    padding: 10px 6px;color: #ffff;font-weight: bold;font-size: 16px;
  }
`

export {AddRewHtml,TagWrapper,Topbar,IconList,Button}