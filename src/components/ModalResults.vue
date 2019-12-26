<template>
  <div>
    <table class="typeLegend small">
      <thead>
        <tr>
          <th class="alert-success text-center">Won</th>
          <th class="alert-warning text-center">Drew</th>
          <th class="alert-danger text-center">Lost</th>
        </tr>
      </thead>
    </table>

    <table class="table-responsive table adjust" v-for="(res, i) in resultsFormated" :key="i">
      <thead>
        <tr>
          <th class="text-nowrap font-weight-normal font-italic">{{ res.date}}</th>
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
    teamName: String
  },

  methods: {
    newArray() {
      let newArray = Array.from(this.$props.results, x => {
        return {
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY - HH:mm"),
          home: x.homeTeam.name,
          away: x.awayTeam.name,
          score: x.score.fullTime.homeTeam + " - " + x.score.fullTime.awayTeam,
          selectedTeam: this.$props.teamName,
          winner: x.score.winner
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
    },
    getClassBadge(res) {
      let teamClicked = this.$props.teamName;
      if (res.winner === "DRAW") {
        return "badge-warning";
      } else if (res.winner === "HOME_TEAM" && res.home === teamClicked) {
        return "badge-success";
      } else if (res.winner === "AWAY_TEAM" && res.away === teamClicked) {
        return "badge-success";
      } else {
        return "badge-danger";
      }
    }
  },

  created() {
    this.newArray();
  }
};
</script>

<style>
</style>