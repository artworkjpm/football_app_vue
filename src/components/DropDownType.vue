<template>
  <div class="col-6 col-sm-12">
    <b-form-group>
      <b-form-select size="sm" v-model="currentTypeOfGame" :options="options" @change="onChange()" />
    </b-form-group>
  </div>
</template>
<script>
export default {
  name: "DropDownType",
  data() {
    return {
      currentTypeOfGame: String,
      options: [
        { value: "TOTAL", text: "Total" },
        { value: "HOME", text: "Home" },
        { value: "AWAY", text: "Away" }
      ]
    };
  },
  props: {
    typeOfGame: String
  },
  methods: {
    onChange() {
      const typeObj = {
        standingType: this.$data.currentTypeOfGame
      };
      this.$emit("standingType", typeObj);
    }
  },
  created() {
    this.currentTypeOfGame = this.$props.typeOfGame;
  }
};
</script>