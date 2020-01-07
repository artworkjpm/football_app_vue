<template>
  <div>
    <b-form-group>
      <b-form-select
        size="sm"
        v-model="currentLeague"
        :options="optionLeagues"
        @change="onChange()"
      />
    </b-form-group>
  </div>
</template>
<script>
import options from "./DropDownOptions";
export default {
  name: "LeagueDropDown",
  data() {
    return {
      currentLeague: String,
      optionLeagues: options.leagues
    };
  },
  props: {
    league: String
  },
  methods: {
    onChange() {
      const leagueObj = {
        league: this.$data.currentLeague
      };
      this.$emit("onLeagueChange", leagueObj);
    }
  },
  watch: {
    league() {
      this.currentLeague = this.$props.league;
    }
  },
  created() {
    this.currentLeague = this.$props.league;
  }
};
</script>