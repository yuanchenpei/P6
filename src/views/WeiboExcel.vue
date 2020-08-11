<template>
    <div class="contentBox">
        <div class="title">
            平台微博数据管理
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
            <a-table :columns="columns" :data-source="tabledata" rowKey="key">
                <div slot="action" class="action">
                    <a-button shape="circle" class="btn" icon="delete" type="danger" size="small" ghost/>
                    <a-button shape="circle" class="btn" icon="download" type="primary" size="small" ghost/>
                </div>
            </a-table>
        </div>
    </div>
</template>

<script>
  const columns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: '上传日期',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      scopedSlots: {customRender: 'action'},
    },
  ]
  const tabledata = []
  for (let i = 0; i < 3; i++) {
    tabledata.push({
      key: i,
      fileName: '平台微博 最新话题.xlsx',
      uploadDate: '2020-08-08 11:57',
    })
  }
  export default {
    name: "WeiboExcel",
    data() {
      return {
        fileList: [{
          name: "test1.xlsx",
          size: 14238,
          type: "image/png",
          uid: "vc-upload-1597026528745-2",
          webkitRelativePath: ""
        }],
        uploading: false,
        columns,
        tabledata
      }
    },
    methods: {
      handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
      },
      beforeUpload(file) {
        console.log(file)
        this.fileList = [...this.fileList, file];
        return false;
      },
      handleUpload() {
        this.uploading = true;
        setTimeout(() => {
          this.fileList = [];
          this.uploading = false;
          this.$message.success('文件上传成功');
        }, 4000)
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