<template>
  <div class="breadcrumb">
    <span v-for="(item,index) in current" :key="index">
      {{item.meta.name}}
      <span v-if="!index==current.length-1">/</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: []
    };
  },
  mounted() {
    this.current = this.$route.matched;
  }
};
</script>

<style lang="less" scoped>
.breadcrumb {
  margin: 15px 0px;
}
</style>