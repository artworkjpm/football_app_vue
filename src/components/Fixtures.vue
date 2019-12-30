<template>
  <div>
    <b-form-group label="Status:" style="width: 150px">
      <b-form-select v-model="status" :options="statusType" @change="onChange()" />
    </b-form-group>
    <!-- DESKTOP -->
    <table class="table-responsive table adjust" v-for="(item, i) in newArrayFixtures" :key="i">
      <thead>
        <tr class="alert-info">
          <th class="text-nowrap">{{ item[0].date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(fixture, i) in item" :key="i">
          <td class="text-nowrap">
            <span class="text-right lefty">
              <span v-if="status === 'FINISHED'" class="light-grey smaller">({{fixture.time}})</span>
              {{ fixture.home }}
            </span>
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
      newArrayFixtures: [],
      status: "SCHEDULED",
      statusType: [
        { value: "SCHEDULED", text: "SCHEDULED" },
        { value: "FINISHED", text: "FINISHED" },
        { value: "LIVE", text: "LIVE" },
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
        const checkNull = () => {
          let tempVal = " - ";
          if (this.status === "FINISHED") {
            tempVal =
              x.score.fullTime.homeTeam + " - " + x.score.fullTime.awayTeam;
          }
          return tempVal;
        };

        return {
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY"),
          dateNative: x.utcDate,
          time: moment(x.utcDate).format("HH:mm"),
          home: x.homeTeam.name,
          away: x.awayTeam.name,
          score: checkNull(),
          winner: x.score.winner
        };
      });

      //console.log("newArray:, ", newArray);

      return newArray, this.arrayFilter(newArray);
    },
    arrayFilter(newArray) {
      if (this.$data.status === "FINISHED") {
        newArray.sort((a, b) => {
          return new Date(b.dateNative) - new Date(a.dateNative);
        });
      }
      let grouppedObjectByDate = newArray.reduce((acc, item) => {
        (acc[item.date] || (acc[item.date] = [])).push(item);
        return acc;
      }, {});
      grouppedObjectByDate = Object.values(grouppedObjectByDate);
      return (this.newArrayFixtures = grouppedObjectByDate);
    },

    timeResult(fixture) {
      const statusTypeChosen = this.$data.status;
      if (statusTypeChosen === "SCHEDULED") {
        return fixture.time;
      } else if (statusTypeChosen === "FINISHED") {
        return fixture.score;
      } else if (statusTypeChosen === "LIVE") {
        return "x - x";
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
