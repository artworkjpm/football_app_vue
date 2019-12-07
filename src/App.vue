<script>
import TopNav from "./components/TopNav.vue";
export default {
  name: "app",
  components: {
    TopNav
  }
};
</script>

<template>
  <div id="app">
    <TopNav />
     <router-view></router-view>
  </div>
</template>


<style lang="scss">
</style>
