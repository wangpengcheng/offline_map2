//设置瞬时速度图
var speed_chart_dom = document.getElementById("speed_table");
//speed_chart_dom.style.width=document.documentElement.clientWidth-250;
var speed_chart = echarts.init(speed_chart_dom);
var app = {};
option = null;
//设置表格样式
speed_cahart_option = {
    tooltip : {
        formatter: "{a} <br/>{c} {b}"
    },
    toolbox: {
        show: true,
        feature: {
            //magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    series : [
        {
            name: '速度',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 80,
            splitNumber: 10,
            radius: '50%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#eee',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#222'
            },
            title : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic'
            },
            detail : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function (value) {
                    value = (value + '').split('.');
                    value.length < 2 && (value.push('00'));
                    return ('00' + value[0]).slice(-2)
                        + '.' + (value[1] + '00').slice(0, 2);
                },
                fontWeight: 'bolder',
                borderRadius: 3,
                backgroundColor: '#444',
                borderColor: '#aaa',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderWidth: 2,
                textBorderColor: '#000',
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: '#fff',
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontFamily: 'Arial',
                width: 100,
                color: '#eee',
                rich: {}
            },
            data:[{value: 20, name: 'km/h'}]
        },
        {
            name: '转速',
            type: 'gauge',
            center: ['20%', '55%'],    // 默认全局居中
            radius: '35%',
            min:0,
            max:7,
            endAngle:45,
            splitNumber:7,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8
                }
            },
            axisTick: {            // 坐标轴小标记
                length:12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length:20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width:5
            },
            title: {
                offsetCenter: [0, '-30%'],       // x, y，单位px
            },
            detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder'
            },
            data:[{value: 1.5, name: 'x1000 r/min'}]
        },
        {
            name: '油表',
            type: 'gauge',
            center: ['77%', '50%'],    // 默认全局居中
            radius: '25%',
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8
                }
            },
            axisTick: {            // 坐标轴小标记
                splitNumber: 5,
                length: 10,        // 属性length控制线长
                lineStyle: {        // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                formatter:function(v){
                    switch (v + '') {
                        case '0' : return 'E';
                        case '1' : return 'Gas';
                        case '2' : return 'F';
                    }
                }
            },
            splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width:2
            },
            title : {
                show: false
            },
            detail : {
                show: false
            },
            data:[{value: 2, name: 'gas'}]
        },
        {
            name: '水表',
            type: 'gauge',
            center : ['77%', '50%'],    // 默认全局居中
            radius : '25%',
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8
                }
            },
            axisTick: {            // 坐标轴小标记
                show: false
            },
            axisLabel: {
                formatter:function(v){
                    switch (v + '') {
                        case '0' : return 'H';
                        case '1' : return 'Water';
                        case '2' : return 'C';
                    }
                }
            },
            splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width:2
            },
            title: {
                show: false
            },
            detail: {
                show: false
            },
            data:[{value: 2, name: 'water'}]
        }
    ]
};
//函数获取路书汽车坐标计算速度和加速度显示在仪表盘中
function show_speed(lushu,time){
    //记录前一个坐标点
    var temp_opsition1=null;
    //记录临时速度和加速度
    var temp_speed1,temp_speed2;
    var acceleration=0;
    //设置油气初始值
    var gas_max=2;
    var water_max=2;
    //设置变量统计执行次数
    var temp_count=0;
    setInterval(function () {
        if(temp_opsition1==null){
            temp_opsition1=lushu.get_position();
        }else {
            var temp_opsition2=lushu.get_position();
            var temp_distance=BMapLib.GeoUtils.getDistance(temp_opsition1,temp_opsition2);
            temp_opsition1=temp_opsition2;
            //计算速度（km/h）
            var temp_speed=(temp_distance/(time/1000))*3.6;
            //计算水汽消耗
            temp_gas=gas_max-0.002*temp_count+Math.random()*0.001;
            temp_water=water_max-0.002*temp_count+Math.random()*0.001;
            //计算加速度
            if(temp_speed1==null){
                temp_speed1=temp_speed;
            }else {
                temp_speed2=temp_speed;
                acceleration=(temp_speed1-temp_speed2)/(time/1000);
            }

            //设置显示仪表盘
            //检查是数据是否有误
            if(temp_speed>=0&&temp_speed<=80){
                speed_cahart_option.series[0].data[0].value =temp_speed+Math.random()*2;// (Math.random()*100).toFixed(2) - 0;
                speed_cahart_option.series[1].data[0].value =(temp_speed/10+Math.random()*2).toFixed(4)-0;
            }else {
                console.log("显示", "速度超标");
            }
            if(temp_gas<=0||temp_water<=0){
                console.log("Gas Or Water RUN OUT");
                //To-do
            }else {
                speed_cahart_option.series[2].data[0].value = temp_water;
                speed_cahart_option.series[3].data[0].value = temp_gas;
            }
            speed_chart.setOption(speed_cahart_option);
            temp_count++;
        }
    },time)
    //speed_auto_chart.setOption(speed_auto_option,true);
};
//设置动态数据显示
var speed_auto_show_dom=document.getElementById("speed_auto_show");
var speed_auto_chart=echarts.init(speed_auto_show_dom);

var speed_auto_option={
    title: {
        text: '车辆速度显示',
        subtext: '实时车辆数据显示'
    },
    textStyle:{//设置文字大小
        fontSize:16,
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:['车辆速度', '加速度']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {//显示时间间隔为2s的数据
                    res.unshift(now.toLocaleString('chinese', { hour12: false }).replace(/\d*\/\d*\/\d* /,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {//显示时间间隔为2s的数据
                    res.unshift(now.toLocaleString('chinese', { hour12: false }).replace(/\d*\/\d*\/\d* /,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '加速度',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
        {
            type: 'value',
            scale: true,
            name: '车辆速度',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name:'加速度',
            type:'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
        },
        {
            name:'车辆速度',
            type:'line',
            data:(function (){
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        }
    ]
};

app.count = 11;
function ShowSpeedLineChart() {
    setInterval(function (){
        var axisData = (new Date()).toLocaleString('chinese', { hour12: false }).replace(/\d*\/\d*\/\d* /,'');

        var data0 = speed_auto_option.series[0].data;
        var data1 = speed_auto_option.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        speed_auto_option.xAxis[0].data.shift();
        speed_auto_option.xAxis[0].data.push(axisData);
        speed_auto_option.xAxis[1].data.shift();
        speed_auto_option.xAxis[1].data.push(app.count++);

        speed_auto_chart.setOption(speed_auto_option);
    }, 2100);
}
var points =[
    {"lng":104.002890,"lat":30.559616,"count":50},
    {"lng":104.002760,"lat":30.559888,"count":51},
    {"lng":104.002293,"lat":30.560615,"count":15},
    {"lng":104.001601,"lat":30.560921,"count":40},
    {"lng":104.008843,"lat":30.575516,"count":100},
    {"lng":104.00546,"lat":30.578503,"count":6},
    {"lng":104.003289,"lat":30.579989,"count":18},
    {"lng":104.008162,"lat":30.575051,"count":80},
    {"lng":104.002039,"lat":30.57782,"count":11},
    {"lng":104.00387,"lat":30.577253,"count":7},
    {"lng":104.00773,"lat":30.579426,"count":42},
    {"lng":104.001107,"lat":30.576445,"count":4},
    {"lng":104.001301,"lat":30.577943,"count":27},
    {"lng":104.001301,"lat":30.560836,"count":23},
    {"lng":104.001301,"lat":30.57463,"count":60},
    {"lng":104.005424,"lat":30.564675,"count":8},
    {"lng":104.009242,"lat":30.574509,"count":15},
    {"lng":104.002766,"lat":30.561408,"count":25},
    {"lng":104.001674,"lat":30.564396,"count":21},
    {"lng":104.007268,"lat":30.56267,"count":1},
    {"lng":104.001732,"lat":30.560034,"count":51},
    {"lng":104.001732,"lat":30.56667,"count":7},
    {"lng":104.001732,"lat":30.579114,"count":11},
    {"lng":104.001732,"lat":30.561611,"count":35},
    {"lng":104.001732,"lat":30.561037,"count":22},
    {"lng":104.009336,"lat":30.561134,"count":4},
    {"lng":104.003557,"lat":30.563254,"count":5},
    {"lng":104.008367,"lat":30.56943,"count":3},
    {"lng":104.004312,"lat":30.579621,"count":100},
    {"lng":104.003874,"lat":30.579447,"count":87},
    {"lng":104.007162,"lat":30.563091,"count":32},
    {"lng":104.007162,"lat":30.561854,"count":44},
    {"lng":104.007162,"lat":30.568227,"count":21},
    {"lng":104.006426,"lat":30.562286,"count":80},
    {"lng":104.001597,"lat":30.57948,"count":32},
    {"lng":104.003895,"lat":30.560787,"count":26},
    {"lng":104.003563,"lat":30.561197,"count":17},
    {"lng":104.007162,"lat":30.562547,"count":17},
    {"lng":104.006126,"lat":30.561938,"count":25},
    {"lng":104.007162,"lat":30.575782,"count":100},
    {"lng":104.009239,"lat":30.576759,"count":39},
    {"lng":104.007185,"lat":30.569123,"count":11},
    {"lng":104.007237,"lat":30.567518,"count":9},
    {"lng":104.007784,"lat":30.575754,"count":47},
    {"lng":104.000193,"lat":30.577061,"count":52},
    {"lng":104.007162,"lat":30.575619,"count":100},
    {"lng":104.008495,"lat":30.575958,"count":46},
    {"lng":104.006292,"lat":30.561166,"count":9},
    {"lng":104.009916,"lat":30.564055,"count":8},
    {"lng":104.00189,"lat":30.561308,"count":11},
    {"lng":104.003765,"lat":30.569376,"count":3},
    {"lng":104.008232,"lat":30.560348,"count":50},
    {"lng":104.007162,"lat":30.560511,"count":15},
    {"lng":104.008568,"lat":30.578161,"count":23},
    {"lng":104.003461,"lat":30.566306,"count":3},
    {"lng":104.00232,"lat":30.56161,"count":13},
    {"lng":104.0074,"lat":30.568616,"count":6},
    {"lng":104.004679,"lat":30.575499,"count":21},
    {"lng":104.007162,"lat":30.575738,"count":29},
    {"lng":104.007836,"lat":30.576998,"count":99},
    {"lng":104.000755,"lat":30.568001,"count":10},
    {"lng":104.004077,"lat":30.560655,"count":14},
    {"lng":104.006092,"lat":30.562995,"count":16},
    {"lng":104.00535,"lat":30.561054,"count":15},
    {"lng":104.003022,"lat":30.561895,"count":13},
    {"lng":104.009462,"lat":30.573373,"count":17},
    {"lng":104.001191,"lat":30.566572,"count":1},
    {"lng":104.009612,"lat":30.577119,"count":9},
    {"lng":104.008237,"lat":30.561337,"count":54},
    {"lng":104.003776,"lat":30.561919,"count":26},
    {"lng":104.007694,"lat":30.56536,"count":17},
    {"lng":104.005377,"lat":30.574137,"count":19},
    {"lng":104.007434,"lat":30.574394,"count":43},
    {"lng":104.00588,"lat":30.562622,"count":27},
    {"lng":104.008345,"lat":30.579467,"count":8},
    {"lng":104.006883,"lat":30.577171,"count":3},
    {"lng":104.003877,"lat":30.576659,"count":34},
    {"lng":104.005712,"lat":30.575613,"count":14},
    {"lng":104.009869,"lat":30.561416,"count":12},
    {"lng":104.006956,"lat":30.565377,"count":11},
    {"lng":104.00066,"lat":30.565017,"count":38},
    {"lng":104.006244,"lat":30.560215,"count":91},
    {"lng":104.00929,"lat":30.575908,"count":54},
    {"lng":104.002116,"lat":30.579658,"count":21},
    {"lng":104.009462,"lat":30.565015,"count":15},
    {"lng":104.001969,"lat":30.573527,"count":3},
    {"lng":104.009462,"lat":30.561854,"count":24},
    {"lng":104.00905,"lat":30.569217,"count":12},
    {"lng":104.004579,"lat":30.574987,"count":57},
    {"lng":104.009462,"lat":30.575251,"count":70},
    {"lng":104.005867,"lat":30.578989,"count":8}];

if(!isSupportCanvas()){
    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
}
//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
//参数说明如下:
/* visible 热力图是否显示,默认为true
 * opacity 热力的透明度,1-100
 * radius 势力图的每个点的半径大小
 * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
 *	{
        .2:'rgb(0, 255, 255)',
        .5:'rgb(0, 110, 255)',
        .8:'rgb(100, 0, 255)'
    }
    其中 key 表示插值的位置, 0~1.
        value 为颜色值.
 */
heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
map.addOverlay(heatmapOverlay);
heatmapOverlay.setDataSet({data:points,max:100});
//是否显示热力图
function openHeatmap(){
    heatmapOverlay.show();
}
function closeHeatmap(){
    heatmapOverlay.hide();
}
//closeHeatmap();
//openHeatmap();
function setGradient(){
    /*格式如下所示:
   {
         0:'rgb(102, 255, 0)',
         .5:'rgb(255, 170, 0)',
         1:'rgb(255, 0, 0)'
   }*/
    var gradient = {};
    var colors = document.querySelectorAll("input[type='color']");
    colors = [].slice.call(colors,0);
    colors.forEach(function(ele){
        gradient[ele.getAttribute("data-key")] = ele.value;
    });
    heatmapOverlay.setOptions({"gradient":gradient});
}

closeHeatmap();
//判断浏览区是否支持canvas
function isSupportCanvas(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}
