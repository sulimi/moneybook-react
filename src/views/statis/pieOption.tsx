const optionPie = (value: { value:number,name:string }[],cate:string) => {

  return {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: cate==='+'?'rgba(176,224,230,0.4)':'rgba(255,182,193,0.4)',
      formatter: '{b} : {c} ({d}%)',
      textStyle:{
        color:cate==='+'?'#65C6BB':'#FA8072',
      }
    },
    legend: {
      show: false
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        minAngle: 20,
        data: value,
        itemStyle:{
          // normal:{
          //   color:function(params:any) {
          //     //自定义颜色方法1
          //     const colorList = [
          //       '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
          //       '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
          //       '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
          //     ];
          //     return colorList[params.dataIndex]
          //   }
          // }
        },
      }
    ],
    //自定义颜色方法2
    color: cate==='-'?['rgb(255,182,193)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(238,130,238)','rgb(216,191,216)']
      :['rgb(176,224,230)','rgb(131,175,155)','rgb(135,206,235)', 'rgb(70,130,180)','rgb(46,139,87)']
  };
};

export {optionPie};