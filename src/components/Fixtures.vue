<template>
  <div>
    <table class="table-responsive table adjust" v-for="(item, i) in newArrayFixtures" :key="i">
      <thead>
        <tr class="alert-info">
          <th class="text-nowrap">{{ item[0].date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(fix, i) in item" :key="i">
          <td class="text-nowrap">
            <span class="text-right leftx">{{ fix.home }}</span>
            <b-badge>{{ fix.time }}</b-badge>
            <span class="rightx">{{ fix.away }}</span>
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
    newArray() {
      let newArray = Array.from(this.$props.fixtures, x => {
        return {
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY"),
          time: moment(x.utcDate).format("HH:mm"),
          home: x.homeTeam.name,
          away: x.awayTeam.name
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
      //console.log(this.newArrayFixtures);
    }
  },

  watch: {
    fixtures() {
      this.newArray();
    }
  }
};
</script>
