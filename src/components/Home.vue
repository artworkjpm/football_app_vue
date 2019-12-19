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
      year: "2019",
      standingType: "TOTAL"
    };
  },
  methods: {
    getStandings() {
      getData
        .get(
          "standings?season=" + this.year + "&standingType=" + this.standingType
        )
        .then(response => {
          this.standings = response.data.standings[0].table;
        })
        .catch(error => console.log(error));
    },

    onDropDownType(typeObj) {
      console.log("from parent: ", typeObj);
      this.standingType = typeObj.standingType;
      this.year = typeObj.year;
      this.getStandings();
    }
  },
  created() {
    this.getStandings();
  }
};
</script>
