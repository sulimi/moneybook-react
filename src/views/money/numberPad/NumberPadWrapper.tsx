import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;font-weight: bold;
  flex-direction: column; background: #65C6BB;border: 2px solid black;
  > .top{
      display: flex;align-items: center;
    > .day{
      width: 20%;height: 44px;
      display: flex;align-items: center;justify-content: center;
      background: #fff; margin: 5px 0 5px 2%;
      border: 2px solid black;border-radius: 10px;
      font-size: 20px;
    }
    > .output{
      background: #fff;font-size: 36px;line-height: 62px;text-align: right;
      padding: 0 16px;width: 74%;
      border: 2px solid black;border-radius: 10px;
      margin: 5px 2%;
     };
    //  @media (max-width:570px){
    //  > .day{
    //    height: 34px;font-size: 18px;
    //  }
    //  .output{
    //      line-height: 52px;
    //  }
    //}
  }
  > .pad{
      flex-wrap: wrap;
    > button{
        background: #fff;
        border: 2px solid black;border-radius: 10px;
        width: 22.5%;height: 44px;
        float:left;font-size: 26px;
        margin: 5px 0 5px 2%;
        &:nth-child(4),:nth-child(8){
            background: #FA8072;
            font-size: 20px;
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