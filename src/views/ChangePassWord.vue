<template>
    <div class="changePassWord">
        <div class="title">修改密码</div>
        <div class="content">
            <div class="formbox">
                <a-form-model ref="ruleForm" :model="ruleForm" v-bind="layout">
                    <a-form-model-item has-feedback label="旧密码" prop="oldPass">
                        <a-input v-model="ruleForm.oldPass" type="password" autocomplete="off"/>
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="新密码" prop="newPass">
                        <a-input v-model="ruleForm.newPass" type="password" autocomplete="off"/>
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="确认新密码" prop="newPassAgain">
                        <a-input v-model="ruleForm.newPassAgain" type="password" autocomplete="off"/>
                    </a-form-model-item>
                    <a-form-model-item class="btnBox">
                        <a-button type="primary" @click="submitForm('ruleForm')">
                            确认
                        </a-button>
                        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
                            清空
                        </a-button>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ChangePassWord",
    data() {
      return {
        ruleForm: {
          oldPass: '',
          newPass: '',
          newPassAgain: '',
        },
        layout: {
          labelCol: {span: 4},
          wrapperCol: {span: 12},
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          log(valid)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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