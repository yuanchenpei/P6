<template>
    <div class="home">
        <a-layout class="layoutWarp">
            <a-layout-header class="header">
                <div class="logo"></div>
                <div class="user">
                    <a-avatar size="large" icon="user"/>
                    <a-dropdown class="dropdown">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            Admin
                            <a-icon type="down"/>
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <div @click="logout">切换账号</div>
                            </a-menu-item>
                            <a-menu-item>
                                <div @click="logout">退出登录</div>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </a-layout-header>
            <a-layout class="layoutContent">
                <a-layout-sider class="sider">
                    <sideBar :sideData="list"></sideBar>
                </a-layout-sider>
                <a-layout>
                    <a-layout-content class="content">
                        <div class="contentInner">
                            <router-view></router-view>
                        </div>
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
  import sideBar from "../components/sideBar";

  export default {
    name: 'Home',
    data() {
      return {
        list: [
          {
            name: '功能菜单', type: "CC",
            children: [
              {name: '舆情总览', path: 'visualization'},
              {name: '官方微博舆情', path: 'visualilol'},
              {name: '舆情总览数据管理', path: 'publicOpinion'},
              {name: '平台微博数据管理', path: 'weibo'},
              {name: '舆情总览Excel', path: 'publicOpinionExcel'},
              {name: '平台微博Excel', path: 'weiboExcel'},
            ]
          },
          {
            name: '个人信息', type: "DD",
            children: [
              {name: '密码修改', path: 'changePassWord'}
            ]
          },
          {name: '用户管理', type: "AA", path: 'ss'},
          {name: '角色管理', type: 'BB', path: 'dd'},
          {name: '产品管理', type: 'EE', path: 'qq'},
          {name: '参数表维护', type: 'FF', path: 'paramsTable'},
        ]
      }
    },
    components: {
      sideBar
    },
    methods: {
      logout(){
        sessionStorage.clear()
        this.$router.push('/login')
      }
    }
  }
</script>
<style scoped lang="less">
    .home {
        min-height: 100vh;
    }

    .header {
        background-color: #232526;
        display: flex;
        justify-content: space-between;

        .user {
            display: flex;
            align-items: center;

            .dropdown {
                margin-left: 20px;
            }

            .ant-dropdown-link {
                color: #ffffff;
            }
        }
    }

    /deep/ .logout {
        color: #921515;
    }

    .layoutWarp {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .layoutContent {
        flex: 1;
    }

    .logo {
        padding: 10px;
    }

    .sider {
        background-color: #ffffff;
        user-select: none;
    }

    .content {

    }

    .contentInner {
        height: 100%;
    }
</style>
