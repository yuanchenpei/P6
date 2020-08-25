<template>
  <div>
    <div class="commandBar">
      <div class="title">用户管理</div>
    </div>
    <div class="table-warp">
      <div class="tableBar">
        <a-button class="btn" @click="">新增</a-button>
      </div>
      <a-table
          class="tablebox"
          :columns="columns"
          :data-source="tabledata"
          rowKey="id"
          :pagination="pagination"
      >
        <div slot="action" slot-scope="text,record" class="action">
          <a-button @click="edit(record)" shape="circle" class="btn" icon="form" type="primary" size="small" ghost/>
          <a-button @click="del(record)" shape="circle" class="btn" icon="delete" type="danger" size="small" ghost/>
        </div>
      </a-table>
    </div>
    <a-modal v-model="editOnOff" title="编辑标签" width="500px">

    </a-modal>
    <a-modal v-model="addOnOff" title="新增" @ok="" width="400px">
      <div class="addForm">
        <a-form-model layout="horizontal">
          <a-form-model-item label="产品名称:" :label-col="{span: 6}" :wrapper-col="{span: 16}">

          </a-form-model-item>
          <a-form-model-item label="板块名称:" :label-col="{span: 6}" :wrapper-col="{span: 16}">

          </a-form-model-item>
          <a-form-model-item label="分类名称:" :label-col="{span: 6}" :wrapper-col="{span: 16}">

          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {getUser} from '@/utils/api'
const columns = [
  {
    title: '序号',
    customRender: (t, r, i) => {
      return i + 1
    },
    width: 60,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '所属产品',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: '角色',
    dataIndex: 'roles',
    key: 'roles',
  },
  {
    title: '工号',
    dataIndex: 'staffid',
    key: 'staffid',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '是否激活',
    dataIndex: 'is_active',
    key: 'is_active',
  },
  {
    title: '创建时间',
    dataIndex: 'date_joined',
    key: 'date_joined',
  },
  {
    title: '最近登录',
    dataIndex: 'last_login',
    key: 'last_login',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
]
export default {
  name: "UserManage",
  data() {
    let self = this
    return {
      columns,
      tabledata: [],
      pagination: {
        current: 1,
        pageSize: 10,
        onChange: (page) => self.changePage(page),
        total: 0
      },
      addOnOff: false,
      editOnOff: false
    }
  },
  created() {
    this.getUserData()
  },
  methods:{
    getUserData(){
      getUser().then(res=>{
        this.tabledata = res
      })
    }
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
}

.tableBar {
  padding: 10px 0;
  display: flex;
}

.table-warp {
  padding: 0 10px;

  .tablebox {
    background-color: #ffffff;
  }

  .action {
    width: 100%;
    display: flex;

    .btn {
      margin: 0 8px;
    }
  }
}

.addForm {
  font-size: 16px;
  line-height: 1.2;
}

</style>