import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column; background: #65C6BB;border: 2px solid black;
  > .output{
      background: #fff;font-size: 36px;line-height: 62px;text-align: right;font-weight: bold;
      padding: 0 16px;
      border: 2px solid black;border-radius: 10px;
      margin: 5px 2%;
     };
     
  > .pad{
      flex-wrap: wrap;
    > button{
        background: #fff;font-weight: bold;
        border: 2px solid black;border-radius: 10px;
        width: 22.5%;height: 44px;
        float:left;font-size: 26px;
        margin: 5px 0 5px 2%;
        //margin-left: 2%;
        &:nth-child(4n){
            background: red;
        }
        &.ok{
          height: 98px;background: #FFCC22;
          float: right;margin-right: 2%;
        }
        &.zero{
          width: 47%;
        }
    }
  }
`;

export {Wrapper}