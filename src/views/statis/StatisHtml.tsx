import styled from 'styled-components';

const StatisEchartsWrapper = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar{
  display: none;
  }
`;
const StatisTypeWrapper = styled.div`
  display: flex;justify-content: center;align-items: center;
    .item{
    display: flex;align-items: center;padding:5px 10px;
     .line{
    height: 4px;
    width: 45px;
    border-radius: 2px;
    margin-right: 5px;
    &.in{
    background: #A5C9C0;
    }
    &.out{
    background: #ffc0cb;
    }
  }
  .out{
    color: #ffc0cb;
    span{
    font-weight: bold;
    font-size: 10px;
    word-break: break-all;
    }
  }
  .in{
    color: #A5C9C0;
    span{
    font-weight: bold;
    font-size: 10px;
    word-break: break-all;
    }
  }
  &.selected{
    .line{
    height: 10px;
    width: 50px;
    border-radius: 5px;
    transition: all 0.3s;
  }
  .out{
    font-size: 16px;font-weight: bold;
    span{
    font-size: 12px;
    }
  }
  .in{
  font-size: 16px;font-weight: bold;
    span{
    font-size: 12px;
    }
  }
  }
    }
`;

const StatisHave = styled.div`
display: flex;justify-content: flex-end;align-items: center;padding: 6px 16px;font-size: 10px;
  .have{
    color: #AAA;word-break: break-all;
  }
`;
const StatisTitle=styled.div`
  margin-top: 16px;
  padding:16px;
  color: #AAA;
  font-weight: bold;
  
`
export {StatisEchartsWrapper,StatisTypeWrapper,StatisHave,StatisTitle}