<template>
  <div>
    <table class="table-responsive table adjust" v-for="(item, i) in teamFixturesArray" :key="i">
      <thead>
        <tr class="alert-info">
          <th class="text-nowrap font-weight-normal font-italic">
            {{item.competition.name}}
            <br />
            {{getDateFormat(item.utcDate, "getFullDate")}}
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
            <b-badge>{{ getDateFormat(item.utcDate, "getTime") }}</b-badge>
            <span class="rightx" :class="getBold(item.awayTeam.name)">{{ item.awayTeam.name }}</span>
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
      teamFixturesArray: this.$props.teamFixtures
    };
  },
  props: {
    teamFixtures: Array,
    teamName: String
  },
  methods: {
    getDateFormat(date, call) {
      if (call === "getFullDate") {
        return moment(date).format("ddd, MMMM Do YYYY");
      } else {
        return moment(date).format("HH:mm");
      }
    },
    getBold(team) {
      const teamSelected = this.$props.teamName;
      if (team === teamSelected) {
        return "font-weight-bold";
      }
    }
  }
};
</script>

<style>
</style>