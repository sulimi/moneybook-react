const option = (key:any,paidValue:any,earningValue:any)=>{
  return {
    title: {
      show: false
    },
    tooltip: {
      trigger: 'axis',
      show: false,
      axisPointer: {
        type: 'none',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      show: false
    },
    grid: {
      right: 16,
      left: 16,
      containLabel: true
    },
    toolbox: {
      show: false
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: key,
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function (value: string) {
          return value.substr(8) + '日';
        },
        fontSize: 10,
      },
      axisLine: {
        show: false,
      }
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 0,
        end: 40,
        zoomLock: true
      },

    ],
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#AAA',
        fontSize: 10,
        inside: true
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false
      },
    },
    series: [
      {
        name: '支出',
        type: 'line',
        stack: '总量',
        lineStyle: {
          color: '#ffc0cb'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0, color: '#ffc0cb' // 0% 处的颜色
              },
              {
                offset: 1, color: '#fff' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        showSymbol: false,
        itemStyle: {
          borderWidth: 0,
        },
        smooth: true,
        data: paidValue
      },
      {
        name: '收入',
        type: 'line',
        stack: '总量',
        lineStyle: {
          color: '#A5C9C0'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0, color: '#A5C9C0' // 0% 处的颜色
              },
              {
                offset: 1, color: '#fff' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 0,
          color: '#A5C9C0'
        },
        smooth: true,
        data: earningValue
      },
    ],
  };
}

export {option}


