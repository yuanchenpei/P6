<template>
  <div class="warp">
    <div class="commandBar">
      <div>
        <label class="classification">功能选择:
          <a-select
              class="selector"
              :value="funcValue"
              @select="handlefuncValueSelect"
          >
            <a-select-option v-for="levelOneTags in funcMenu" :key="levelOneTags.value">
              {{ levelOneTags.name }}
            </a-select-option>
          </a-select>
        </label>
      </div>
      <div>
        <label>起止日期：
          <a-range-picker
              class="input"
              :format="dateFormat"
              :default-value="defaultPicker"
              :disabled-date="disabledDate"
              @change="handlePicker"
          />
        </label>
      </div>
      <div v-if="funcValue === 'topicCate'">
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
      <div v-if="funcValue === 'topicGroup'">
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
      </div>
      <div v-if="funcValue === 'wbTopic'">
        <label class="classification">项目标签:
          <a-select
              class="selector"
              :max-tag-count=1
              :max-tag-text-length="5"
              max-tag-placeholder="+"
              :value="topLabelValue"
              mode="multiple"
              @change="handleLevel1Change"
          >
            <a-select-option v-for="labelTags in topLabel" :key="labelTags.value">
              {{ labelTags.name }}
            </a-select-option>
          </a-select>
        </label>
      </div>
      <div v-if="funcValue === 'topicHort'">
        <label class="classification">微博话题:
          <a-select
              class="selector"
              :max-tag-count=1
              :max-tag-text-length="5"
              max-tag-placeholder="+"
              mode="multiple"
              :value="wbTopicValue"
              @change="handleLevel1Change"
          >
            <a-select-option v-for="wbTopicTags in wbTopic" :key="wbTopicTags.value">
              {{ wbTopicTags.name }}
            </a-select-option>
          </a-select>
        </label>
      </div>
      <div v-if="funcValue === 'versionInfo'">
        <label class="classification">版本号:
          <a-select
              class="selector"
              :max-tag-count=1
              :max-tag-text-length="5"
              max-tag-placeholder="+"
              mode="multiple"
              :value="verListValue"
              @change="handleLevel1Change"
          >
            <a-select-option v-for="verListTags in verList" :key="verListTags.value">
              {{ verListTags.name }}
            </a-select-option>
          </a-select>
        </label>
      </div>
    </div>
    <div class="charts">
      <PublicCharts ref="publicCharts" :options="viewOption"></PublicCharts>
    </div>

  </div>
</template>

<script>
import {getLevel, weibo} from "@/utils/api";
import moment from 'moment';
import PublicCharts from "../components/PublicCharts";

const colorLine = ["#ff671f", "#9b26b6", "#00a9ce", "#548235", "#000000"]
const colorBar = ["#4e54c8", "#CAC531"]
export default {
  name: "VisualiLOL",
  data() {
    return {
      funcMenu: [
        {
          name: "舆情走势状况",
          value: "topicCate"
        }, {
          name: "舆情观点分布统计",
          value: "topicGroup"
        }, {
          name: "项目舆情状况",
          value: "wbTopic"
        }, {
          name: "微博热度走势",
          value: "topicHort"
        }, {
          name: "游戏版本舆情",
          value: "versionInfo"
        }
      ],
      level1: [],
      level2: [],
      level3: [],
      level1Value: [],
      level2Value: [],
      level3Value: [],
      topLabelValue: [],
      wbTopicValue: [],
      verListValue: [],
      funcValue: 'topicCate',
      funcName: '舆情走势状况',
      dateFormat: 'YYYY-MM-DD',
      pickerDate: [],
      viewOption: {
        title: {
          text: '',
          x: 'center'
        },
        tooltip: {
          formatter: '{b0}<br /> {a0}:{c0}<br />{a1}: {c1}%<br /> {a2}:{c2}%<br />{a3}: {c3}%',
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
          data: [],
          axisLabel: {
            interval: 0,
            //旋转90度显示
            rotate: 90,
            fontSize: 14
          }
        },
        // yAxis: {},
        yAxis: [
          {
            name: '声量',
            type: 'value',
            splitLine: {     //网格线
              show: false
            }
          },
          {
            name: '指标值',
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
            name: '量级',
            type: 'bar',
            itemStyle: {
              // color: '#DEB887',
              color: colorBar[1]
            },
            yAxisIndex: 0,
            data: [],
          },
          {
            name: '非负占比',
            type: 'line',
            symbol: 'none', //圆点
            itemStyle: {
              normal: {
                // color: '#63B8FF',
                color: colorLine[1],
                width: 3
              }
            },
            yAxisIndex: 1,
            data: [],
          },
          {
            name: '舆情可控度',
            type: 'line',
            symbol: 'none', //圆点
            itemStyle: {
              normal: {
                // color: '#ff5500',
                color: colorLine[2],
                width: 3
              }
            },
            yAxisIndex: 1,
            data: [],
          },
          {
            name: '舆情敏感度',
            type: 'line',
            symbol: 'none', //圆点
            itemStyle: {
              normal: {
                // color: '#ffff00',
                color: colorLine[3],
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
          data: ['量级', '非负占比', '舆情可控度', '舆情敏感度'],
          top: "4%"
        }
      }
    }
  },
  components: {PublicCharts},
  created() {
    this.pickerDate = [this.getDay(-360), this.getDay(0)]
    switch (this.funcValue) {
      case 'topicCate':
        this.getL1()
        break;
    }
    this.getList()
  },
  computed: {
    defaultPicker() {
      return this.pickerDate.map(i => this.moment(i, this.dateFormat))
    },
  },
  methods: {
    moment,
    disabledDate(current) {
      return current && current > moment().endOf('day');
    },
    handlePicker(date, dateString) {
      this.pickerDate = dateString
    },
    handlefuncValueSelect(val) {
      this.funcValue = val
      this.funcMenu.map(item => {
        if (item.value === this.funcValue) {
          this.funcName = item.name
        }
      })
      this.getViewData()
      switch (val) {
        case 'topicHort':
          const legend = {
            data: ['评论量', '点赞量'],
            top: "4%"
          }
          this.viewOption.yAxis[0].name = '评论量'
          this.viewOption.yAxis[1].name = '点赞量'
          this.viewOption.series[0].type = 'line'
          // this.viewOption.legend = legend
          break;
        default :
          this.viewOption.series[0].type = 'bar'
          this.viewOption.yAxis[0].name = '声量'
          this.viewOption.yAxis[1].name = '指标值'

      }
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

    },
    getL1(arr) {
      const param = {
        cateLevel: "1",
        cateType: "weiboPlate"
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
        cateType: "weiboPlate"
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
        cateType: "weiboPlate"
      }
      getLevel(param).then(res => {
        let resData = res.data || []
        this.level3 = resData
        this.level3Value = resData.map(i => i.value)
        this.getViewData()
      })
    },
    //获取列表
    getList() {
      this.getTopLabel()
      this.getWbTopic()
      this.getVerList()
    },
    // 获取项目标签
    getTopLabel() {
      const param = {
        argName: "weiboPlate",
        mod: "date",
        edate: this.pickerDate[1],
        sdate: this.pickerDate[0],
        types: "getTopLabel"
      }
      weibo(param).then(res => {
        this.topLabel = res.data
        this.topLabelValue = res.data.map(i => i.value)
      })
    },
    // 获取微博话题
    getWbTopic() {
      const param = {
        argName: "weiboPlate",
        mod: "date",
        edate: this.pickerDate[1],
        sdate: this.pickerDate[0],
        types: "getWbTopic"
      }
      weibo(param).then(res => {
        this.wbTopic = res.data
        this.wbTopicValue = res.data.map(i => i.value)
      })
    },
    // 获取版本列表
    getVerList() {
      const param = {
        argName: "weiboPlate",
        mod: "date",
        edate: this.pickerDate[1],
        sdate: this.pickerDate[0],
        types: "getVerList"
      }
      weibo(param).then(res => {
        this.verList = res.data
        this.verListValue = res.data.map(i => i.value)
      })
    },
    //获取视图数据
    getViewData() {
      let param = {
        argName: "weiboPlate",
        mod: "date",
        edate: this.pickerDate[1],
        sdate: this.pickerDate[0],
      }
      switch (this.funcValue) {
        case 'topicCate':
          param.cateFirst = this.level1Value
          param.cateSecond = this.level2Value
          param.cateThird = this.level3Value
          param.types = "topicCate"
          break;
        case 'topicGroup':
          param.cateFirst = this.level1Value
          param.types = "topicGroup"
          break;
        case 'wbTopic':
          param.topLabel = this.topLabelValue
          param.types = "wbTopic"
          break;
        case 'topicHort':
          param.topHot = this.wbTopicValue
          param.types = "topicHort"
          break;
        case 'versionInfo':
          param.topVer = this.verListValue
          param.types = "versionInfo"
          break;
      }
      if (this.funcValue === 'topicCate') {
        param.cateSecond = this.level2Value
        param.cateThird = this.level3Value
        param.types = "topicCate"
      }
      weibo(param).then(res => {
        this.viewOption.xAxis.data = res.data.x_data
        this.viewOption.title.text = this.funcName
        if (this.funcValue === 'topicHort') {
          this.viewOption.series[0].data = res.data.pinglun
          this.viewOption.series[1].data = res.data.dianzan
        } else {
          this.viewOption.series[0].data = res.data.sl
          this.viewOption.series[1].data = res.data.no_rate
          this.viewOption.series[2].data = res.data.con_rate
          this.viewOption.series[3].data = res.data.sen_rate
        }
      })
    }
    ,
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