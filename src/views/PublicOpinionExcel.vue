<template>
  <div class="contentBox">
    <div class="title">
      舆情总览数据管理
    </div>
    <div class="upload">
      <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
        <a-button>
          <a-icon type="file-excel"/>
          导入文件
        </a-button>
      </a-upload>
      <a-button
          class="uploadBtn"
          type="primary"
          v-show="!(fileList.length === 0)"
          :loading="uploading"
          @click="handleUpload"
      >
        {{ uploading ? '正在上传' : '开始上传' }}
      </a-button>
    </div>
    <div class="table-warp">
      <a-table
          :columns="columns"
          :data-source="tabledata"
          rowKey="id"
          :pagination="pagination"
      >
        <div slot="action" slot-scope="text,record" class="action">
          <a-button @click="del(record)" shape="circle" class="btn" icon="delete" type="danger" size="small" ghost/>
          <a-button @click="down(record)" shape="circle" class="btn" icon="download" type="primary" size="small" ghost/>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import {getFileList, upLoadFile, deleteFile, downLoadFile} from "@/utils/api";

const columns = [
  {
    title: '文件名',
    dataIndex: 'fileName',
    key: 'fileName',
  },
  {
    title: '上传日期',
    dataIndex: 'dateTime',
    key: 'uploadDate',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
]
export default {
  name: "PublicOpinionExcel",
  data() {
    let self = this
    return {
      fileList: [],
      uploading: false,
      columns,
      tabledata: [],
      pagination: {
        current: 1,
        pageSize: 10,
        onChange: (page) => self.changePage(page),
        total: 0
      },
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
    getList() {
      const params = {
        page: this.pagination.current,
        page_size: this.pagination.pageSize,
        types: 2,
      }
      getFileList(params).then(res => {
        this.tabledata = res.data.dataList
      })
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleUpload() {
      this.uploading = true
      const {fileList} = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('myfiles', file);
      });
      upLoadFile(formData).then(res => {
        if (res.code == 0) {
          this.$message.success(res.message)
          this.fileList = []
          this.getList()
        } else {
          this.$message.error(res.message)
        }
        this.uploading = false
      })
    },
    del(val) {
      const params = {
        fid: val.id,
        types: 2
      }
      deleteFile(params).then(res => {
        if (res.code == 0) {
          this.$message.success(res.message)
          this.getList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    down(val) {
      const params = {
        pid: val.id,
        types: 2
      }
      downLoadFile(params).then(res => {
        const i = res,
            s = new Blob([i]);
        if ("download" in document.createElement("a")) {
          const t = document.createElement("a");
          t.download = val.fileName, t.style.display = "none", t.href = URL.createObjectURL(s),
              document.body.appendChild(t), t.click(), URL.revokeObjectURL(t.href),
              document.body.removeChild(t)
        } else navigator.msSaveBlob(s, val.fileName)
      })
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.title {
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 -1px 5px 0 #aaaaaa;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 20px;
  line-height: 32px;
  font-weight: bold;
}

.upload {
  margin: 10px;
  padding: 10px 20px;
  background-color: #ffffff;

  .uploadBtn {
    display: block;
    margin: 15px auto 0;
  }

  /deep/ .ant-upload-list-item {
    height: 30px;
    margin-top: 8px;
    font-size: 18px;
  }

  /deep/ .ant-upload-list-item-info .anticon-paper-clip {
    font-size: 18px;
    top: 6px;
  }

  /deep/ .ant-upload-list-item-card-actions .anticon {
    font-size: 18px;
    color: #ff4d4f;
  }
}

.table-warp {
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  background-color: #ffffff;

  .action {
    width: 100%;
    display: flex;

    .btn {
      margin-right: 25px;
    }
  }
}
</style>