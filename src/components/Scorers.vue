<template>
  <div class="row">
    <div>
      <div class="row" style="padding: 0 15px;">
        <div class="col-12">
          <b-form-group title="League">
            <b-form-select v-model="league" :options="optionLeagues" @change="onChange()" />
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group title="Season">
            <b-form-select v-model="year" :options="optionYears" @change="onChange()" />
          </b-form-group>
        </div>
      </div>
    </div>
    <div class="col">
      <b-spinner label="Spinning" class="text-center" v-if="showSpinner"></b-spinner>
      <div v-if="!showSpinner">
        <table class="small table-responsive table">
          <thead>
            <tr class="alert-info">
              <th></th>
              <th>Player</th>
              <th>Goals</th>
              <th>Team</th>
            </tr>
          </thead>
          <tr v-for="(item, i) in scorers.scorers" :key="i">
            <td class="text-nowrap">{{i +1}}.</td>
            <td class="text-nowrap">{{item.player.name}}</td>
            <td class="text-nowrap">{{item.numberOfGoals}}</td>
            <td class="text-nowrap">{{item.team.name}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import getData from "../service/apiCalls";
import leagues from "./LeagueListings";
export default {
  name: "Scorers",
  data() {
    return {
      showSpinner: true,
      year: 2019,
      league: "PL",
      optionLeagues: leagues,
      optionYears: [
        { value: "2019", text: "2019-20" },
        { value: "2018", text: "2018-19" },
        { value: "2017", text: "2017-18" }
      ],
      scorers: []
    };
  },
  methods: {
    getScorers() {
      this.showSpinner = true;
      getData.getLeagueData
        .get(this.league + "/scorers?season=" + this.year + "&limit=50")
        .then(response => {
          this.scorers = response.data;
          //console.log("scorers: ", this.scorers);
          this.showSpinner = false;
        })
        .catch(error => console.log(error));
    },
    onChange() {
      this.getScorers();
    }
  },
  created() {
    this.getScorers();
  }
};
</script>
