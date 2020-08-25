<template>
  <div>
    <div class="commandBar">
      <div class="title">参数表维护</div>
    </div>
    <div class="table-warp">
      <div class="tableBar">
        <a-button class="btn" @click="addArgments">新增</a-button>
      </div>
      <a-table
          class="tablebox"
          :columns="columns"
          :data-source="tabledata"
          rowKey="index"
          :pagination="pagination"
      >
        <div slot="action" slot-scope="text,record" class="action">
          <a-button @click="edit(record)" shape="circle" class="btn" icon="form" type="primary" size="small" ghost/>
        </div>
      </a-table>
    </div>
    <a-modal v-model="editOnOff" title="编辑标签" width="500px">
      <ParamsTree v-if="editOnOff" :propsData="treeData" :productData="productData"></ParamsTree>
    </a-modal>
    <a-modal v-model="addOnOff" title="新增" @ok="handleAdd" width="400px">
      <div class="addForm">
        <a-form-model layout="horizontal">
          <a-form-model-item label="产品名称:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
            <a-select style="width: 100%"
                      v-model="addData.product">
              <a-select-option v-for="product in productList" :key="product.id">
                {{ product.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="板块名称:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
            <a-select style="width: 100%"
                      v-model="addData.argname"
                      @change="i=>{addData.argno= (i=='yqOverview'?'01':'02')}">
              <a-select-option value="yqOverview">总览板块</a-select-option>
              <a-select-option value="weiboPlate">微博板块</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="分类名称:" :label-col="{span: 6}" :wrapper-col="{span: 16}">
            <a-input v-model="addData.catevalue" allowClear></a-input>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {getArgments, argment, delArgment, getProduct} from '@/utils/api'
import ParamsTree from "@/components/ParamsTree";

const columns = [
  {
    title: '序号',
    customRender: (t, r, i) => {
      return i + 1
    },
    width: 80,
  },
  {
    title: '产品名称',
    dataIndex: 'product',
    key: 'productproduct',
  },
  {
    title: '板块名称',
    dataIndex: 'argType',
    key: 'argType',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
]
const argType = {
  yqOverview: "总览板块",
  weiboPlate: "微博板块"
}
export default {
  name: "ParamsTable",
  data() {
    let self = this
    return {
      columns,
      argType,
      tabledata: [],
      pagination: {
        current: 1,
        pageSize: 10,
        onChange: (page) => self.changePage(page),
        total: 0
      },
      addOnOff: false,
      editOnOff: false,
      productList: [],
      addData: {
        catelevel: '1',
        argname: "",
        argno: "",
        catedesc: "",
        cateparent: null,
        catevalue: "",
        product: '',
      },
      treeData: [],
      productData:null
    }
  },
  components: {
    ParamsTree
  },
  created() {
    this.getList()
    getProduct().then(res => this.productList = res)
  },
  methods: {
    getList() {
      getArgments().then(res => {
        let data = res.data.dataList || []
        data.map((item, i) => {
          item.index = i
          item.argType = this.argType[item.argname]
        })
        this.tabledata = data
      })
    },
    addArgments() {
      this.addOnOff = true
    },
    handleAdd() {
      argment(this.addData).then(res => {
        this.addOnOff = false
        this.getList()
      })
    },
    edit(item) {
      const params = {
        argname: item.argname,
        product: item.product,
        type: 'retrieve'
      }
      getArgments(params).then(res => {
        let resData = res || []
        let treeData = resData.map(item => {
          let obj = {}
          obj.title = item.catevalue
          obj.key = item.id
          obj.data = item
          obj.scopedSlots = {title: 'custom'}
          return obj
          // item.scopedSlots = {title: 'custom'}
        })
        this.treeData = treeData
        this.editOnOff = true
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
/deep/ .ant-modal-body{
  max-height: 560px;
  overflow-y: scroll;
}

</style>