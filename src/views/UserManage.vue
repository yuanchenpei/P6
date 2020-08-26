<template>
  <div>
    <div class="commandBar">
      <div class="title">用户管理</div>
    </div>
    <div class="table-warp">
      <div class="tableBar">
        <a-button class="btn" @click="addUser">新增</a-button>
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
    <a-modal v-model="editOnOff" title="编辑标签" width="600px" :footer="null">
      <div class="editForm" v-if="editOnOff">
        <a-form-model layout="horizontal">
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="用户名:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-input v-model="editForm.username" allowClear></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="用户密码:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-input v-model="editForm.password" disabled></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="工号:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-input v-model="editForm.staffid" allowClear></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="邮箱:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-input v-model="editForm.email" allowClear></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="允许登录:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-switch v-model="editForm.is_staff" checked-children="允许" un-checked-children=限制 default-checked/>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否激活:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-switch v-model="editForm.is_active" checked-children="激活" un-checked-children="停用" default-checked/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-button class="formBtn">保存</a-button>
          </a-row>
        </a-form-model>
        <div class="formBox">
          <h5>角色分配</h5>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="角色名称:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-select
                    style="width: 100%"
                    class="selector"
                    v-model="editForm.roles[0]"
                >
                  <a-select-option v-for="role in roleList" :value='role.id' :key="role.id">
                    {{ role.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-button class="formBtn" @click="handlChange('role')">修改</a-button>
          </a-row>
        </div>
        <div class="formBox">
          <h5>产品分配</h5>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="产品名称:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-select
                    style="width: 100%"
                    class="selector"
                    v-model="editForm.product[0]"
                >
                  <a-select-option v-for="product in productList" :value="product.id" :key="product.id">
                    {{ product.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-button class="formBtn" @click="handlChange('product')">修改</a-button>
          </a-row>
        </div>
      </div>
    </a-modal>
    <a-modal v-model="addOnOff" title="新增" @ok="handleAdd" width="600px">
      <div class="addForm" v-if="addOnOff">
        <a-form-model layout="horizontal">
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="用户名:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-input v-model="addForm.username" allowClear></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="用户密码:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-input v-model="addForm.password" allowClear></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="工号:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-input v-model="addForm.staffid" allowClear></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="邮箱:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-input v-model="addForm.email" allowClear></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="允许登录:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-switch v-model="addForm.is_staff" checked-children="允许" un-checked-children=限制 default-checked/>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否激活:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
                <a-switch v-model="addForm.is_active" checked-children="激活" un-checked-children="停用" default-checked/>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {getUser, addUser, getProduct, getRole, editUser, delUser, weiBoDeleteQuery} from '@/utils/api'

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
      editOnOff: false,
      addForm: {
        username: "",
        password: "",
        staffid: "",
        email: "",
        is_active: true,
        is_staff: true
      },
      editForm: null,
      productList: [],
      roleList: [],
      productID: "",
      roles: "",
    }
  },
  created() {
    this.getUserData()
    getProduct().then(res => {
      this.productList = res || []
    })
    getRole().then(res => {
      this.roleList = res || []
    })
  },
  methods: {
    getUserData() {
      getUser().then(res => {
        this.tabledata = res
      })
    },
    addUser() {
      this.addOnOff = true
    },
    handleAdd() {
      if (!this.addForm.username || !this.addForm.password) {
        this.$message.error('用户名和密码必填')
      } else {
        addUser(this.addForm).then(res => {
          this.$message(res.message)
        })
      }
    },
    edit(data) {
      this.editForm = data
      this.editOnOff = true
    },
    handlChange(method) {
      editUser(
          this.editForm.id,
          method,
          method === 'role' ? {roles: this.editForm.roles[0]} : {product: this.editForm.product[0]}
      ).then(res => {
        this.getUserData()
      })
    },
    del(data){
      this.$confirm({
        title: '确定删除该用户',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          delUser(data.id).then(res => {
            this.$message.success(res.message)
            this.getUserData()
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
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

.editForm {
  font-size: 16px;
  line-height: 1.2;

  /deep/ .ant-form-item {
    margin-bottom: 12px;
  }

  .formBtn {
    display: block;
    margin: auto;
  }
}

.formBox {
  & > h5 {
    text-align: center;
    margin-bottom: 12px;
  }

  padding: 15px 0;
  border-top: 1px solid #889399;
}

</style>