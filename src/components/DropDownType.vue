<template>
  <div class="col">
    <b-form-group label="Season">
      <b-form-select v-model="year" :options="optionYears" @change="onChange()" />
    </b-form-group>
    <b-form-group label="Type of games">
      <b-form-select v-model="standingType" :options="options" @change="onChange()" />
    </b-form-group>
  </div>
</template>
<script>
export default {
  name: "DropDownType",
  data() {
    return {
      standingType: "TOTAL",
      options: [
        { value: "TOTAL", text: "Total" },
        { value: "HOME", text: "Home" },
        { value: "AWAY", text: "Away" }
      ],
      optionYears: [
        { value: "2019", text: "2019-20" },
        { value: "2018", text: "2018-19" },
        { value: "2017", text: "2017-18" }
      ]
    };
  },
  props: {
    year: [Function, Number, String]
  },
  methods: {
    onChange() {
      const typeObj = {
        standingType: this.$data.standingType,
        year: this.$props.year
      };
      this.$emit("standingType", typeObj);
    }
  }
};
</script>