
<template>
  <b-container>
    <table class="table table-hover table-borderless">
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in info" :key="i">
          <td>{{ item.position }}</td>
          <td>
            <img :src="item.team.crestUrl" class="team-badge" />
          </td>
          <td>{{item.playedGames}}</td>
          <td>{{item.won}}</td>
          <td>{{item.lost}}</td>
          <td>{{item.draw}}</td>
          <td>{{item.goalsFor}}</td>
          <td>{{item.goalsAgainst}}</td>
          <td>{{item.points}}</td>
        </tr>
      </tbody>
    </table>
    <b-table striped hover :items="items"></b-table>
  </b-container>
</template>




<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [
        { key: "position", label: "Position" },
        { key: "team.crestUrl", label: "Crest" },
        { key: "team.name", label: "Team Name" }
      ],
      info2: [
        {
          draw: 1,
          goalDifference: 23,
          goalsAgainst: 14,
          goalsFor: 37,
          lost: 0,
          playedGames: 15,
          points: 43,
          position: 1,
          team: {
            id: 64,
            name: "Liverpool FC",
            crestUrl:
              "http://upload.wikimedia.org/wikipedia/de/0/0a/FC_Liverpool.svg"
          }
        }
      ],
      info: [],
      log: null,
      items2: null,
      items: [
        { age: 40, first_name: "john", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" }
      ]
    };
  },
  created() {
    axios
      .get("http://api.football-data.org/v2/competitions/PL/standings", {
        headers: { "X-Auth-Token": "54c0e6f1871244888493868bb4d3796b" }
      })
      .then(response => {
        return (
          console.log(response.data.standings[0].table),
          (this.info = response.data.standings[0].table),
          console.log("info:", this.info)
        );
      });
  }
};
</script>
