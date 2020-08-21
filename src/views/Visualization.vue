<template>
  <div class="warp">
    <div class="commandBar">
      <div>
        <label class="classification">一级分类:
          <a-select
              class="selector"
              :max-tag-count=1
              :max-tag-text-length="5"
              max-tag-placeholder="+"
              :value="level1Value"
              mode="multiple"
              @change="handleLevel1Change"
          >
            <a-select-option v-for="levelOneTags in level1" :key="levelOneTags.value">
              {{ levelOneTags.name }}
            </a-select-option>
          </a-select>
        </label>
        <label class="classification">二级分类:
          <a-select
              class="selector"
              :max-tag-count=1
              :max-tag-text-length="5"
              max-tag-placeholder="+"
              :value="level2Value"
              mode="multiple"
              @change="handleLevel2Change"
          >
            <a-select-option v-for="levelTwoTags in level2" :key="levelTwoTags.value">
              {{ levelTwoTags.name }}
            </a-select-option>
          </a-select>
        </label>
        <label class="classification">三级分类:
          <a-select
              class="selector"
              :max-tag-count=1
              :max-tag-text-length="5"
              max-tag-placeholder="+"
              :value="level3Value"
              mode="multiple"
              @change="handleLevel3Change"
          >
            <a-select-option v-for="levelThreeTags in level3" :key="levelThreeTags.value">
              {{ levelThreeTags.name }}
            </a-select-option>
          </a-select>
        </label>
      </div>
      <label>起止日期：
        <a-range-picker
            class="input"
            :format="dateFormat"
            :default-value="defaultPicker"
            :disabled-date="disabledDate"
            @change="handlePicker"
        />
      </label>
      <label>事件列表:
        <a-select
            class="selector"
            :max-tag-count=1
            :max-tag-text-length="5"
            max-tag-placeholder="+"
            :value="eventsValue"
            mode="multiple"
            @change="handleEventsChange"
        >
          <a-select-option v-for="eventTags in eventsList" :key="eventTags.value">
            {{ eventTags.name }}
          </a-select-option>
        </a-select>
      </label>

    </div>
    <div class="charts">
      <PublicCharts :options="viewOption" @xAxisValue="handleXClick"></PublicCharts>
    </div>

  </div>
</template>

<script>
import {getLevel, overView,} from "../utils/api";
import moment from 'moment';
import PublicCharts from "../components/PublicCharts";

const colorLine = ["#ff671f", "#9b26b6", "#00a9ce", "#548235", "#000000"]
const colorBar = ["#4e54c8", "#CAC531"]
const charsData = require('../utils/charsData.json')

export default {
  name: "Visualization",
  data() {
    return {
      level1: [],
      level2: [],
      level3: [],
      eventsList: [],
      level1Value: [],
      level2Value: [],
      level3Value: [],
      eventsValue: [],
      dateFormat: 'YYYY/MM/DD',
      pickerDate: [],
      viewOption: {
        title: {
          text: '各项目声量及非负占比变化图',
          x: 'center',
          padding: [5, 10],
        },
        tooltip: {
          formatter: null, //折线图显示百分号
          trigger: 'axis', //鼠标移动到列x轴时同时展示所有列数值
        },
        dataZoom: {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100
        },
        xAxis: {
          type: 'category',
          triggerEvent: true,
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 90,
            fontSize: 14
          }

        },

        yAxis: [
          {
            name: '声量',
            type: 'value',
            splitLine: {     //网格线
              show: false
            }
          },
          {
            name: '非负占比',
            type: 'value',
            splitLine: {     //网格线
              show: false
            },
            axisLabel: {
              formatter: '{value} %' //列数据显示百分号
            },
          }
        ],
        series: [
          {
            name: '声量',
            type: 'bar',
            itemStyle: {
              // color: '#DEB887'
              color: colorBar[0]
            },
            yAxisIndex: 0,
            data: [],

          },
          {
            name: '非负占比',
            type: 'line',
            // symbol: 'none', //圆点
            itemStyle: {
              normal: {
                // color: '#63B8FF',
                color: colorLine[0],
                width: 3
              }
            },
            yAxisIndex: 1,
            data: [],
          }

        ],

        //坐标指示
        axisPointer: {
          show: true,
          type: "line"
        },
        //防止文体太长无法完全显示
        grid: {
          left: '10%',
          bottom: '35%'
        },
        legend: {
          data: ['声量', '非负占比'],
          top: "4%"
        }
      }
    }
  },
  components: {PublicCharts},
  created() {
    this.pickerDate = [this.getDay(-140), this.getDay(0)]
    this.getL1()
  },
  computed: {
    defaultPicker() {
      return this.pickerDate.map(i => this.moment(i, this.dateFormat))
    }
  },
  methods: {
    moment,
    disabledDate(current) {
      return current && current > moment().endOf('day');
    },
    handlePicker(date, dateString) {
      this.pickerDate = dateString
      this.getEvents()
    },
    handleLevel1Change(val) {
      this.level1Value = val
      this.getL2(val)
    },
    handleLevel2Change(val) {
      this.level2Value = val
      this.getL3()
    },
    handleLevel3Change(val) {
      this.level3Value = val
      this.getEvents()
    },
    handleEventsChange(val) {
      this.eventsValue = val
      this.getViewData()
    },
    getL1(arr) {
      const param = {
        cateLevel: "1",
        cateType: "yqOverview"
      }
      getLevel(param).then(res => {
        let resData = res.data || []
        this.level1 = resData
        this.level1Value = resData.map(i => i.value)
        this.getL2()
      })
    },
    getL2(arr) {
      const param = {
        cateLevel: "2",
        cateParent: arr || this.level1Value,
        cateType: "yqOverview"
      }
      getLevel(param).then(res => {
        let resData = res.data || []
        this.level2 = resData
        this.level2Value = resData.map(i => i.value)
        this.getL3()
      })
    },
    getL3(arr) {
      const param = {
        cateLevel: "3",
        cateParent: arr || this.level2Value,
        cateType: "yqOverview"
      }
      getLevel(param).then(res => {
        let resData = res.data || []
        this.level3 = resData
        this.level3Value = resData.map(i => i.value)
        this.getEvents()
      })
    },
    // 获取事件列表
    getEvents() {
      const param = {
        argName: "yqOverview",
        cateFirst: this.level1Value,
        cateSecond: this.level2Value,
        cateThird: this.level3Value,
        edate: this.pickerDate[1],
        sdate: this.pickerDate[0],
        types: 0
      }
      overView(param).then(res => {
        let resData = res.data || []
        this.eventsList = resData
        this.eventsValue = resData.map(i => i.value)
        this.getViewData()
      })
    },
    //获取视图数据
    getViewData() {
      const param = {
        argName: "yqOverview",
        cateFirst: this.level1Value,
        cateSecond: this.level2Value,
        cateThird: this.level3Value,
        eventName: this.eventsValue,
        edate: this.pickerDate[1],
        sdate: this.pickerDate[0],
        types: 1
      }
      overView(param).then(res => {
        this.viewOption.xAxis.data = res.data.bar_x1
        this.viewOption.series[0].data = res.data.voice_num
        this.viewOption.series[1].data = res.data.no_rate
        this.viewOption.tooltip.formatter = (params) => {
          let a = params[0];
          let b = params[1];
          return (`${a['name']}</br>${a['seriesName']}: ${a['value']}</br>${b['seriesName']}: ${b['value']}%</br>事件描述: ${res.data.event_desc[a['dataIndex']]}`)
        }
      })
    },
    //点击跳转
    handleXClick(val) {
      const param = {
        argName: "yqOverview",
        cateFirst: this.level1Value,
        cateSecond: this.level2Value,
        cateThird: this.level3Value,
        edate: this.pickerDate[1],
        sdate: this.pickerDate[0],
        report: val,
        types: 2
      }
      overView(param).then(res => {
        window.open(res.data, 'target')
      })
    },
    getDay(day) {
      let today = new Date();
      today.setDate(today.getDate() + day);
      let startYear = today.getFullYear();
      let startMonth = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
      let startDate = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
      let startDateFull = startYear + "-" + startMonth + "-" + startDate;
      return startDateFull
    }
  }
}
</script>

<style scoped lang="less">
.warp {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.charts {
  flex: 1;
  display: flex;
  align-items: center;
}

.commandBar {
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 -1px 5px 0 #aaaaaa;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.selector {
  width: 170px;
  height: 32px;
  overflow: hidden;
  vertical-align: middle;
}

.classification {
  margin-right: 10px;
}
</style>