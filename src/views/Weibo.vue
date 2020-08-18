<template>
    <div class="public-opinion">
        <div class="commandBar">
            <div class="title">微博数据维护</div>
            <div>
                <label class="label">数据日期:
                    <a-date-picker :disabled-date="disabledDate" :format="dateFormat" value-format="YYYY-MM-DD" @change="handleDateChange"/>
                </label>
                <label class="label">微博ID:
                    <a-input-search style="width: 200px" v-model="searchText"  allowClear  @search="onSearch"/>
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
                    :loading="loading"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    :columns="columns"
                    :data-source="datas"
                    :pagination='pagination'
                    row-key="id"
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
        <a-modal v-model="edit" title="修改微博数据" @ok="handleEdit" width="960px">
            <WeiboForm :data='dataItem' @formData="handleEditFormData" ref="editForm"></WeiboForm>
        </a-modal>
        <a-modal v-model="add" title="新增微博数据" @ok="handleAdd" width="960px">
            <WeiboForm ref="addForm" v-if="add" @formData="handleAddFormData"></WeiboForm>
        </a-modal>
    </div>
</template>

<script>
  import WeiboForm from "../components/WeiboForm";
  import moment from "moment";
  import {deleteQuery, weiBoAddQuery, weiBoDeleteQuery, weiBoGetQueryList, weiBoUpdateQuery} from "@/utils/api";

  const columns = [
    {
      title: '序号',
      customRender: (t, r, i) => {
        return i + 1
      },
      fixed: 'left',
      width: 70,
    },
    {
      title: 'wbID',
      dataIndex: 'wbID',
      width: 150,
    },
    {
      title: '发布日期',
      dataIndex: 'dataDate',
      width: 150,
    },
    {
      title: '评论量',
      dataIndex: 'commitNum',
    },
    {
      title: '点赞量',
      dataIndex: 'likes',
    },
    {
      title: '#话题',
      dataIndex: 'topic',
    },
    {
      title: '微博话题分类',
      dataIndex: 'topicCate',
    },
    {
      title: '评论一级分类',
      dataIndex: 'cate1',
    },
    {
      title: '评论二级分类',
      dataIndex: 'cate2',
    },
    {
      title: '评论三级分类',
      dataIndex: 'cate3',
    },
    {
      title: '评论内容总结',
      dataIndex: 'commDesc',
      width: 200,
    },
    {
      title: '项目标签',
      dataIndex: 'label',
    },
    {
      title: '版本号',
      dataIndex: 'version',
    },
    {
      title: '同类评论条数',
      dataIndex: 'commentNum',
    },
    {
      title: '舆情指标类',
      dataIndex: 'yqPoint',
    },
    {
      title: '指标值',
      dataIndex: 'pointValue',
    },
    {
      title: '操作',
      dataIndex: 'tl17',
      fixed: 'right',
      width: 100,
      scopedSlots: {customRender: 'action'},
    },
  ];
  

  export default {
    name: "Weibo",
    data() {
      let self = this
      return {
        dateFormat: 'YYYY-MM-DD',
        columns,
        datas:[],
        selectedRowKeys: [],
        add: false,
        edit: false,
        dataItem: {},
        searchDate: '',
        searchText: '',
        pagination: {
          current: 1,
          pageSize: 10,
          onChange: (page) => self.changePage(page),
          total: 0
        },
        loading: false,
      }
    },
    components: {
      WeiboForm
    },
    created() {
      this.getList()
    },
    methods: {
      changePage(page) {
        this.pagination.current = page
        this.getList(page)
      },
      //获取列表
      getList(pageNo) {
        this.loading = true;
        let params = {
          page_size: this.pagination.pageSize,
          page: pageNo || this.pagination.current,
          searchDate: this.searchDate,
          searchText: this.searchText,
          method: 'list'
        }
        weiBoGetQueryList(params).then(res => {
          this.datas = res.data
          this.allRowKeys = res.data.map(i => i.id)
          this.pagination.total = res.count
          this.loading = false;
        })
      },
      //点击每一行的编辑
      editItem(val) {
        let param = {id: val.id}
        weiBoGetQueryList(param).then(res => {
          this.dataItem = res.data
          this.edit = true
        })

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
      //处理子组件传来的编辑表单
      handleEditFormData(val) {
        weiBoUpdateQuery(val).then(res => {
          if (res.code == 0) {
            this.$message.success(res.message)
            this.edit = false
            this.getList()
          } else {
            this.$message.error(res.message)
          }
        })
      },
      //处理子组件传来的添加表单
      handleAddFormData(val) {
        weiBoAddQuery(val).then(res => {
          if (res.code == 0) {
            this.$message.success(res.message)
            this.add = false
            this.getList()
          } else {
            this.$message.error(res.message)
          }
        })
      },
      //删除选中
      delSelect() {
        this.$confirm({
          title: '确定删除选中项',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            let param = {idList: this.selectedRowKeys}
            weiBoDeleteQuery(param).then(res => {
              this.$message.success(res.message)
              this.getList()
              this.selectedRowKeys = []
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      // 删除当前行
      deleteItem(val) {
        this.$confirm({
          title: '确定删除选这条数据',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            let param = {idList: [val.id]}
            weiBoDeleteQuery(param).then(res => {
              this.$message.success(res.message)
              this.selectedRowKeys = this.selectedRowKeys.filter(i => i != val.id)
              this.getList()
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      checkAll() {
        if (this.selectedRowKeys.length >= this.allRowKeys.length) {
          this.selectedRowKeys = []
        } else {
          this.selectedRowKeys = this.allRowKeys
        }
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
      },
      disabledDate(current) {
        return current && current > moment().endOf('day');
      },
      handleDateChange(val) {
        this.searchDate = val
        this.getList()
      },
      onSearch(val) {
        this.searchText = val
        this.getList()
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