<template>
  <div class="public-opinion">
    <div class="commandBar">
      <div class="title">舆情总览数据维护</div>
      <div>
        <label class="label">数据日期:
          <a-date-picker :disabled-date="disabledDate" :format="dateFormat" :value-format="dateFormat"
                         @change="handleDateChange"/>
        </label>
        <label class="label">舆情报告名称:
          <a-input-search style="width: 200px" v-model="searchText"  allowClear  @search="onSearch"/>
        </label>
      </div>
    </div>
    <div class="table-warp">
      <div class="tableBar">
        <a-button class="btn" type="primary" @click="checkAll">{{ selectedRowKeys.length >= 10 ? '反选' : '全选' }}
        </a-button>
        <div class="btnBox">
          <a-button class="btn" :disabled="!selectedRowKeys.length" @click="delSelect" type="danger">删除</a-button>
          <a-button class="btn" @click="addPO">新增</a-button>
        </div>
      </div>
      <a-table
          class="tableBox"
          ref="table"
          :loading="loading"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="datas"
          :pagination='pagination'
          row-key="id"
          :scroll="{ x: 2000, y:620}"
      >
        <div slot="action" slot-scope="text,record" class="action">
          <a-button @click="editItem(record)" shape="circle" class="btn" icon="edit" type="primary"
                    size="small" ghost/>
          <a-button @click="deleteItem(record)" shape="circle" class="btn" icon="delete" type="danger" size="small"
                    ghost/>
        </div>
      </a-table>
    </div>
    <a-modal v-model="edit" title="修改舆情数据" @ok="handleEdit" width="960px">
      <PublicForm :data='dataItem' @formData="handleEditFormData" ref="editForm"></PublicForm>
    </a-modal>
    <a-modal v-model="add" title="新增舆情数据" @ok="handleAdd" width="960px">
      <PublicForm ref="addForm" v-if="add" @formData="handleAddFormData"></PublicForm>
    </a-modal>
  </div>

</template>

<script>
import moment from "moment";
import PublicForm from "../components/PublicForm";
import {getQueryList, updateQuery, addQuery, deleteQuery} from "@/utils/api";

const columns = [
  {
    title: '序号',
    customRender: (t, r, i) => {
      return i + 1
    },
    fixed: 'left',
    width: 60,
  },
  {
    title: '日期',
    dataIndex: 'dataDate',
  },
  {
    title: '舆情报告',
    dataIndex: 'reportName',
  },
  {
    title: '舆情事件',
    dataIndex: 'events',
  },
  {
    title: '非负舆情占比',
    dataIndex: 'nonRate',
  },
  {
    title: '声量',
    dataIndex: 'vomume',
  },
  {
    title: '一级分类',
    dataIndex: 'cate1',
  },
  {
    title: '二级分类',
    dataIndex: 'cate2',
  },
  {
    title: '三级分类',
    dataIndex: 'cate3',
  },
  {
    title: '事件描述',
    dataIndex: 'eventDesc',
    width: 500,
  },
  {
    title: '链接',
    dataIndex: 'reportUrl',
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

export default {
  name: "PublicOpinion",
  components: {
    PublicForm
  },
  data() {
    let self = this
    return {
      dateFormat: 'YYYY-MM-DD',
      columns,
      datas: [],
      selectedRowKeys: [],
      allRowKeys: [],
      add: false,
      edit: false,
      dataItem: {},
      searchDate: '',
      searchText: '',
      pagination: {
        current: 1,
        pageSize: 20,
        onChange: (page) => self.changePage(page),
        total: 0
      },
      loading: false,
    }
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
      getQueryList(params).then(res => {
        this.datas = res.data
        this.allRowKeys = res.data.map(i => i.id)
        this.pagination.total = res.count
        this.loading = false;
      })
    },
    //点击每一行的编辑
    editItem(val) {
      let param = {id: val.id}
      getQueryList(param).then(res => {
        this.dataItem = res.data
        this.edit = true
      })
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
      updateQuery(val).then(res => {
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
      addQuery(val).then(res => {
        if (res.code == 0) {
          console.log()
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
          deleteQuery(param).then(res => {
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
          deleteQuery(param).then(res => {
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
    //全选和反选
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
.public-opinion {
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

.tableBox {
  flex: 1;
  overflow: scroll;
}

/*/deep/tr:hover>td {*/
/*    background-color:#ffffff!important*/
/*}*/

</style>