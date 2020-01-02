<template>
  <div>
    <b-spinner label="Spinning" class="text-center" v-if="showSpinner"></b-spinner>
    <div v-if="!showSpinner">
      <table class="table-responsive table adjust" v-for="(item, i) in teamFixtures" :key="i">
        <thead>
          <tr class="alert-info">
            <th class="text-nowrap font-weight-normal font-italic">
              {{item.competition.name}}
              <br />
              {{getDateFormat(item.utcDate).fullDate}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-nowrap">
              <span
                class="text-right leftx"
                :class="getBold(item.homeTeam.name)"
              >{{ item.homeTeam.name }}</span>
              <b-badge>{{ getDateFormat(item.utcDate).time }}</b-badge>
              <span class="rightx" :class="getBold(item.awayTeam.name)">{{ item.awayTeam.name }}</span>
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
      teamFixtures: Array,
      teamName: String
    };
  },
  props: {
    teamId: [Function, Object]
  },
  methods: {
    getTeamFixtures(teamId) {
      //console.log("GET TEAM FIXTURES teamid: ", teamId);
      this.showSpinner = true;
      getData.getTeamResults
        .get(teamId.teamId + "/matches?status=SCHEDULED")
        .then(response => {
          this.teamFixtures = response.data.matches;
          this.teamName = teamId.teamName;
          this.showSpinner = false;
          //console.log("this.teamFixtures: ", this.teamFixtures);
        })
        .catch(error => console.log(error));
    },
    getDateFormat(date) {
      return {
        fullDate: moment(date).format("ddd, MMMM Do YYYY"),
        time: moment(date).format("HH:mm")
      };
    },
    getBold(team) {
      const teamSelected = this.$data.teamName;
      if (team === teamSelected) {
        return "font-weight-bold";
      }
    }
  },
  beforeMount() {
    this.getTeamFixtures(this.$props.teamId);
  }
};
</script>

<style>
</style>