<template>
  <div>
    <table class="table-responsive table adjust" v-for="(res, i) in resultsFormated" :key="i">
      <thead>
        <tr class="alert-info">
          <th class="text-nowrap">{{ res.date}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-nowrap">
            <span class="text-right leftx">{{ res.home }}</span>
            <b-badge>{{ res.score }}</b-badge>
            <span class="rightx">{{ res.away }}</span>
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
      resultsFormated: [],
      newArrayResults: []
    };
  },
  name: "ModalResults",
  props: {
    results: {
      type: Array
    }
  },

  methods: {
    newArray() {
      let newArray = Array.from(this.$props.results, x => {
        return {
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY - HH:mm"),
          home: x.homeTeam.name,
          away: x.awayTeam.name,
          score: x.score.fullTime.homeTeam + " - " + x.score.fullTime.awayTeam
        };
      });

      return (this.resultsFormated = newArray);
    },
    arrayFilter() {
      let grouppedObjectByDate = this.resultsFormated.reduce((acc, item) => {
        (acc[item.date] || (acc[item.date] = [])).push(item);
        return acc;
      }, {});
      grouppedObjectByDate = Object.values(grouppedObjectByDate);
      this.newArrayResults = grouppedObjectByDate;
      console.log(this.newArrayResults);
    }
  },

  created() {
    this.newArray();
  }
};
</script>

<style>
</style>