/*
* 王鹏程 2018/7/25
* 设置了基本的BusLine类
* */

/*
* 设置bus_line基础类定义公交线路和站点
* 输入地图map、站点station、线路关键节点
* */
var BusLine=function (bus_map,bus_stations,bus_line_points) {
   // this.map=bus_map;//地图节点
    this.bus_stations=[];//设置站点返回Marker
    this.bus_station_opt={      //设置站点基本参数

    };
    this.bus_line_opt=null;//设置线路基本参数
    this.bus_line=null;//
    //设置设置line_opt;
    this.set_line_opt=function(opt){
        this.bus_line_opt=opt;
    };
    //设置station_opt
    this.set_station_opt=function(opt) {
      this.bus_station_opt=opt;
    };
    //设置绘制站点函数
    this.draw_stations=function(){
        //遍历数组添加Marker，并添加到Markers中
        var temp=bus_stations.length;
        if(temp==0){
            console.log("the num of stations is 0");
        }else{
            for(var i= 0;i<bus_stations.length;i++){
                var temp_marker=new BMap.Marker(bus_stations[i],this.bus_station_opt);
                this.bus_stations.push(temp_marker);
                bus_map.addOverlay(temp_marker);
                }
            }
    };
    this.get_stations=function (){
        return this.bus_stations;
    };
    //设置绘制线路函数
    this.draw_line=function(){
        this.bus_line=new BMap.Polyline(bus_line_points,this.bus_line_opt);
        bus_map.addOverlay(this.bus_line);
    };//设置公交线路
    //设置绘制函数
    this.draw_bus_line=function () {
        this.draw_stations();
        this.draw_line();
    };
};