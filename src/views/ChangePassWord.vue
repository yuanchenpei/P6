<template>
  <div class="changePassWord">
    <div class="title">修改密码</div>
    <div class="content">
      <div class="formbox">
        <a-form-model ref="ruleForm" :model="ruleForm">
          <a-form-model-item label="用户名" v-bind="layout">
            <a-input v-model="ruleForm.username" disabled>
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="原始密码" v-bind="layout">
            <a-input-password v-model="ruleForm.password" @change="()=>{this.passwordHelp = ''}" placeholder="输入密码">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input-password>
            <div slot="help" class="help">{{ passwordHelp }}</div>
          </a-form-model-item>
          <a-form-model-item label="新密码" v-bind="layout">
            <a-input-password v-model="ruleForm.newpwd" @change="()=>{this.newpwdHelp = ''}" placeholder="输入新密码">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input-password>
            <div slot="help" class="help">{{ newpwdHelp }}</div>
          </a-form-model-item>
          <a-form-model-item label="确认新密码" v-bind="layout">
            <a-input-password v-model="ruleForm.confirmpwd" @change="()=>{this.confirmpwdHelp = ''}"
                              placeholder="确认新密码">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input-password>
            <div slot="help" class="help">{{ confirmpwdHelp }}</div>
          </a-form-model-item>
          <a-form-model-item class="btnBox">
            <a-button type="primary" @click="submitForm()">
              确认
            </a-button>
            <a-button style="margin-left: 10px" @click="resetForm()">
              清空
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import {editPass} from "@/utils/api";

export default {
  name: "ChangePassWord",
  data() {
    return {
      ruleForm: {
        username: sessionStorage.username,
        password: '',
        newpwd: '',
        confirmpwd: '',
        user_id: sessionStorage.user_id,
      },
      passwordHelp: '',
      newpwdHelp: '',
      confirmpwdHelp: '',
      layout: {
        labelCol: {span: 4},
        wrapperCol: {span: 20},
      },
    }
  },
  methods: {
    submitForm() {
      if (!this.ruleForm.password) {
        this.passwordHelp = '密码不能为空'
      }
      if (!this.ruleForm.newpwd) {
        this.newpwdHelp = '新密码不能为空'
      }
      if (!this.ruleForm.confirmpwd) {
        this.confirmpwdHelp = '请再次确认密码'
      } else if (this.ruleForm.newpwd != this.ruleForm.confirmpwd) {
        this.confirmpwdHelp = '两次密码输入不一致'
      } else {
        editPass(this.ruleForm).then(res => {
          this.$message.success(res.message)
          this.resetForm()
        })
      }
    },
    resetForm() {
      this.ruleForm.password = ''
      this.ruleForm.newpwd = ''
      this.ruleForm.confirmpwd = ''
      this.passwordHelp = ''
      this.newpwdHelp = ''
      this.confirmpwdHelp = ''
    },
  },
}
</script>

<style scoped lang="less">
.changePassWord {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    margin: 10px;
    padding: 10px;
    flex: 1;
    background-color: #ffffff;
  }

  .formbox {
    width: 500px;
    padding-top: 80px;
    margin: auto;
  }
}

.help {
  color: #ff4d4f;
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

.btnBox {
  display: flex;
  justify-content: center;
}
</style>