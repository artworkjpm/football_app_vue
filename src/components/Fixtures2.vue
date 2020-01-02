<template>
  <div>
    {{fixtures}}
    {{fireLog()}}
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.fixtures);
  },
  props: ["fixtures"],
  computed: {
    getFixtures: function() {
      return this.fixtures;
    }
  },
  methods: {
    fireLog() {
      console.log("firelog: ", this.$props.fixtures);
    }
  }
};
</script>
