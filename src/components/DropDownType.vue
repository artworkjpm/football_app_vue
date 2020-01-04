<template>
  <div style="width: 398px">
    <div class="row" style="padding: 0 15px;">
      <div class="col-12">
        <b-form-group>
          <b-form-select v-model="currentLeague" :options="optionLeagues" @change="onChange()" />
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group>
          <b-form-select v-model="currentYear" :options="optionYears" @change="onChange()" />
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group>
          <b-form-select v-model="currentTypeOfGame" :options="options" @change="onChange()" />
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
import leagues from "./LeagueListings";
export default {
  name: "DropDownType",
  data() {
    return {
      currentLeague: String,
      currentYear: Number,
      currentTypeOfGame: String,
      optionLeagues: leagues,
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
    year: [String, Number],
    league: String,
    typeOfGame: String
  },
  methods: {
    onChange() {
      const typeObj = {
        league: this.$data.currentLeague,
        standingType: this.$data.currentTypeOfGame,
        year: this.$data.currentYear
      };
      this.$emit("standingType", typeObj);
    }
  },
  created() {
    this.currentYear = this.$props.year;
    this.currentLeague = this.$props.league;
    this.currentTypeOfGame = this.$props.typeOfGame;
  }
};
</script>