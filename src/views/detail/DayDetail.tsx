import React, {useState} from 'react';
import styled from 'styled-components';
import Icon from '../../components/Icon';
import {CategorySection} from '../../components/CategorySection';


const Wrapper = styled.div`
  display: flex;flex-direction: column;align-items: center;
`;
const Header = styled.header`
  display: flex;flex-direction:column;align-items: center;
`;
const Top = styled.div`
  display: flex;justify-content:space-between;align-items: center;
`;
const Middle = styled.div`
  display: flex;justify-content:center;align-items: center;
`;
const Bottom = styled.div`
display: flex;justify-content:space-between;align-items: center;
`;
const List = styled.div`
display: flex;flex-direction:column;align-items: center;
`;


const DayDetail=()=>{
  const [cate, setCate] = useState<Category>('-');
  const onChange = (category: Category) => {
    setCate(category);
  };
  return (
    <Wrapper>
      <Header>
        <Top>
          <div><Icon name='left'/><span>明细</span></div>
          <div>2020-11-03</div>
          <div><Icon name='add'/></div>
        </Top>
        <Middle>
          <CategorySection category={cate} onChange={category => onChange(category)}/>
        </Middle>
        <Bottom>
          <Wrapper>
            <div>3</div>
            v
            <div>账目条数</div>
          </Wrapper>
          <Wrapper>
            <div>￥0</div>
            <div>总收入</div>
          </Wrapper>
          <Wrapper>
            <div>￥88888</div>
            <div>总支出</div>
          </Wrapper>
        </Bottom>
      </Header>
      <List>
        <div>2222222222222</div>
      </List>
    </Wrapper>
  );
}

export {DayDetail}

