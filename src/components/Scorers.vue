<template>
  <div>
    <b-form-group label="Season" style="width: 150px">
      <b-form-select v-model="scorersYear" :options="optionYears" @change="onChange()" />
    </b-form-group>
    <table class="small table-responsive table">
      <thead>
        <tr class="alert-info">
          <th></th>
          <th>Player</th>
          <th>Goals</th>
          <th>Team</th>
        </tr>
      </thead>
      <tr v-for="(item, i) in scorers.scorers" :key="i">
        <td class="text-nowrap">{{i +1}}.</td>
        <td class="text-nowrap">{{item.player.name}}</td>
        <td class="text-nowrap">{{item.numberOfGoals}}</td>
        <td class="text-nowrap">{{item.team.name}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import getData from "../service/apiCalls";
export default {
  name: "Scorers",
  data() {
    return {
      scorersYear: Number,
      optionYears: [
        { value: "2019", text: "2019-20" },
        { value: "2018", text: "2018-19" },
        { value: "2017", text: "2017-18" }
      ],
      scorers: []
    };
  },
  props: {
    currentYear: [Function, Number, String]
  },
  methods: {
    getScorers() {
      getData.getPLData
        .get("scorers?season=" + this.scorersYear)
        .then(response => {
          this.scorers = response.data;
          //console.log("scorers: ", this.scorers);
        })
        .catch(error => console.log(error));
    },
    onChange() {
      this.getScorers();
    }
  },
  watch: {
    currentYear() {
      this.scorersYear = this.$props.currentYear;
      this.getScorers();
    }
  }
};
</script>
