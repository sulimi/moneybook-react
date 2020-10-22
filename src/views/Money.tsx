import Layout from '../components/Layout';
import React from 'react';
import styled from 'styled-components';


const TagsSection=styled.section`
  background: #fff; padding: 12px 16px;
    ol{
      margin: 0 -12px;
      li{
        background: #D9D9D9;border-radius: 18px;
        display: inline-flex;padding: 3px 18px;
        font-size: 14px;margin: 3px 12px;
      }
  }
  button{
    border-bottom: 1px solid #ddd;padding: 2px 4px;
    color: #666;margin-top:8px;
  }
`
const NotesSection=styled.section`
  background: #f5f5f5; padding: 10px 16px;
  font-size: 14px;
  label{
  display: flex;
  align-items: center;
  
    span{
      margin-right: 16px;
      flex-shrink: 0;
      
    }
    input{
      display: block;height: 72px;
      flex-grow: 1;border: none;background: none;
    }
  }
`
const CategorySection=styled.section`
  
`
const NumberPadSection=styled.section`
  
`

function Money() {
  return (
    <Layout>
      <TagsSection>
        <ol>
          <li>衣</li>
          <li>食</li>
          <li>住</li>
          <li>行</li>
        </ol>
        <button>添加标签</button>
      </TagsSection>
      <NotesSection>
        <label>
          <span>备注</span>
          <input placeholder="在这里输入备注" type="text"/>
        </label>
      </NotesSection>
      <CategorySection>
        <ul>
          <li>支出</li>
          <li>收入</li>
        </ul>
      </CategorySection>
      <NumberPadSection>
        <div>100</div>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>删除</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>清空</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>ok</button>
          <button>0</button>
          <button>.</button>
        </div>
      </NumberPadSection>
    </Layout>
  );
}

export default Money