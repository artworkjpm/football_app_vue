<template>
  <div class="row">
    <DropDownType @standingType="onDropDownType" />
    <div class="col">
      <table class="league-table table table-responsive small">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Pts</th>
            <th>MP</th>
            <th>W</th>
            <th>L</th>
            <th>D</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,i) in standings"
            :key="i"
            :class="defineColor(item)"
            @click="getTeamId(item)"
          >
            <td>{{ item.position }}</td>
            <td>
              <img :src="item.team.crestUrl" class="team-badge" />
            </td>
            <td>{{item.points}}</td>
            <td>{{item.playedGames}}</td>
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
  components: { DropDownType, LeagueLegend, ModalContent },
  props: {
    standings: {
      type: Array
    }
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

    getTeamId(team) {
      return (this.teamId = team);
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
    }
  }
};
</script>