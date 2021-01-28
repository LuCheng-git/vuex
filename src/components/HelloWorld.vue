<template>
  <div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
</template>

<script>
import { Chrome } from "vue-color";
import axios from 'axios'
// import echarts from 'echarts'
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {
      xdata: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", '嘻嘻嘻'],
      ydata: [5, 20, 36, 10, 10, 20, 100]
    };
  },
  mounted(){
    this.drawLine()
  },
  methods: {
     drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'), null, {renderer: 'svg'})
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: this.xdata
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: this.ydata
            }]
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
