<template>
  <div>
    <table class="table table-responsive" v-for="(item, i) in this.newArrayFixtures" :key="i">
      <thead>
        <tr>
          <th>{{ item[i].date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(fix, i) in item" :key="i">
          <td>{{ fix.home }} {{ fix.time }} {{ fix.away }}</td>
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
      cleanedDates: [],
      cleanedFixtureDates: [],
      newArrayFixtures: []
    };
  },
  props: {
    fixtures: {
      type: Array
    }
  },
  methods: {
    callDate(date, dateType) {
      const date1 = new Date(date);
      if (dateType === "fullDate") {
        return moment(date1).format("ddd, MMMM Do YYYY");
      } else {
        return moment(date1).format("HH:mm");
      }
    },
    newArray() {
      let newArray = Array.from(this.$props.fixtures, x =>
        moment(x.utcDate).format("ddd, MMMM Do YYYY")
      );
      newArray = [...new Set(newArray)];
      return (this.cleanedDates = newArray);
      //return console.log(this.cleanedDates);
    },
    newArray2() {
      let newArray = Array.from(this.$props.fixtures, x => {
        return {
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY"),
          time: moment(x.utcDate).format("HH:mm"),
          home: x.homeTeam.name,
          away: x.awayTeam.name
        };
      });
      return (this.cleanedFixtureDates = newArray);
      //console.log("this.cleanedFixtureDates", this.cleanedFixtureDates);
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
      console.log(this.newArrayFixtures);
    }
  },

  watch: {
    fixtures() {
      this.newArray();
      this.newArray2();
      this.arrayFilter();
    }
  }
};
</script>
