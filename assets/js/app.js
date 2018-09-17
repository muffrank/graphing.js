var App = function(){


    function Graphing(data){
        var _this = {
            graphs         : [
                {
                    'name':'Combine Graph',
                    id:'combine',
                    container: 'combine_container',
                    data:[{
                        name: 'Reputation Alerts',
                        color: '#d12851',
                        data: [{
                            x: Date.UTC(2010, 0, 1),
                            y: 70,
                        },
                            {
                                x: Date.UTC(2010, 2, 1),
                                y: 678,
                            },
                            {
                                x: Date.UTC(2010, 3, 1),
                                y: 234,
                            }
                        ]

                    },
                        {
                            name: 'AI Alerts',
                            color: '#ee7d3a',
                            data: [{
                                x: Date.UTC(2010, 0, 1),
                                y: 158,
                            },
                                {
                                    x: Date.UTC(2010, 2, 1),
                                    y: 340,
                                },
                                {
                                    x: Date.UTC(2010, 3, 1),
                                    y: 334,
                                }
                            ]

                        }
                    ],
                    type:'combine'
                },
                {
                    'name':'split Graph',
                    id:'split',
                    container: 'split_container',
                    miniGraphs:[
                        {
                            name: 'Reputation Alerts',
                            id:'Reputation_Alerts',
                            data: {
                                name: 'Reputation Alerts',
                                color: '#d12851',
                                data: [{
                                    x: Date.UTC(2010, 0, 1),
                                    y: 70,
                                },
                                    {
                                        x: Date.UTC(2010, 2, 1),
                                        y: 678,
                                    },
                                    {
                                        x: Date.UTC(2010, 3, 1),
                                        y: 234,
                                    }
                                ]

                            }
                        },
                        {
                            name: 'AI Alerts',
                            id: 'AI_Alerts',
                            color: '#ee7d3a',
                            data: {
                                name: 'AI Alerts',
                                color: '#ee7d3a',
                                data: [{
                                    x: Date.UTC(2010, 0, 1),
                                    y: 158,
                                },
                                    {
                                        x: Date.UTC(2010, 2, 1),
                                        y: 340,
                                    },
                                    {
                                        x: Date.UTC(2010, 3, 1),
                                        y: 334,
                                    }
                                ]

                            }
                        }
                    ],
                    type:'split'
                }
            ],
            defaultOptions : {
                chart: {
                    type: 'column',
                    backgroundColor: '#131820',
                    marginLeft: 50,
                    marginTop: 80,
                    style: {
                        color: 'white'
                    }
                },
                credits: false,
                title: {
                    text: '',
                    align: 'left',
                    style: {
                        color: 'white'
                    }
                },
                subtitle: {
                    text: ''
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: 0,
                    y: 0,
                    itemStyle: {
                        color: 'white'
                    },
                    itemHoverStyle: {
                        color: 'white'
                    },
                    enabled: true,
                    itemMarginBottom: 0
                },
                xAxis: {
                    type: 'datetime',
                    tickLength: 0,
                    lineColor: '#404040',
                    labels: {
                        style: {
                            color: 'white'
                        },
                        useHTML: true,
                    },
                    crosshair: {
                        className:'crosshairclassname',
                        color: "green",
                    }
                },
                yAxis: {
                    min: 0,
                    gridLineColor: '#404040',
                    gridLineWidth: 0.5,
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            color: 'white'
                        }
                    },
                },
                tooltip: {
                    headerFormat: '<table>',
                    pointFormat: '<tr><td style="padding:0"><span class="dot" style="background-color:{series.color};"></span> {series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true,
                    backgroundColor: '#0E1720',
                    borderColor: 'white',
                    followPointer: false,
                    shape: 'square',
                    style: {
                        color: 'white'
                    },
                    shadow: true,
                    positioner: function(boxWidth, boxHeight, point) {
                        return {
                            x: point.plotX,
                            y: boxHeight + 20
                        };
                    },
                    outside: true,
                    enabled: true,
                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        pointPadding:0
                    },
                    series: {
                        stickyTracking: false,
                        groupPadding: 0.38,
                    }
                },
                series: []
            },
            activeView     : 'combine',
            graphOptions   : {
                'combine':{
                    chart:{
                        ref:'combine',
                    },
                    plotOptions: {
                        series: {
                            stickyTracking: true,
                            point: {
                                events: {
                                    mouseOver: function(e){
                                        var _this = this;
                                        e.target.series.chart.xAxis["0"].crosshair.width = (_this.shapeArgs.width*2)+10

                                    }
                                }
                            }
                        }
                    },
                },
                'split':{
                    chart:{
                        ref:'mini',
                    },
                    plotOptions: {
                        series: {
                            stickyTracking: true,
                            point: {
                                events: {
                                    mouseOver: function(e){
                                        var _this = this;
                                        Highcharts.charts.forEach(function(graph){
                                            graph.xAxis["0"].crosshair.width = (_this.shapeArgs.width*2)+10
                                        });
                                    }
                                }
                            }
                        }
                    },
                    tooltip:{
                        shared:true,
                        useHTML:true,
                        formatter:function(){
                            //TODO: Need to add date formatter
                            var  e = this,
                                tooltip = '<div>' +
                                '<h3>'+moment(e.x).format("DD-MM-YYYY")+'</h3>';
                            Highcharts.charts.forEach(function(graph){
                                if(graph.userOptions.chart.ref=='mini'){
                                    var requiredData = {
                                        name:graph.series[0].name,
                                        point:{}
                                    };
                                    graph.series[0].data.forEach(function(d){
                                        if(new Date(d.x).getTime()==e.x)
                                        {
                                            requiredData.point = d;
                                        }
                                    });
                                    tooltip = tooltip+'<div><span>'+requiredData.name+'</span> : <span>'+requiredData.point.y+'</span> </div>';
                                    graph.xAxis[0].drawCrosshair(e,requiredData.point);
                                }
                            });
                            tooltip = tooltip+'</div>';
                            return tooltip;
                        }
                    }
                }
            },
            drawGraph      : function(options,data,el){
                var graphOptions = _this.deepCopy(_.merge(_this.defaultOptions, options),true);
                graphOptions.series = data;
                return Highcharts.chart(el,graphOptions);
            },
            changeView     : function(view){
                _this.graphs.forEach(function(graph){
                    if(graph.id==view){
                        $('#'+graph.container).show();
                    }else{
                        $('#'+graph.container).hide();
                    }
                });
                _this.activeView = view;
                $('.change_view').removeClass('active')
                $('[data-view="'+view+'"]').addClass('active');
            },
            ngrepeat       : function(data,template,iteration,el){
                var element = $(iteration(template,data)).clone();
                $(el).append(element);
            },
            deepCopy           : function(source, deep) {
                var o, prop, type;

                if (typeof source != 'object' || source === null) {
                    // What do to with functions, throw an error?
                    o = source;
                    return o;
                }

                o = new source.constructor();

                for (prop in source) {

                    if (source.hasOwnProperty(prop)) {
                        type = typeof source[prop];

                        if (deep && type == 'object' && source[prop] !== null) {
                            o[prop] = _this.deepCopy(source[prop]);

                        } else {
                            o[prop] = source[prop];
                        }
                    }
                }
                return o;
            }
        };
        if(data){
            _this.graphs.forEach(function(graph){
                _this.ngrepeat(graph,'<div class="graph_name"><h3 class="graph_name"></h3><div class="graph_container"></div></div>',function(template,data){
                    var temp = $(template);
                    temp.find('.graph_name').text(data.name);
                    temp.find('.graph_container').attr('id',data.id);
                    temp.attr('id',data.container);
                    return temp;
                },'.graphs_container');

                switch(graph.type){
                    case 'combine':
                        _this.drawGraph(
                            _this.graphOptions[graph.id],
                            graph.data,
                            graph.id
                        );
                        break;
                    case 'split':
                        graph.miniGraphs.forEach(function(mini){
                            _this.ngrepeat(mini,'<div class="mini_graph"><h3 class="mini_graph_name"></h3><div class="mini_graph_container"></div></div>',function(template,data){
                                var temp = $(template);
                                temp.find('.mini_graph_name').text(data.name);
                                temp.find('.mini_graph_container').attr('id',data.id);
                                return temp;
                            },'#split');
                            _this.drawGraph(
                                _this.graphOptions[graph.id],
                                [mini.data],
                                mini.id
                            );
                        });
                }
            });

            $('.change_view').on('click',function(e){
                _this.changeView($(this).data('view'));
            });
            _this.changeView(_this.activeView);
        }
    };

    return {
        init:Graphing
    }
};



