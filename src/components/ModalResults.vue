<template>
  <div>
    <b-spinner label="Spinning" class="text-center" v-if="showSpinner"></b-spinner>
    <div v-if="!showSpinner">
      <table class="typeLegend small">
        <thead>
          <tr>
            <th
              class="alert-info text-center"
            >{{resultsFormated[0] && resultsFormated[0].competition}}</th>
            <th class="text-center">Pld: {{teamDetails.played}}</th>
            <th class="alert-success text-center">Won: {{teamDetails.won}}</th>
            <th class="alert-warning text-center">Drew: {{teamDetails.draw}}</th>
            <th class="alert-danger text-center">Lost: {{teamDetails.lost}}</th>
          </tr>
        </thead>
      </table>

      <table class="table-responsive table adjust" v-for="(res, i) in resultsFormated" :key="i">
        <thead>
          <tr>
            <th class="text-nowrap font-weight-normal">
              <span class="font-italic">{{res.competition}}</span>
              <br />
              {{ res.date}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr :class="getClassResult(res)">
            <td class="text-nowrap">
              <span class="text-right leftx" :class="getClass(res.home)">{{ res.home }}</span>
              <b-badge :class="getClassResult(res)">{{ res.score }}</b-badge>
              <span class="rightx" :class="getClass(res.away)">{{ res.away }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import getData from "../service/apiCalls";
import moment from "moment";
export default {
  data() {
    return {
      showSpinner: true,
      results: [],
      teamName: String,
      teamDetails: Object,
      resultsFormated: []
    };
  },
  name: "ModalResults",
  props: {
    teamId: [Function, Object]
  },

  methods: {
    getResults(teamId) {
      //console.log("getResults teamid: ", teamId);
      getData.getTeamResults
        .get(teamId.teamId + "/matches?status=FINISHED")
        .then(response => {
          this.results = response.data.matches;
          this.newArray(teamId);
        })
        .catch(error => console.log(error));
    },
    newArray(teamId) {
      let newArray = Array.from(this.$data.results, x => {
        return {
          competition: x.competition.name,
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY - HH:mm"),
          dateNative: x.utcDate,
          home: x.homeTeam.name,
          away: x.awayTeam.name,
          score: x.score.fullTime.homeTeam + " - " + x.score.fullTime.awayTeam,
          selectedTeam: this.$data.teamName,
          winner: x.score.winner
        };
      });

      newArray.sort((a, b) => {
        return new Date(b.dateNative) - new Date(a.dateNative);
      });
      this.resultsFormated = newArray;
      //console.log("resultsFormated:", this.resultsFormated);
      this.teamName = teamId.teamName;
      this.teamDetails = {
        played: teamId.played,
        won: teamId.won,
        draw: teamId.draw,
        lost: teamId.lost
      };
      this.showSpinner = false;
    },
    getClass(teamModal) {
      let teamClicked = this.$data.teamName;
      return {
        "font-weight-bold": teamClicked === teamModal
      };
    },
    getClassResult(res) {
      let teamClicked = this.$data.teamName;
      if (res.winner === "DRAW") {
        return "alert-warning";
      } else if (res.winner === "HOME_TEAM" && res.home === teamClicked) {
        return "alert-success";
      } else if (res.winner === "AWAY_TEAM" && res.away === teamClicked) {
        return "alert-success";
      } else {
        return "alert-danger";
      }
    }
  },

  beforeMount() {
    this.getResults(this.$props.teamId);
  }
};
</script>

<style>
</style>