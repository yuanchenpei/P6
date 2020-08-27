<template>
    <a-form-model :model="dataItem" layout="horizontal">
        <a-row :gutter="16">
            <a-col :span="8">
                <a-form-model-item class="" label="舆情报告" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-model="dataItem.reportName" allowClear ></a-input>
                </a-form-model-item>
            </a-col>
            <a-col :span="8">
                <a-form-model-item label="数据日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-date-picker
                            :defaultValue="dataItem.dataDate"
                            type="date"
                            @change="_ => dataItem.dataDate = _"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                            placeholder="选择日期"
                            style="width: 100%;"
                    />
                </a-form-model-item>
            </a-col>
            <a-col :span="8">
                <a-form-model-item label="舆情事件" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-model="dataItem.events" allowClear ></a-input>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="8">
                <a-form-model-item class="" label="一级分类" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-select style="width: 100%"
                              v-model="dataItem.cate1"
                              @change="handleL1">
                        <a-select-option v-for="levelOneTags in level1" :key="levelOneTags.value">
                            {{ levelOneTags.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-col>
            <a-col :span="8">
                <a-form-model-item class="" label="二级分类" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-select style="width: 100%"
                              v-model="dataItem.cate2"
                              @change="handleL2">
                        <a-select-option v-for="levelTwoTags in level2" :key="levelTwoTags.value">
                            {{ levelTwoTags.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-col>
            <a-col :span="8">
                <a-form-model-item class="" label="三级分类" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-select style="width: 100%"
                              v-model="dataItem.cate3">
                        <a-select-option v-for="levelThreeTags in level3" :key="levelThreeTags.value">
                            {{ levelThreeTags.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-col>
        </a-row>

        <a-row :gutter="16">
            <a-col :span="8">
                <a-form-model-item class="" label="声量" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-model="dataItem.vomume" allowClear ></a-input>
                </a-form-model-item>
            </a-col>
            <a-col :span="8">
                <a-form-model-item label="非负占比" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-model="dataItem.nonRate" allowClear ></a-input>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="16">
                <a-form-model-item class="" label="报告网址" :labelCol="{span:3}" :wrapperCol="{span:21}">
                    <a-input v-model="dataItem.reportUrl" allowClear ></a-input>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="16">
                <a-form-model-item class="" label="事件描述" :labelCol="{span:3}" :wrapperCol="{span:21}">
                    <a-textarea v-model="dataItem.eventDesc" placeholder="请输入事件描述" :rows="4"/>
                </a-form-model-item>
            </a-col>
        </a-row>
    </a-form-model>
</template>

<script>
import {getLevel} from "../utils/api";
  import moment from "moment";

  export default {
    props: {
      data: {
        type: Object,
        default: () => {
          return {
            reportName: '',
            dataDate: '',
            events: '',
            cate1: '',
            cate2: '',
            cate3: '',
            vomume: '',
            nonRate: '',
            reportUrl: '',
            eventDesc: ''
          }
        }
      }
    },
    name: "PublicForm",
    data() {
      return {
        dataItem: this.data,
        labelCol: {span: 6},
        wrapperCol: {span: 18},
        level1: [],
        level2: [],
        level3: [],
        level1Value: '',
        level2Value: '',
        level3Value: '',
      }
    },
    watch:{
      data:{
        handler(newVal){
          this.dataItem = newVal
          this.getL2([this.dataItem.cate1])
          this.getL3([this.dataItem.cate2])
        }
      },
      deep:true
    },
    created() {
      this.getL1()
      this.getL2([this.dataItem.cate1])
      this.getL3([this.dataItem.cate2])
    },
    methods: {
      moment,
      submit() {
        this.$emit('formData', this.dataItem)
      },

      handleL1() {
        this.dataItem.cate2 = ''
        this.dataItem.cate3 = ''
        this.getL2()
      },
      handleL2() {
        this.dataItem.cate3 = ''
        this.getL3()
      },
      getL1(arr) {
        const param = {
          cateLevel: "1",
          cateType: "yqOverview"
        }
        getLevel(param).then(res => {
          this.level1 = res.data
        })
      },
      getL2(arr) {
        const param = {
          cateLevel: "2",
          cateParent: arr || [this.dataItem.cate1],
          cateType: "yqOverview"
        }
        getLevel(param).then(res => {
          this.level2 = res.data
        })
      },
      getL3(arr) {
        const param = {
          cateLevel: "3",
          cateParent: arr || [this.dataItem.cate2],
          cateType: "yqOverview"
        }
        getLevel(param).then(res => {
          this.level3 = res.data
        })
      },
    }
  }
</script>

<style scoped>

</style>