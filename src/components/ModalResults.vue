<template>
  <div>
    <table class="typeLegend small">
      <thead>
        <tr>
          <th class="alert-info text-center">{{resultsFormated[0].competition}}</th>
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
          <th class="text-nowrap">
            <span class="text-right font-weight-normal font-italic">
              {{res.competition}}
              <br />
              {{ res.date}}
            </span>
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
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      resultsFormated: []
    };
  },
  name: "ModalResults",
  props: {
    results: Array,
    teamName: String,
    teamDetails: Object
  },

  methods: {
    newArray() {
      console.log("results: ", this.$props.results);

      let newArray = Array.from(this.$props.results, x => {
        return {
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY - HH:mm"),
          home: x.homeTeam.name,
          away: x.awayTeam.name,
          score: x.score.fullTime.homeTeam + " - " + x.score.fullTime.awayTeam,
          selectedTeam: this.$props.teamName,
          winner: x.score.winner,
          competition: x.competition.name
        };
      });
      return (this.resultsFormated = newArray);
    },
    getClass(teamModal) {
      let teamClicked = this.$props.teamName;
      return {
        "font-weight-bold": teamClicked === teamModal
      };
    },
    getClassResult(res) {
      let teamClicked = this.$props.teamName;
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
    this.newArray();
  }
};
</script>

<style>
</style>