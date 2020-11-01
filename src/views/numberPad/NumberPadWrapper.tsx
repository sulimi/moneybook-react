import styled from 'styled-components';

const Wrapper = styled.section` 
  display: flex;font-weight: bold;
  flex-direction: column; background: #65C6BB;border: 2px solid black;flex-shrink: 0;
  > .top{
      display: flex;align-items: center;
    > .day{
      width: 20%;height: 44px;
      display: flex;align-items: center;justify-content: center;
      background: #fff; margin: 5px 0 5px 2%;
      border: 2px solid black;border-radius: 10px;
      font-size: 18px;
    }
    > .output{
      display: flex;justify-content: space-between;align-items: center;
      background: #fff;font-size: 30px;
      @media (max-height:570px){
       font-size: 24px;
     }
      padding: 5px 10px;width: 74%;
      border: 2px solid black;border-radius: 10px;
      margin: 5px 2%;overflow: hidden;
      .num{
        flex-grow: 1;
        flex-shrink: 0;
        text-align: right;
        width: 60%;
        .cny{
          font-size: 12px;margin-right: 2px;color: #AAAAAA;
        }
        .small{
          font-size: 20px;
        }
      }
     };
  }
  > .pad{
      flex-wrap: wrap;
    > button{
          @media (max-height:570px){
            font-size: 18px;
           }
        background: #fff;
        border: 2px solid black;border-radius: 10px;
        width: 22.5%;height: 44px;
        float:left;font-size: 20px;
        margin: 5px 0 5px 2%;
        &:nth-child(4),:nth-child(8){
            background: #FA8072;
            font-size: 20px;
             @media (max-height:570px){
            font-size: 18px;
           }
        }
        &.ok{
          height: 98px;background: #FFCC22;
          float: right;margin-right: 2%;
        }
        &.zero{
          width: 47%;
        }
    }
    //@media (max-width:570px){
    //  > button{
    //    height: 34px;font-size: 20px;
    //    margin: 3px 0 3px 2%;
    //    &:nth-child(4),:nth-child(8){
    //        font-size: 18px;
    //    }
    //    &.ok{
    //      height: 78px;
    //  }
    //  }
    //}
  }
`;

export {Wrapper};