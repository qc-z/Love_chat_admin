(function(window, document, $, undefined){

    $(function(){
        var HTTP = window.httpAjax
        var topUrl = '/getDate'
        var sexUrl = '/getSexTotal'


        var knobLoaderOptions2 = {
          width: '50%',
          displayInput: true,
          fgColor: 'purple',
          readOnly: true
        };

        HTTP.get(topUrl, function(data) {
            data.lessTarget = Math.abs(data.lessTarget)
            let teamValue = data.lessTarget - 70000
            if(teamValue < 0) {
                teamValue = 0
            }
            $('.totalPay').text(data.totalPay)
            $('.todayTotal').text(data.todayTotal)
            $('.todayOrder').text(data.todayOrder)
            $('.lastTotal').text(data.lastTotal)
            $('.lastOrder').text(data.lastOrder)
            $('.lessTarget').text(data.lessTarget)
            $('.teamValue').text(teamValue)
            $('#knob-chart2').val(Math.floor((1 - data.lessTarget/70000)*100))
            $('#knob-chart2').knob(knobLoaderOptions2);
            $('#todayboy').text(data.todayboy)
            $('#todaygirl').text(data.todaygirl)


        })

        HTTP.get(sexUrl, function(data) {
            $('#knob-chart3').val(Math.floor((data.womenTotal/(data.manTotal + data.womenTotal)*100)))
            $('.sexRate').text('审核通过男的：' + data.manTotal + '，审核通过女的：' +data.womenTotal)
            $('#knob-chart3').knob(knobLoaderOptions2);
        })


      // Line
      // ----------------------------------- 

      var lineUrl = '/getiveOrder'

      HTTP.get(lineUrl, function(data) {
        new Chartist.Line('#ct-line1', {
          labels: ['五天', '四天', '三天', '昨天', '今天'],
          series: [data.order]
        }, {
          fullWidth: true,
          height: 280,
          chartPadding: {
            right: 40
          }
        });
      })


      $('[data-now]').each(function(){
        var element = $(this),
            format = element.data('format');

        function updateTime() {
          var dt = moment( new Date() ).format(format);
          element.text(dt);
        }

        updateTime();
        setInterval(updateTime, 1000);
      
      });

      var pieUrl = '/getAge'

      HTTP.get(pieUrl, function(data) {
        console.log(data)
        var pie_data = [{
          "label": "0-18",
          "color": "#800080",
          "data": data.a
        }, {
          "label": "19-25",
          "color": "#4acab4",
          "data": data.b
        }, {
          "label": "26-30",
          "color": "#ffea88",
          "data": data.c
        }, {
          "label": "31-35",
          "color": "#ff8153",
          "data": data.d
        }, {
          "label": "36-50",
          "color": "#878bb6",
          "data": data.e
        }, {
          "label": "50以上",
          "color": "#b2d767",
          "data": data.f
        }];

        var pie_options = {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0,
                    label: {
                        show: true,
                        radius: 0.8,
                        formatter: function (label, series) {
                            return '<div class="flot-pie-label">' +
                            //label + ' : ' +
                            Math.round(series.percent) +
                            '%</div>';
                        },
                        background: {
                            opacity: 0.8,
                            color: '#222'
                        }
                    }
                }
            }
        };

        var pie_chart = $('.chart-pie');
        if(pie_chart.length) {
          $.plot(pie_chart, pie_data, pie_options);
        }
      })
            

    });


})(window, document, window.jQuery);

(function(window, document, $, undefined){

  $(function(){

    // $('#chinaMap').height($('.chinaMap').width() * 1.2)

	  function randomData() {
      return Math.round(Math.random()*1000);
	  }
    var HTTP = window.httpAjax
    var mapUrl = '/getAddr'

    HTTP.get(mapUrl, function(data) {

      var arrs = data.arr
      arrs.sort(function(a, b) {
        return  b.value - a.value
      })

  		var option = {
        title: {
            text: '宠爱订单销量分布',
            subtext: '数据分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            min: 0,
            max: arrs[0].value,
            left: 'left',
            top: 'top',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'vip1',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: data.arr
            }
        ]
      };
  		var myChart = echarts.init(document.getElementById('chinaMap'));

  		console.log(option)

  		myChart.setOption(option);
    }, function(err) {
      console.log(err)
    })

    setTimeout(function(){
      window.location.reload()
    },600*1000)

  });

})(window, document, window.jQuery);


