<script>
import TopNav from "./components/TopNav.vue";
export default {
  name: "App",
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
