import Layout from '../components/Layout';
import React from 'react';
import styled from 'styled-components';


const TagsSection=styled.section`
  background: #fff; padding: 12px 16px;flex-grow: 1;
  display: flex;flex-direction: column;justify-content: flex-end;align-items: flex-start;
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
  display: flex;align-items: center;
    span{ margin-right: 16px;flex-shrink: 0;}
    input{
      display: block;height: 72px;
      flex-grow: 1;border: none;background: none;
    }
  }
`
const CategorySection=styled.section`
  > ul{
  display: flex;background: #c4c4c4;font-size: 24px;
    > li{
      width: 50%;text-align: center;padding: 16px 0;
      &.selected{
      position: relative;
        ::after{
          content: '';display: inline-block;height: 3px;background: #333;position: absolute;bottom: 0;left: 0;width: 100%;
        }
      }
    }
  }
`
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

const MyLayout=styled(Layout)`
  display: flex;
  flex-direction: column;
`

function Money() {
  return (
    <MyLayout>
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
          <li className="selected">支出</li>
          <li>收入</li>
        </ul>
      </CategorySection>
      <NumberPadSection>
        <div className='output'>100</div>
        <div className='pad clearfix'>
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
          <button className='ok'>ok</button>
          <button className='zero'>0</button>
          <button>.</button>
        </div>
      </NumberPadSection>
    </MyLayout>
  );
}

export default Money