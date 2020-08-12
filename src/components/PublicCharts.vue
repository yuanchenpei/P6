<template>
    <v-chart class="yqCharts"
             autoresize
             :options="option"
             @click="handelClick"
    ></v-chart>
</template>

<script>
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/dataZoom'

  export default {
    props:['options'],
    name: "PublicCharts",
    data() {
      return {
        option:this.options,

      }
    },
    methods:{
      handelClick(e){
        "xAxis" === e.componentType && this.$emit('xAxisValue',e.value)
      },
    }
  }
</script>

<style scoped>
    .yqCharts {
        width: 80vw;
        height: 80vh;
    }
</style>