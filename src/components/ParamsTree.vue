<template>
  <div>
    <a-button @click="addFirst">添加一级分类</a-button>
    <a-tree
        blockNode
        @expand="onExpand"
        @select="onSelect"
        :load-data="onLoadData"
        :tree-data="treeData">
      <template slot="custom" slot-scope="item" class="custombox">
        <span>{{ item.title }}</span>
        <span class="tool">
        <a-icon class="icon" v-if="item.data.catelevel<3" @click="()=>addNode(item)" type="plus-circle"/>
        <a-icon class="icon" @click="()=>delNode(item)" type="minus-square"/>
        <a-icon class="icon" @click="()=>editNode(item)" type="form"/>
      </span>
      </template>
    </a-tree>

    <a-modal
        title="添加下级标签"
        okText="添加"
        width="360px"
        :visible="addTage"
        :confirm-loading="confirmLoading"
        @ok="handleAdd"
        @cancel="handleCancel"
    >
      <a-input v-model="addtageName"></a-input>
    </a-modal>
    <a-modal
        title="修改标签"
        okText="修改"
        width="360px"
        :visible="editTage"
        :confirm-loading="confirmLoading"
        @ok="handleEdit"
        @cancel="handleCancel"
    >
      <a-input v-model="editTageName"></a-input>
    </a-modal>
  </div>
</template>

<script>
import {getChildren, argment, delArgment, updateArgment} from "@/utils/api";

export default {
  name: "ParamsTree",
  props: {
    propsData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      addTage: false,
      editTage: false,
      confirmLoading: false,
      addtageName: '',
      editTageName: '',
      treeData: this.propsData,
      selectData: null,
      selectNode: null,
    }
  },
  methods: {
    onLoadData(treeNode) {
      const _this = this
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        getChildren(treeNode.dataRef.key).then(res => {
          let tree = this.filterRes(res)
          treeNode.dataRef.children = tree
          _this.treeData = [...this.treeData];
        })
        resolve();
      });
    },

    filterRes(arr = []) {
      let treeDate = arr.map(item => {
        let obj = {}
        obj.title = item.catevalue
        obj.key = item.id
        obj.data = item
        obj.scopedSlots = {title: 'custom'}
        return obj
      })
      return treeDate
    },
    addFirst() {
      this.addTage = true
      this.selectData = this.treeData[0].data
      this.selectData.addFirst = true
      console.log(this.selectData)
    },
    addNode(data) {
      this.addTage = true
      this.selectData = data.data
    },
    delNode(data) {
      this.$confirm({
        title: '确定删除该分类及其子分类？',
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          delArgment(data.data.id).then(res => {
            if(data.data.catelevel === '1'){
              this.treeData = this.filterRes(res)
            }else {
              this.parentNode.children = this.filterRes(res)
            }
            this.treeData = [...this.treeData];
            this.handleCancel()
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    editNode(data) {
      this.editTage = true
      this.editTageName = data.title
    },
    handleAdd() {
      if (this.addtageName === '') {
        this.$message.error('内容不能为空')
      } else {
        let level
        if (this.selectData.addFirst) {
          level = 1
          this.selectData.catecode = null
        } else {
          if (this.selectData.catelevel < 3) {
            level = Number(this.selectData.catelevel) + 1
          }
        }

        const params = {
          product: this.selectData.product,
          argno: this.selectData.argno,
          argname: this.selectData.argname,
          catevalue: this.addtageName,
          cateparent: this.selectData.catecode,
          catelevel: level,
          catedesc: '',
        }
        argment(params).then(res => {
          if (this.selectData.addFirst) {
            this.treeData = this.filterRes(res)
          } else {
            this.selectNode.children = this.filterRes(res)
          }
          this.treeData = [...this.treeData];
          this.handleCancel()
        })
      }
    },
    handleEdit() {
      updateArgment(this.selectData.id, {catevalue: this.editTageName}).then(res => {
        this.selectNode.title = res.catevalue
        this.treeData = [...this.treeData];
        this.editTage = false
      })
    },
    handleCancel() {
      this.editTage = false
      this.addTage = false
      this.addtageName = ''
      this.editTageName = ''
    },
    onExpand() {

    },
    onSelect(selectedKeys, e) {
      console.log(selectedKeys, e)
      this.parentNode = e.node.$parent.dataRef
      this.selectNode = e.node.dataRef
      this.selectData = e.node.dataRef.data
    },
  }
}
</script>

<style scoped lang="less">

.ant-tree {
  font-size: 18px;

}

/deep/ .ant-tree-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.tool {
  .icon {
    margin-right: 10px;
  }
}

</style>