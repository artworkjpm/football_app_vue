<template>
  <div>
    <b-form-group label="Season" style="width: 150px">
      <b-form-select v-model="year" :options="optionYears" @change="onChange()" />
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
export default {
  name: "Scorers",
  props: {
    scorers: {
      type: [Object, Array]
    }
  },
  data() {
    return {
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
    onChange() {
      this.$emit("seasonScorers", this.$data.year);
    }
  },
  beforeMount() {
    //console.log("props: ", this.$props.scorers.scorers);
  }
};
</script>
