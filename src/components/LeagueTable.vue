<template>
  <div class="row">
    <div class="col col-sm-4 col-md-4 col-lg-2">
      <b-form-group label="Season">
        <b-form-select v-model="year" :options="optionYears" @change="onChange('Year')" />
      </b-form-group>
      <b-form-group label="Type of games">
        <b-form-select
          v-model="standingType"
          :options="options"
          @change="onChange('standingType')"
        />
      </b-form-group>
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in standings" :key="i" :class="defineColor(item)">
            <td class="pr-0">{{ item.position }}</td>
            <td class="pl-0">
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
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col">
      <table class="table table-responsive">
        <tbody>
          <tr class="alert-success">
            <td>Winners</td>
          </tr>
          <tr class="alert-primary">
            <td>Champions League</td>
          </tr>
          <tr class="alert-warning">
            <td>Europa League</td>
          </tr>
          <tr class="alert-danger">
            <td>Relegation</td>
          </tr>
        </tbody>
      </table>
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
      standingType: "TOTAL",
      options: [
        { value: "TOTAL", text: "Total" },
        { value: "HOME", text: "Home" },
        { value: "AWAY", text: "Away" }
      ],
      year: this.getYear(),
      optionYears: [
        { value: "2019", text: "2019-20" },
        { value: "2018", text: "2018-19" },
        { value: "2017", text: "2017-18" }
      ]
    };
  },
  methods: {
    getYear() {
      var d = new Date();
      var n = d.getFullYear();
      return n;
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
    onChange() {
      const typeObj = {
        standingType: this.$data.standingType,
        year: this.$data.year
      };
      this.$emit("standingType", typeObj);
    }
  }
};
</script>