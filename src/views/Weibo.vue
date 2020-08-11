<template>
    <div class="public-opinion">
        <div class="commandBar">
            <div class="title">微博数据维护</div>
            <div>
                <label class="label">数据日期:
                    <a-date-picker :disabled-date="disabledDate" :format="dateFormat" @change="onChange"/>
                </label>
                <label class="label">微博ID:
                    <a-input-search style="width: 200px" @search="onSearch"/>
                </label>
            </div>
        </div>
        <div class="table-warp">
            <div class="tableBar">
                <a-button class="btn" type="primary" @click="checkAll">{{selectedRowKeys.length>=10?'反选':'全选'}}
                </a-button>
                <div class="btnBox">
                    <a-button class="btn" :disabled="!selectedRowKeys.length" @click="delSelect" type="danger">删除
                    </a-button>
                    <a-button class="btn" @click="addPO">新增</a-button>
                </div>
            </div>
            <a-table
                    ref="table"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    :columns="columns"
                    :data-source="datas"
                    :scroll="{ x: 2200 }"
            >
                <div slot="action" slot-scope="text,record" class="action">
                    <a-button @click="editItem(record)" shape="circle" class="btn" icon="edit" type="primary"
                              size="small" ghost/>
                    <a-button @click="deleteItem(record)" shape="circle" class="btn" icon="delete" type="danger"
                              size="small" ghost/>
                </div>
            </a-table>
        </div>
        <a-modal v-model="edit" title="修改舆情数据" @ok="handleEdit" width="960px">
            <WeiboForm :data='dataItem' @formData="handleFormData" ref="editForm"></WeiboForm>
        </a-modal>
        <a-modal v-model="add" title="新增舆情数据" @ok="handleAdd" width="960px">
            <WeiboForm ref="addForm" @formData="handleFormData"></WeiboForm>
        </a-modal>
    </div>
</template>

<script>
  import WeiboForm from "../components/WeiboForm";
  import moment from "moment";

  const columns = [
    {
      title: '序号',
      dataIndex: 'tl1',
      fixed: 'left',
      width: 70,
    },
    {
      title: 'wbID',
      dataIndex: 'tl2',
      width: 150,
    },
    {
      title: '发布日期',
      dataIndex: 'tl3',
      width: 150,
    },
    {
      title: '评论量',
      dataIndex: 'tl4',
    },
    {
      title: '点赞量',
      dataIndex: 'tl5',
    },
    {
      title: '#话题',
      dataIndex: 'tl6',
    },
    {
      title: '微博话题分类',
      dataIndex: 'tl7',
    },
    {
      title: '评论一级分类',
      dataIndex: 'tl8',
    },
    {
      title: '评论二级分类',
      dataIndex: 'tl9',
    },
    {
      title: '评论三级分类',
      dataIndex: 'tl10',
    },
    {
      title: '评论内容总结',
      dataIndex: 'tl11',
      width: 200,
    },
    {
      title: '项目标签',
      dataIndex: 'tl12',
    },
    {
      title: '版本号',
      dataIndex: 'tl13',
    },
    {
      title: '同类评论条数',
      dataIndex: 'tl14',
    },
    {
      title: '舆情指标类',
      dataIndex: 'tl15',
    },
    {
      title: '指标值',
      dataIndex: 'tl16',
    },
    {
      title: '操作',
      dataIndex: 'tl17',
      fixed: 'right',
      width: 100,
      scopedSlots: {customRender: 'action'},
    },
  ];
  const datas = [];
  for (let i = 0; i < 16; i++) {
    datas.push({
      tl1: `${i + 1}`,
      tl2: 'a202003042114',
      tl3: `2020-07-${i < 9 ? '0' + (i + 1) : i + 1}`,
      tl4: "1645",
      tl5: "21424",
      tl6: "#电竞春晚#",
      tl7: "赛事生态",
      tl8: "游戏环境",
      tl9: `玩家行为`,
      tl10: `消极游戏`,
      tl11: `举报挂机`,
      tl12: `无`,
      tl13: `10.7`,
      tl14: `56`,
      tl15: `舆情可控度`,
      tl16: `0.993`,
      tl17: ``,
      key: i
    });
  }

  export default {
    name: "Weibo",
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
    components: {
      WeiboForm
    },
    methods: {
      //点击每一行的编辑
      editItem(val) {
        this.dataItem.cate1 = val.tl8
        this.dataItem.cate2 = val.tl9
        this.dataItem.cate3 = val.tl10
        this.dataItem.dataDate = val.tl3
        this.dataItem.commDesc = val.tl11
        this.dataItem.commentNum = val.tl14
        this.dataItem.commitNum = val.tl4
        this.dataItem.id = val.tl1
        this.dataItem.label = val.tl12
        this.dataItem.likes = val.tl5
        this.dataItem.pointValue = val.tl16
        this.dataItem.topic = val.tl6
        this.dataItem.topicCate = val.tl7
        this.dataItem.version = val.tl13
        this.dataItem.wbID = val.tl2
        this.dataItem.yqPoint = val.tl15

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
      handleFormData(val) {
        console.log(val)
      },
      //删除选中
      delSelect() {
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
      deleteItem() {
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
      checkAll() {
        if (this.selectedRowKeys.length >= 10) {
          this.selectedRowKeys = []
        } else {
          let arr = new Array(10).keys()
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

    /*/deep/tr:hover>td {*/
    /*    background-color:#ffffff!important*/
    /*}*/

</style>