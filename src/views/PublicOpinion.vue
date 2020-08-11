<template>
    <div class="public-opinion">
        <div class="commandBar">
            <div class="title">舆情总览数据维护</div>
            <div>
                <label class="label">数据日期:
                    <a-date-picker :disabled-date="disabledDate" :format="dateFormat" @change="onChange"/>
                </label>
                <label class="label">舆情报告名称:
                    <a-input-search style="width: 200px" @search="onSearch"/>
                </label>
            </div>
        </div>
        <div class="table-warp">
            <div class="tableBar">
                <a-button class="btn" type="primary" @click="checkAll">{{selectedRowKeys.length>=10?'反选':'全选'}}
                </a-button>
                <div class="btnBox">
                    <a-button class="btn" :disabled="!selectedRowKeys.length" @click="delSelect" type="danger">删除</a-button>
                    <a-button class="btn" @click="addPO">新增</a-button>
                </div>
            </div>
            <a-table
                    class="tableBox"
                    ref="table"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    :columns="columns"
                    :data-source="datas"
                    :pagination="{ pageSize: 20 }"
                    :scroll="{ x: 2000, y: 550}"
            >
                <div slot="action" slot-scope="text,record" class="action">
                    <a-button @click="editItem(record)" shape="circle" class="btn" icon="edit" type="primary"
                              size="small" ghost/>
                    <a-button @click="deleteItem(record)" shape="circle" class="btn" icon="delete" type="danger" size="small" ghost/>
                </div>
            </a-table>
        </div>
        <a-modal v-model="edit" title="修改舆情数据" @ok="handleEdit" width="960px">
            <PublicForm :data='dataItem' @formData="handleFormData" ref="editForm"></PublicForm>
        </a-modal>
        <a-modal v-model="add" title="新增舆情数据" @ok="handleAdd" width="960px">
            <PublicForm ref="addForm" @formData="handleFormData" ></PublicForm>
        </a-modal>
    </div>

</template>

<script>
  import moment from "moment";
  import PublicForm from "../components/PublicForm";

  const columns = [
    {
      title: '序号',
      dataIndex: 'tl1',
      fixed: 'left',
      width: 50,
    },
    {
      title: '日期',
      dataIndex: 'tl2',
    },
    {
      title: '舆情报告',
      dataIndex: 'tl3',
    },
    {
      title: '舆情事件',
      dataIndex: 'tl4',
    },
    {
      title: '非负舆情占比',
      dataIndex: 'tl5',
    },
    {
      title: '声量',
      dataIndex: 'tl6',
    },
    {
      title: '一级分类',
      dataIndex: 'tl7',
    },
    {
      title: '二级分类',
      dataIndex: 'tl8',
    },
    {
      title: '三级分类',
      dataIndex: 'tl9',
    },
    {
      title: '事件描述',
      dataIndex: 'tl10',
      width: 500,
    },
    {
      title: '链接',
      dataIndex: 'tl11',
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'tl12',
      fixed: 'right',
      width: 100,
      scopedSlots: {customRender: 'action'},
    },
  ];
  const datas = [];
  for (let i = 0; i < 16; i++) {
    datas.push({
      tl1: `${i + 1}`,
      tl2: `2020-07-${i < 9 ? '0' + (i + 1) : i + 1}`,
      tl3: "舆情报告",
      tl4: "稻草人重做",
      tl5: "0.64",
      tl6: "2522",
      tl7: "英雄联盟端游",
      tl8: "商业化",
      tl9: `英雄重做`,
      tl10: `稻草人重做上线后，玩家们讨论的声量较少，从短期看该英雄的人气并不会因为重做得到大幅度提升。负面反馈来源于对强度与机制的不满（65%），以及认为过于血腥恐怖（35%）`,
      tl11: `https://www.qq.com/lol`,
      tl12: ``,
      key: i
    });
  }

  export default {
    name: "PublicOpinion",
    components: {
      PublicForm
    },
    data() {
      return {
        dateFormat: 'YYYY/MM/DD',
        columns,
        datas,
        selectedRowKeys: [],
        add: false,
        edit: false,
        dataItem: {},

      }
    },
    methods: {
      //点击每一行的编辑
      editItem(val) {
        this.dataItem.reportName = val.tl3
        this.dataItem.dataDate = val.tl2
        this.dataItem.events = val.tl4
        this.dataItem.cate1 = val.tl7
        this.dataItem.cate2 = val.tl8
        this.dataItem.cate3 = val.tl9
        this.dataItem.vomume = val.tl6
        this.dataItem.nonRate = val.tl5
        this.dataItem.reportUrl = val.tl11
        this.dataItem.eventDesc = val.tl10

        this.edit = true
      },
      //添加新舆情
      addPO() {
        this.add = true
      },
      //添加弹框点击确定
      handleAdd() {
        this.$refs.addForm.submit()
      },
      //编辑弹框点击确定
      handleEdit() {
        this.$refs.editForm.submit()
      },
      //处理子组件传来的表单
      handleFormData(val){
        console.log(val)
      },
      //删除选中
      delSelect(){
        this.$confirm({
          title: '确定删除选中项',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      // 删除当前行
      deleteItem(){
        this.$confirm({
          title: '确定删除选这条数据',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      //全选和反选
      checkAll() {
        if (this.selectedRowKeys.length >= 16) {
          this.selectedRowKeys = []
        } else {
          let arr = new Array(16).keys()
          this.selectedRowKeys = Array.from(arr)
        }
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
      },
      disabledDate(current) {
        return current && current > moment().endOf('day');
      },
      onChange() {

      },
      onSearch(val) {
        console.log(val)
      },
    }
  }
</script>

<style scoped lang="less">
    .public-opinion{
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
    .commandBar {
        padding: 10px 20px;
        background-color: #ffffff;
        box-shadow: 0 -1px 5px 0 #aaaaaa;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 20px;
            line-height: 32px;
            font-weight: bold;
        }

        .label {
            margin-right: 20px;
        }
    }

    .table-warp {
        padding: 0 10px;
        min-height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        .action {
            width: 100%;
            display: flex;
            justify-content: space-around;

            .btn {
                margin: 0 5px;
            }
        }
    }

    .tableBar {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;

        .btnBox {
            .btn {
                margin-right: 20px;
            }
        }
    }
    .tableBox{
        flex: 1;
        overflow: scroll;
    }

    /*/deep/tr:hover>td {*/
    /*    background-color:#ffffff!important*/
    /*}*/

</style>