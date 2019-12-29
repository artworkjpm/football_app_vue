<template>
  <div>
    <b-form-group label="Status" style="width: 150px">
      <b-form-select v-model="status" :options="statusType" @change="onChange()" />
    </b-form-group>
    <table class="table-responsive table adjust" v-for="(item, i) in newArrayFixtures" :key="i">
      <thead>
        <tr class="alert-info">
          <th class="text-nowrap">{{ item[0].date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(fixture, i) in item" :key="i">
          <td class="text-nowrap">
            <span class="text-right leftx">{{ fixture.home }}</span>
            <b-badge>{{ timeResult(fixture) }}</b-badge>
            <span class="rightx">{{ fixture.away }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Fixtures",
  data() {
    return {
      cleanedFixtureDates: [],
      newArrayFixtures: [],
      status: "SCHEDULED",
      statusType: [
        { value: "SCHEDULED", text: "SCHEDULED" },
        { value: "FINISHED", text: "FINISHED" },
        { value: "LIVE", text: "LIVE" },
        { value: "IN_PLAY", text: "IN_PLAY" },
        { value: "PAUSED", text: "PAUSED" },
        { value: "POSTPONED", text: "POSTPONED" },
        { value: "SUSPENDED", text: "SUSPENDED" },
        { value: "CANCELED", text: "CANCELED" }
      ]
    };
  },
  props: {
    fixtures: {
      type: Array
    }
  },
  methods: {
    onChange() {
      this.$emit("statusType", this.$data.status);
    },
    newArray() {
      console.log("fixtures looking for result: ", this.$props.fixtures);

      let newArray = Array.from(this.$props.fixtures, x => {
        return {
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY"),
          time: moment(x.utcDate).format("HH:mm"),
          home: x.homeTeam.name,
          away: x.awayTeam.name,
          score: x.score.fullTime.homeTeam + " - " + x.score.fullTime.awayTeam,
          winner: x.score.winner
        };
      });

      return (this.cleanedFixtureDates = newArray), this.arrayFilter();
    },
    arrayFilter() {
      let grouppedObjectByDate = this.cleanedFixtureDates.reduce(
        (acc, item) => {
          (acc[item.date] || (acc[item.date] = [])).push(item);
          return acc;
        },
        {}
      );
      grouppedObjectByDate = Object.values(grouppedObjectByDate);
      this.newArrayFixtures = grouppedObjectByDate;
      console.log("this.newArrayFixtures", this.newArrayFixtures);
    },
    timeResult(fixture) {
      const statusTypeChosen = this.$data.status;
      if (statusTypeChosen === "SCHEDULED") {
        return fixture.time;
      } else if (statusTypeChosen === "FINISHED") {
        return fixture.score;
      } else {
        return "";
      }
    }
  },

  watch: {
    fixtures() {
      this.newArray();
    }
  }
};
</script>
