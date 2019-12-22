<template>
  <div>
    <b-modal :id="'modalId' + i" v-for="(item,i) in standings" :key="'teamDetails'+ i">
      <p>{{item.team.name}}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalContent",
  props: {
    standings: {
      type: Array
    }
  }
};
</script>

<style>
</style>