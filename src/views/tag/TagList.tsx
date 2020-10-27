import styled from 'styled-components';

const TagList = styled.ol`
   font-size: 16px;background: #fff;
   > li{
    margin-left: 16px;margin-right: 16px;
    display: flex;justify-content: space-between;align-items: center;
    position:relative;
    
    > .oneLine{
    padding: 12px 0 16px 0;flex-grow: 1;
    display: flex;align-items: center;
      > .icon{
        width: 2em;height: 2em;margin-right: 6px;
      }
    }
      > .icon{
      width: .7em;height: .7em;flex-shrink: 0;
    }

   }
`;
export {TagList}