<template>
  <div class="row">
    <div class="col-md-auto">
      <LeagueDropDown
        :league="league"
        :optionLeagues="optionLeagues"
        @onLeagueChange="onLeagueChange"
      />
      <div>
        <div class="row">
          <DropDownSeasons :year="year" @currentYear="onDropDownYear" />

          <DropDownType @standingType="onDropDownType" :year="year" :typeOfGame="typeOfGame" />
        </div>
      </div>
    </div>

    <div class="col-auto">
      <table class="league-table table table-responsive small table-hover">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th v-b-tooltip title="Matches Played">MP</th>
            <th v-b-tooltip title="Points">Pts</th>
            <th v-b-tooltip title="Won">W</th>
            <th v-b-tooltip title="Lost">L</th>
            <th v-b-tooltip title="Drawn">D</th>
            <th v-b-tooltip title="Goals For">GF</th>
            <th v-b-tooltip title="Goals Against">GA</th>
            <th v-b-tooltip title="Goal Difference">GD</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,i) in standings"
            :key="i"
            :class="defineColor(item)"
            @click="getTeamId(item.team.id, i, item.team.name, item.playedGames, item.won, item.draw, item.lost)"
          >
            <td>{{ item.position }}</td>
            <td>
              <img :src="item.team.crestUrl ? item.team.crestUrl : 'No Image'" class="team-badge" />
              <div class="clubName">{{item.team.name}}</div>
            </td>
            <td>{{item.playedGames}}</td>
            <td class="font-weight-bold">{{item.points}}</td>
            <td>{{item.won}}</td>
            <td>{{item.lost}}</td>
            <td>{{item.draw}}</td>
            <td>{{item.goalsFor}}</td>
            <td>{{item.goalsAgainst}}</td>
            <td>{{goalDiff(item.goalsFor, item.goalsAgainst)}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <LeagueLegend />
    <ModalContent :standings="standings" :teamId="teamId" />
  </div>
</template>

<script>
import LeagueDropDown from "./LeagueDropDown";
import DropDownSeasons from "./DropDownSeasons";
import DropDownType from "./DropDownType.vue";
import LeagueLegend from "./LeagueLegend";
import ModalContent from "./ModalContent";
export default {
  name: "LeagueTable",
  data() {
    return {
      teamId: Object,
      goalDiffMath: Number
    };
  },
  components: {
    DropDownType,
    LeagueLegend,
    ModalContent,
    LeagueDropDown,
    DropDownSeasons
  },
  props: {
    standings: {
      type: Array
    },
    year: [String, Number],
    typeOfGame: String,
    league: String,
    optionLeagues: Array
  },
  methods: {
    goalDiff(item1, item2) {
      const doMath = item1 - item2;
      if (doMath < 0) {
        return (this.goalDiffMath = doMath);
      } else {
        return (this.goalDiffMath = "+" + doMath);
      }
    },

    getTeamId(teamId, index, teamName, played, won, draw, lost) {
      let teamIdObj = {
        teamId: teamId,
        teamIndex: index,
        teamName,
        played,
        won,
        draw,
        lost
      };
      return (this.teamId = teamIdObj);
    },
    defineColor(item) {
      if (item.position === 1) {
        return "alert-success";
      } else if (item.position > 1 && item.position < 5) {
        return "alert-primary";
      } else if (item.position === 5) {
        return "alert-warning";
      } else if (item.position > 17) {
        return "alert-danger";
      }
    },
    onDropDownType(typeObj) {
      this.$emit("standingType", typeObj);
    },
    onLeagueChange(leagueObj) {
      this.$emit("onLeagueChange", leagueObj);
    },
    onDropDownYear(seasonObj) {
      this.$emit("onYearChange", seasonObj);
    }
  }
};
</script>