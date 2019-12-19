<template>
  <div>
    <div class="row">
      <div class="col col-sm-4 col-md-4 col-lg-2">
        <b-form-select v-model="selected" :options="options" @change="onChange()" />
      </div>
      <div class="col">
        <table class="table table-responsive">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in standings" :key="i" :class="defineColor(item)">
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
                <b-button variant="primary" v-b-modal="'modalId' + i">Info</b-button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <b-table striped hover :items="items"></b-table> -->

      <div class="col">
        <div class="bg-success text-white"></div>
        <div>Winners</div>
      </div>
    </div>

    <b-modal
      :id="'modalId' + i"
      v-for="(item,i) in standings"
      :key="'teamDetails'+ i"
    >Hello {{item.team.name}}</b-modal>

    <b-modal :id="'showBadge' + i" v-for="(item,i) in standings" :key="'badge'+ i">
      <img :src="item.team.crestUrl" class="team-badge-full" alt />
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "LeagueTable",
  props: {
    standings: {
      type: Array
    }
  },

  data() {
    return {
      selected: "TOTAL",
      options: [
        { value: "TOTAL", text: "Total" },
        { value: "HOME", text: "Home results" },
        { value: "AWAY", text: "Away results" }
      ]
    };
  },
  methods: {
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
    onChange() {
      console.log(this.$data.selected);
      this.$emit("standingType", this.$data.selected);
    }
  }
};
</script>