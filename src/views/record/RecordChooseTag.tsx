import styled from 'styled-components';

const ChooseTag = styled.section`
    background: #F8F8F6; padding: 12px 16px;flex-grow: 1;overflow-y: auto;
  display: flex;flex-direction: column;align-items: flex-start;
    ol{
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      > li{
        display: inline-flex;flex-direction: column;justify-content: center;align-items: center;
        width: 20%;margin-bottom: 12px;
        border-radius: 18px;
        font-size: 14px;padding: 6px;
    @media (max-height:570px){
        font-size: 12px
        }
        > .icon{
         width: 3em;
         height: 3em;
         margin-bottom: 6px;
        }
        > span{
          white-space: nowrap;
        }
        &.long{
          span{
          font-size: 14px;
              @media (max-height:570px){
        font-size: 12px
        }
          }
        }
        &.selected{
          border: 1px solid #65C6BB;
          background: #fff;
          font-weight: bold;
        }
        > .manage{
          display: inline-flex;flex-direction: column;justify-content: center;align-items: center;
              > .icon{
         width: 3em;
         height: 3em;
         margin-bottom: 6px;
        }
        > span{
          white-space: nowrap;
        }
        &.long{
          span{
          font-size: 14px;
              @media (max-height:570px){
        font-size: 12px
        }
          }
        }
        }
      }

}`;

export {ChooseTag}