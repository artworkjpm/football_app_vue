<template>
  <div>
    <table class="table table-responsive" v-for="(item, i) in fixtures" :key="i">
      <thead>
        <tr>
          <th>{{ callDate(item.utcDate, "fullDate") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ item.homeTeam.name }} {{ callDate(item.utcDate, "time") }} {{ item.awayTeam.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from "moment";
export default {
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
    }
  }
};
</script>
