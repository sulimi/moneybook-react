import styled from 'styled-components';

const NumberPadSection=styled.section`
  display: flex;
  flex-direction: column;
  > .output{
      background: #fff;font-size: 36px;line-height: 72px;text-align: right;padding: 0 16px;
      box-shadow: inset 0 -5px 5px -5px rgba(0,0,0,0.25),inset 0 5px 5px -5px rgba(0,0,0,0.25)};
  > .pad{
      flex-wrap: wrap;
    > button{
        width: 25%;height: 64px;float:left;font-size: 18px;
        &.ok{
          height: 128px;
          float: right;
        }
        &.zero{
          width: 50%;
        }
    }
  }
`
export {NumberPadSection}