<template>
    <div class="notfound">
        <h2 class="trips"><span>{{timeout}} 秒</span> 后返回首页。</h2>
        <div class="image"></div>
    </div>
</template>

<script>
  export default {
    name: "Page404",
    data() {
      return {
        timeout: 3,
      }
    },
    mounted() {
      const timer=setInterval(()=>{
        this.timeout --
        if(this.timeout<=0){
          clearInterval(timer)
          this.$router.replace('/')
        }
      },1000)
    }
  }
</script>

<style scoped lang="less">
    .notfound {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(0deg, #3f3e43, #696a70, #969aa1, #c6cdd5);
        .image{
            width: 60%;
            height: 50vh;
            background-image: url("../assets/404.svg");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
    .trips {
        margin-top: 30px;
        span{
            color: brown;
        }
    }
</style>