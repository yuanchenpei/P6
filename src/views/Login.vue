<template>
    <div class="login">
        <canvas id="background" width="913" height="789"></canvas>
        <div class="login-window">
            <h4 class="title">舆情管理系统</h4>
            <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
                <a-input v-model="formInline.user" placeholder="用户名">
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
                </a-input>
                <a-input v-model="formInline.password" type="password" placeholder="密码">
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
                </a-input>
                <a-button
                        class="btn"
                        type="primary"
                        html-type="submit"
                        @click="handleSubmit"
                        :disabled="formInline.user === '' || formInline.password === ''"
                >
                    登录
                </a-button>
            </a-form-model>
        </div>
    </div>
</template>

<script>
  import {bg} from "../utils/bg"

  export default {
    name: "Login",
    data() {
      return {
        formInline: {
          user: '',
          password: '',
        },
      }
    },

    mounted() {
      bg()
    },
    methods: {
      handleSubmit() {
        this.$router.push('/')
      },
    }
  }
</script>

<style scoped lang="less">
    .login {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #background {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }

    .login-window {
        margin-top: -120px;
        width: 330px;
        background: #232526;
        background: -webkit-linear-gradient(to right, #414345, #232526);
        background: linear-gradient(to right, #414345, #232526);
        padding: 30px;
        border-radius: 6px;
        border: 1px solid #414345;
        color: #fff;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
        overflow: hidden;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-name: breathe;
        -webkit-animation-duration: 2700ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
    }

    @-webkit-keyframes breathe {
        0% {
            opacity: .8;
            box-shadow: 0 1px 3px 0 rgba(255, 255, 255, 0.1);
        }
        100% {
            opacity: 1;
            border: 1px solid rgba(59, 235, 235, .4);
            box-shadow: 0 1px 18px 0 rgba(59, 255, 255, 1);
        }
    }

    .title {
        text-align: center;
        color: #ffffff;
    }

    .btn {
        display: block;
        margin: 20px auto 0;
    }
</style>