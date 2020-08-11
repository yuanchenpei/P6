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


        </div>
        <div class="charts">
            <ve-histogram :data="chartData" height="600px" width="100%" ></ve-histogram>
        </div>

    </div>
</template>

<script>
  import {getLevel1, getLevel2, getLevel3} from "../utils/api";
  import moment from 'moment';
  const charsData = require('../utils/charsData.json')

  export default {
    name: "Visualization",
    data() {
      return {
        charsData,
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
            {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
            {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
            {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
            {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
            {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
          ]
        },
        level1: [],
        level2: [],
        level3: [],
        level1Value: [],
        level2Value: [],
        level3Value: [],
        dateFormat: 'YYYY/MM/DD',
        pickerDate: []
      }
    },
    created() {
      this.getL1()
      this.getL2()
      this.pickerDate = [this.getDay(-30), this.getDay(0)]
    },
    computed:{
      defaultPicker(){
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
      maxTagPlaceholder(omittedValues){
        omittedValues=null
      },
      getL1(arr) {
        const param = {
          list: arr || ''
        }
        getLevel1(param).then(res => {
          this.level1 = res
          this.level1Value = res.map(i => i.value)
        })
      },
      getL2(arr) {
        const param = {
          list: arr || this.level1Value
        }
        getLevel2(param).then(res => {
          this.level2 = res
          this.level2Value = res.map(i => i.value)
          this.getL3()
        })
      },
      getL3(arr) {
        const param = {
          list: arr || this.level2Value
        }
        getLevel3(param).then(res => {
          this.level3 = res
          this.level3Value = res.map(i => i.value)
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
    .warp{
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
    .charts{
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
    }

    .classification {
        margin-right: 10px;
    }
</style>