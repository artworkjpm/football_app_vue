<template>
  <div class="row">
    <div class="col-6 col-sm-12">
      <b-form-group>
        <b-form-select size="sm" v-model="currentYear" :options="optionYears" @change="onChange()" />
      </b-form-group>
    </div>
    <div class="col-6 col-sm-12">
      <b-form-group>
        <b-form-select
          size="sm"
          v-model="currentTypeOfGame"
          :options="options"
          @change="onChange()"
        />
      </b-form-group>
    </div>
  </div>
</template>
<script>
export default {
  name: "DropDownSeasons",
  data() {
    return {
      currentYear: Number,
      optionYears: [
        { value: "2019", text: "2019-20" },
        { value: "2018", text: "2018-19" },
        { value: "2017", text: "2017-18" }
      ]
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
      this.$emit("standingType", seasonObj);
    }
  },
  created() {
    this.currentYear = this.$props.year;
  }
};
</script>