<template>
  <div class="container mt-3">
    <LeagueTable :standings="standings" @standingType="onDropDownType" />
  </div>
</template>
<script>
import LeagueTable from "./LeagueTable.vue";
import getData from "../service/apiCalls";
export default {
  components: {
    LeagueTable
  },

  data() {
    return {
      standings: [],
      standingType: "TOTAL"
    };
  },
  methods: {
    getStandings() {
      getData
        .get("standings?standingType=" + this.standingType)
        .then(response => {
          this.standings = response.data.standings[0].table;
        })
        .catch(error => console.log(error));
    },

    onDropDownType(type) {
      console.log("from parent: ", type);
      this.standingType = type;
      this.getStandings();
    }
  },
  created() {
    this.getStandings();
  }
};
</script>
