<template>
  <div>
    <b-table responsive :items="clubInfo.squad" class="small"></b-table>
  </div>
</template>

<script>
export default {
  name: "ModalSquad",
  props: {
    clubInfo: [Object, Function]
  },

  beforeMount() {
    console.log("beforeMount: ", this.$props.clubInfo.squad);
  }
};
</script>

<style>
</style>