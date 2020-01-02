<template>
  <div class="col">
    <b-form-group label="League">
      <b-form-select v-model="league" :options="optionLeagues" @change="onChange()" />
    </b-form-group>
    <b-form-group label="Season">
      <b-form-select v-model="currentYear" :options="optionYears" @change="onChange()" />
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
      league: "PL",
      currentYear: Number,
      standingType: "TOTAL",
      optionLeagues: [
        { value: "PL", text: "Premier League" },
        { value: "PD", text: "Primera Division" }
      ],
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
        league: this.$data.league,
        standingType: this.$data.standingType,
        year: this.$data.currentYear
      };
      this.$emit("standingType", typeObj);
    }
  },
  created() {
    this.currentYear = this.$props.year;
  }
};
</script>