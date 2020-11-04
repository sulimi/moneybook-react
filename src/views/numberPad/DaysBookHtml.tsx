import styled from 'styled-components';

const DaysBody = styled.div`
  position: absolute;top:0;left: 0;z-index: 20;width: 100vw;
  display: flex;flex-direction: column;align-items: center;height: 100vh;
   @media (max-height:570px){
   font-size: 12px;
  }
`;
const Top=styled.div`
  flex-grow: 1;background: rgba(255,255,255,0.3);width: 100vw;
`
const DaysHeader = styled.header`
  display: flex;justify-content: space-between;align-items: center;text-align: right;background: #fff;
  width: 100vw; height: 3em;
     @media (max-height:570px){
    
  }
  > .icon{
    margin: 0 10px;
    height: 100%;
    width: 2em;
  }
  .no,.now{
    color: #65C6BB;font-weight: bold;padding: 0 16px;
  }
  .title{
    color: #65C6BB;
    font-size: 16px;
  }
  .no,.now,.title{
    flex-shrink: 0;
  }
`;
const DaysMain = styled.table`
  display: flex;flex-direction: column;align-items: center;width: 100vw;background: #fff;
  > thead{
  width: 100%;
  > tr{
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        height: 40px;
      @media (max-height:570px){
        height: 30px;
        }
   >th{
      width: 13.2vw;
      text-align: center;
      line-height: 40px;
        @media (max-height:570px){
        line-height: 30px;
        }
      
   }
  }
  }
  > tbody{
  width: 100%;
  > tr{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
  > td{
       width: 13.2vw;
      height: 40px;
      line-height: 40px;
      text-align: center;
        @media (max-height:570px){
        height: 30px;line-height: 30px;
        }
  &.is-today {
            color: #65C6BB;
            border: 1px solid #65C6BB;
            font-weight: 700;
          }

          &.is-select {
            background: #65C6BB;
            font-weight: 700;
            color: #fff;
          }

          &.other-month {
            color: #b5b5b5;
          }
  }
  }
   
  }
`;
const DaysFoot=styled.footer`
  display: flex;align-items: center;font-size: 16px;color: #65C6BB;text-align: center;background: #fff;width: 100%;padding: 0 16px;
    @media (max-height:570px){
        font-size: 12px
        }
  > .ok,.no{flex-grow: 1;padding: 10px 16px;
    @media (max-height:570px){
        padding: 5px 16px;
        }
  
  }
  > .ok{
      color: #fff;
      background: #65C6BB;
  }
`
export {DaysBody,DaysHeader,DaysMain,DaysFoot,Top}