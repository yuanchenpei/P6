<template>
  <a-tree :load-data="onLoadData" :tree-data="treeData"/>
</template>

<script>
export default {
  name: "ParamsTree",
  data(){
    return{
      treeData:[
        { title: '英雄联盟端游', value: '01010000' },
        { title: '云顶之弈端游', value: '01020000' },
        { title: '符文之地传说', value: '01050000' },
      ]
    }
  },
  methods:{
    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: 'Child Node', key: `${treeNode.eventKey}-0` },
            { title: 'Child Node', key: `${treeNode.eventKey}-1` },
          ];
          this.treeData = [...this.treeData];
          resolve();
        }, 1000);
      });
    },
  }
}
</script>

<style scoped>

</style>