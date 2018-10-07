// 百度地图API功能
var map = new BMap.Map("map");    // 创建Map实例
//map.setCurrentCity("成都");          // 设置地图中心显示的城市 new！
map.enableScrollWheelZoom(false);     //开启鼠标滚轮缩放
//map.addControl(new BMap.NavigationControl());   //开启可视化控件
/*
* 启用键盘操作，默认禁用。
* 键盘的上、下、左、右键可连续移动地图。
* 同时按下其中两个键可使地图进行对角移动。
* PgUp、PgDn、Home和End键会使地图平移其1/2的大小。
* +、-键会使地图放大或缩小一级
* */
map.enableKeyboard(false);//启用键盘操作
// map.addControl(new BMap.MapTypeControl( {mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]} ));   //添加地图类型控件 离线只支持普通、卫星地图; 三维不支持
layer.msg('<h1>欢迎使用地图监控</h1>');
//设置中心点
var center_point=new BMap.Point(104.0064480000,30.5624560000);
map.centerAndZoom(center_point, 19);  // 初始化地图,设置中心点坐标和地图级别
/*
*设置地图缩放级别限制
*/
map.setMinZoom(16);
map.setMaxZoom(19);
//设置缩放级别监听事件
/*
map.addEventListener("zoomend", function(){
    if( this.getZoom()<=16 ) {
        layer.msg("已达到最小缩放级别");
    }
    if( this.getZoom()==19 ) {
        layer.msg("已达到最大缩放级别");
    }
});
*/
//设置地图限制范围
var b = new BMap.Bounds(new BMap.Point(103.941245,30.50067),new BMap.Point(104.060296,30.627837));//左下右上
try {
    BMapLib.AreaRestriction.setBounds(map, b);
} catch (e) {
    alert(e);
}

/*
  设置数据创建公路坐标点
*/
var line_points = [     //线段关键点坐标
    new BMap.Point(104.002890,30.559616),
    new BMap.Point(104.002760,30.559888),
    new BMap.Point(104.002293,30.560615),
    new BMap.Point(104.001601,30.561529),
    new BMap.Point(104.001391,30.561801),
    new BMap.Point(104.001229,30.562481),
    new BMap.Point(104.001301,30.563045),
    new BMap.Point(104.001732,30.564223),
    new BMap.Point(104.001975,30.564592),
    new BMap.Point(104.002374,30.564981),
    new BMap.Point(104.002747,30.565187),
    new BMap.Point(104.002963,30.565307),
    new BMap.Point(104.003771,30.565544),
    new BMap.Point(104.005074,30.565599),
    new BMap.Point(104.005514,30.565707),
    new BMap.Point(104.006215,30.565894),
    new BMap.Point(104.006763,30.566050),
    new BMap.Point(104.007162,30.566139),
    new BMap.Point(104.007611,30.566205),
    new BMap.Point(104.007611,30.566205),
    new BMap.Point(104.007818,30.566190),
    new BMap.Point(104.008025,30.566131),
    new BMap.Point(104.008254,30.566030),
    new BMap.Point(104.008505,30.565875),
    new BMap.Point(104.009318,30.564888),
    new BMap.Point(104.009462,30.564732),
    new BMap.Point(104.009763,30.564495),
    new BMap.Point(104.009880,30.564421),
    new BMap.Point(104.010787,30.564001),
    new BMap.Point(104.011443,30.563663),
    new BMap.Point(104.011685,30.563453),
    new BMap.Point(104.012265,30.562796),
    new BMap.Point(104.013042,30.561914),
    new BMap.Point(104.013504,30.561393)
];
var station_points=[ //公交站点坐标
    line_points[0],
    line_points[3],
    line_points[10],
    line_points[14],
    line_points[26],
    line_points[31],
    line_points[33]
];
/*绘制公交线路
   1.绘制公交站点Marker
   2.绘制公交线路plotyline
   3.绘制小车动画
 */
//绘制公交线路
var Markers=[];
//设置公交站点iocn
var bus_station_icon,run_bus_iocn;
//公交站点iocn
bus_station_icon = new BMap.Icon("images/self_img/bus_station.png", new BMap.Size(64, 64), {
    // 指定定位位置。
    // 当标注显示在地图上时，其所指向的地理位置距离图标左上
    // 角各偏移16像素和16像素。您可以看到在本例中该位置即是
    // 图标中央下端的尖角位置。
    anchor: new BMap.Size(32, 32),
    // 设置图片偏移。
    // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
    // 需要指定大图的偏移位置，此做法与css sprites技术类似。
    //imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置
    imageSize:new BMap.Size(64,64)
});
//公交车iocn1、2
run_bus_iocn =new BMap.Icon("images/self_img/6.png", new BMap.Size(128,128), {
    anchor:new BMap.Size(64,64),
    imageSize:new BMap.Size(128,128)
});
run_bus_iocn1=new BMap.Icon("images/self_img/6-1.png", new BMap.Size(128,128), {
    anchor:new BMap.Size(64,64),
    imageSize:new BMap.Size(128,128)
});
//绘制公交线路
//设置站点参数
var station_opt={
    icon:bus_station_icon
};
//设置线参数
var line_opt={
    strokeColor:'red',
    strokeWeight:2,
    strokeOpacity:0.8,
    strokeStyle:'dashed'
};
//定义公交线路
var bus_line=new BusLine(map,station_points,line_points);
bus_line.set_line_opt(line_opt);
bus_line.set_station_opt(station_opt);
bus_line.draw_bus_line();
Markers=bus_line.get_stations();

/*
* 利用路书设置绘图动画
* */
//设置站点停靠时间s
var bus_stay_time=3;
//设置路书基本参数
var lushu_option={
    //landmarkPois:此参数是路书移动的时候碰到这个点会触发pauseTime停留中设置的时间，单位为秒，经纬度误差距离为10m
    landmarkPois:[
        {lng:station_points[0].lng,lat:station_points[0].lat,html:'<h1>体育学院站到了</h1>',pauseTime:bus_stay_time},
        {lng:station_points[1].lng,lat:station_points[1].lat,html:'<h1>艺术学院站到了</h1>',pauseTime:bus_stay_time},
        {lng:station_points[2].lng,lat:station_points[2].lat,html:'<h1>土木实验室站到了</h1>',pauseTime:bus_stay_time},
        {lng:station_points[3].lng,lat:station_points[3].lat,html:'<h1>制造实验室站到了</h1>',pauseTime:bus_stay_time},
        {lng:station_points[4].lng,lat:station_points[4].lat,html:'<h1>计算机学院站到了</h1>',pauseTime:bus_stay_time},
        {lng:station_points[5].lng,lat:station_points[5].lat,html:'<h1>一号运动场站到了</h1>',pauseTime:bus_stay_time},
        {lng:station_points[6].lng,lat:station_points[6].lat,html:'<h1>东南门站到了</h1>',pauseTime:bus_stay_time}
    ],
    /*
    * 参数说明：2018/7/17 19:06
    * 1、defultContent:车辆行驶过程中infow显示的文字
    * 2、speed:车辆运行显示速度
    * 3、icon1、2车辆开启循环返回时的交替车辆iocn
    * 4、autoView:是否视角切换
    * 5、enableRotation：车辆是否旋转
    * 6、isCircle车辆动画是否循环运行
    * */
    defaultContent: '<h1>车辆正常运行中</h1>',
    speed: 10,//速度，单位米每秒
    icon: run_bus_iocn,//声明第一个iocn
    icon1:run_bus_iocn1,//声明第二个iocn
    autoView: false,
    enableRotation:true,
    isCircle:true//默认车辆循环运行
};
//定义路书
//var lushu = new BMapLib.LuShu(map, line_points,lushu_option);
/*
* 设置控制按钮控件
* 1、动画暂停\继续
* 2、动画停止
* 3、动画添加车辆
* 4、开始动画
* */
//定义数组添加路书
var lushu_array=[];
//lushu_array.push(lushu);
//隐藏按钮
hide_div();

//设置启动动画
function start_run(){
    var temp_length=lushu_array.length;
    if(temp_length<1){
        layer.msg('<h1>请添加车辆</h1>');
    }else {
        for(var temp in lushu_array){
            lushu_array[temp].start();
            //lushu_array[temp].set_circle();
        }
    }
}
//设置暂停
function bus_pause() {
    if(lushu_array.length<1){
        layer.msg('<h1>请添加车辆</h1>');
    }else {
        for(var temp in lushu_array){
            lushu_array[temp].pause();
        }
    }
}
//停止动画
function bus_stop() {
    if(lushu_array.length<1){
        layer.msg('<h1>请添加车辆</h1>');
    }else {
        for(var temp in lushu_array){
            lushu_array[temp].stop();
        }
    }
}
//添加公交车
function add_bus() {
    var temp_lushu=new BMapLib.LuShu(map,line_points,lushu_option);
    temp_lushu.start();
    lushu_array.push(temp_lushu);
   // compute_speed(temp_lushu,1000);
    //console.log(temp_lushu.get_return_path());
   // temp_lushu.compute_speed(1000);
    //显示速度
    //show_speed(temp_lushu,2000);
}
//隐藏按钮
var is_hide=false,temp_opa=1;
function hide_div() {
    if(!is_hide){
        temp_opa=0.2
    }else {
        temp_opa=1;
    }
    $("#control").css("opacity",temp_opa); //设置透明度
    is_hide=!is_hide;
}
//开始运行
//lushu.start();
//更改图标lushu.change_iocn(bus_station_icon);
// lushu._marker.setAnimation(null);
//设置车辆循环运行lushu.set_circle();
//设置新的参数变量
// var lushu_option2=jQuery.extend(true,{},lushu_option);
// lushu_option2.speed=80;
// var lushu2=new BMapLib.LuShu(map,line_points,lushu_option2);
// lushu2.start();
//设置回归
function  return_center() {
    //map.setCenter(center_point);
    map.centerAndZoom(center_point, 18);
    //map.panTo(center_point);
    //计算速度
}
//显示热力地图
function ShowHotMap(){
    openHeatmap();
}
//显示仪表和速度
function compute_speed(lushu,time){
        //记录前一个坐标点
        var temp_opsition1=null;
        setInterval(function () {
            if(temp_opsition1==null){
                temp_opsition1=lushu.get_position();
            }else {
                var temp_opsition2=lushu.get_position();
               // console.log(temp_opsition1);
                //console.log(temp_opsition2);
                var temp_distance=BMapLib.GeoUtils.getDistance(temp_opsition1,temp_opsition2);
                temp_opsition1=temp_opsition2;
                return temp_distance;
            }
        },time)
}
/*
* 基本操作已经完成接下来进行绘制图表
* */
//页面加载完成后操作
var IsShowHotMap=false;//统计点击次数
//给按钮绑定事件
$("#show_hotmap").click(function () {
    if(IsShowHotMap==false){
        openHeatmap();
        this.innerText="隐藏热力图";
        IsShowHotMap=true;
    }else {
        closeHeatmap();
        this.innerText="显示热力地图";
        IsShowHotMap=false;
    }
});
//设置按钮显示车辆状态
var IsShowSpeedCharts=false;
$("show_bus_state").click(
    function () {
        if(IsShowSpeedCharts==false){
            ShowSpeedLineChart();
            show_speed(lushu_array[0],2000);
            IsShowSpeedCharts=true;
           // this.innerText="隐藏速度图像"
        }else {
           // this.innerText="";
            //ToDo
        }
    }
);
//设置节点可拖动
$( "#speed_table" ).css(
"position","fixed"
).draggable();

/*
* 实现键盘监听事件
* 2018-10-5 15:02
* 王鹏程
* 利用jq的keydown函数监听键盘事件
* */
function SetKeyboardListener() {
    $(document).keydown(function (event) {
        var WindowEvent = event || window.event;
        var k = WindowEvent.keyCode || WindowEvent.which;
        //Ctrl+Alt+快捷键设置
        if (WindowEvent.ctrlKey && WindowEvent.altKey) {
            switch (k) {
                case 82: //Ctrl+Alt+R 回归中心
                    console.log("Ctrl+Alt+R:回归中心");
                    return_center();
                break;
                case 83: //Ctrl+Alt+s 启动车辆
                    console.log("Ctrl+Alt+S :启动车辆");
                    start_run();
                break;
                case 80: // Ctrl+Alt+P 车辆暂停
                    console.log("Ctrl+Alt+P:车辆暂停");
                    bus_pause();
                break;
                case 65://  Ctrl+Alt+A:添加车辆
                    console.log("Ctrl+Alt+A:添加车辆");
                    add_bus();
                break;
                /*  //后续快捷键模板
                case 65://  Ctrl+Alt+A:添加车辆
                    console.log("Ctrl+Alt+A:车辆停止");
                    bus_stop();
                break;
                */
            }
        }
        //return  false;//抑制默认事件
    })
}
SetKeyboardListener();
