
<template>
  <b-container>
    <table class="table table-hover">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>MP</th>
          <th>W</th>
          <th>L</th>
          <th>D</th>
          <th>GF</th>
          <th>GA</th>
          <th>Pts</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in standings" :key="i">
          <td>{{ item.position }}</td>
          <td>
            <img :src="item.team.crestUrl" class="team-badge" v-b-modal="'showBadge' + i" />
          </td>
          <td>{{item.playedGames}}</td>
          <td>{{item.won}}</td>
          <td>{{item.lost}}</td>
          <td>{{item.draw}}</td>
          <td>{{item.goalsFor}}</td>
          <td>{{item.goalsAgainst}}</td>
          <td>{{item.points}}</td>
          <td>
            <b-button variant="outline-primary" v-b-modal="'modalId' + i">Info</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-table striped hover :items="items"></b-table>
    <b-modal
      :id="'modalId' + i"
      v-for="(item,i) in standings"
      :key="'teamDetails'+ i"
    >Hello {{item.team.name}}</b-modal>
    <b-modal :id="'showBadge' + i" v-for="(item,i) in standings" :key="'badge'+ i">
      <img :src="item.team.crestUrl" class="team-badge-full" alt />
    </b-modal>
  </b-container>
</template>

<script>
import { dummyItems } from "../service/dummyData";
import getData from "../service/apiCalls";
export default {
  data() {
    return {
      showBadgeFull: false,
      standings: [],
      items: dummyItems
    };
  },
  methods: {
    getStandings() {
      getData
        .get("standings")
        .then(
          response => (
            console.log(response.data.standings[0].table),
            (this.standings = response.data.standings[0].table),
            console.log("standings:", this.standins)
          )
        );
    }
  },
  created() {
    this.getStandings();
  }
};
</script>