import Layout from '../components/Layout';
import React from 'react';
import {Echarts} from './statis/Echarts';
import echarts from 'echarts';
import {useRecords} from '../hooks/useRecords';
import {hashCreate} from '../lib/hashCreate';
import dayjs from 'dayjs';


const Statistics = () => {
  // const [category, setCategory] = useState<'-' | '+'>('-');
  const {records} = useRecords();
  const hashRecord = hashCreate(records);
  const lineEchartsXKeyValue = () => {
    const today = new Date();
    const monthLength = dayjs(today).daysInMonth();
    const array = [];
    for (let i = 1; i <= monthLength; i++) {
      const date = dayjs(today).date(i).format('YYYY-M-DD');
      const found = hashRecord.filter(([k, arr]) => k === date).map(([k, arr]) => arr);
      const value = found.map(r => r.reduce((s, i) => {return s += i.amount;}, 0))[0];
      array.push({date: date, value: value ? value : 0});
    }
    array.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
    return array;
  };
  const key = lineEchartsXKeyValue().map(i => i.date);
  const value = lineEchartsXKeyValue().map(i => i.value);


  const option = {
    animation: false,
    legend: {
      top: 'bottom',
      data: ['意向']
    },
    tooltip: {
      triggerOn: 'none',
      position: function (pt: any) {
        return [pt[0], 130];
      }
    },
    xAxis: {
      type: 'time',
      // boundaryGap: [0, 0],
      axisPointer: {
        value: key,
        snap: false,
        lineStyle: {
          color: '#004E52',
          opacity: 0.5,
          width: 2
        },
        label: {
          show: true,
          formatter: function (params: any) {
            console.log(params);
          },
          backgroundColor: '#004E52'
        },
        handle: {
          show: false,
          color: '#004E52'
        }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        inside: true
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      },
      z: 10
    },
    grid: {
      top: 110,
      left: 15,
      right: 15,
      height: 160
    },
    dataZoom: [{
      type: 'inside',
      throttle: 50
    }],
    series: [
      {
        name: '模拟数据',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#8ec6ad'
        },
        stack: 'a',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#8ec6ad'
          }, {
            offset: 1,
            color: '#ffe'
          }])
        },
        data: lineEchartsXKeyValue()
      },
      {
        name: '模拟数据',
        type: 'line',
        smooth: true,
        stack: 'a',
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#d68262'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#d68262'
          }, {
            offset: 1,
            color: '#ffe'
          }])
        },
        data: 'data2'
      }

    ]
  };
  return (
    <Layout>
      <Echarts option={option}/>
    </Layout>
  );
};


export {Statistics};