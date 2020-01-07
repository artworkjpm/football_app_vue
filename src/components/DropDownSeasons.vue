<template>
  <div class="col-6 col-sm-12">
    <b-form-group title="Season Year">
      <b-form-select size="sm" v-model="currentYear" :options="optionSeason" @change="onChange()" />
    </b-form-group>
  </div>
</template>
<script>
import options from "./DropDownOptions";
export default {
  name: "DropDownSeasons",
  data() {
    return {
      currentYear: Number,
      optionSeason: options.optionYears
    };
  },
  props: {
    year: [String, Number]
  },
  methods: {
    onChange() {
      const seasonObj = {
        year: this.$data.currentYear
      };
      this.$emit("currentYear", seasonObj);
    }
  },

  watch: {
    year() {
      this.currentYear = this.$props.year;
    }
  },
  created() {
    this.currentYear = this.$props.year;
  }
};
</script>