import React, {useEffect, useRef, useState} from 'react';
import {ECharts,init} from 'echarts';
import styled from 'styled-components';


const ChartWrapper=styled.div`
      //max-width: 98vw;
    min-height: 80vh;
    border-radius: 10px;
    overflow: auto;
`

type Props = {
  option: object
}
const Echarts: React.FC<Props> = (props) => {
  const chartContent=useRef<HTMLDivElement>(null)
  const [chart,setChart]=useState<ECharts|null>(null)
  useEffect(() => {
    if (chartContent.current===null){return}
    setChart(init(chartContent.current))

  }, []);
useEffect(()=>{
  if (!chart)return
  chart.setOption(props.option)
},[props.option,chart])
  return (
    <ChartWrapper ref={chartContent} className='chart'/>
  );
};

export {Echarts};