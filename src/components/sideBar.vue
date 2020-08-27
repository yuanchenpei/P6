<template>
    <a-menu
            theme="light"
            mode="inline"
            :default-open-keys="[sideData[0].name]"
            :default-selected-keys="activePath"
    >
        <template v-for="item in sideData">
            <a-menu-item v-if="!item.children" :key="item.name" @click="jumpTo(item)">
                <a-icon :type="iconType[item.type]"/>
                <span>{{ item.name }}</span>
            </a-menu-item>
            <a-sub-menu :key="item.name" v-else>
                <span slot="title"><a-icon :type="iconType[item.type]"/><span>{{item.name}}</span></span>
                <a-menu-item v-for="innerItem in item.children" :key="innerItem.name" @click="jumpTo(innerItem)">
                    {{innerItem.name}}
                </a-menu-item>
            </a-sub-menu>
        </template>
    </a-menu>
</template>

<script>
  const iconType = {
    AA: "team",
    BB: "crown",
    CC: "file-search",
    DD:"user",
    EE:"appstore",
    FF:"control",
    GG:"container"
  }
  export default {
    props: {
      sideData: {
        type: Array,
        default: () => []
      }
    },
    name: "sideBar",
    data() {
      return {
        iconType :iconType,
        activePath:[]
      }
    },
    methods: {
      jumpTo(item) {
        this.$router.push(item.path).catch(err => {})
      }
    },
    mounted() {
      const pathName = this.$route.name.toLowerCase()
        this.sideData[0].children.map(i=>{
        let path=i.path.toLowerCase()
        if(path===pathName){
          this.activePath.push(i.name)
        }
      })
    }

  }
</script>

<style scoped>

</style>