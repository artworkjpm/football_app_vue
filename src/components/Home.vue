<template>
  <div class="container mt-3">
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Standings" active>
          <LeagueTable :standings="standings" @standingType="onDropDownType" />
        </b-tab>
        <b-tab title="Fixtures">
          <Fixtures :fixtures="fixtures" />
        </b-tab>
        <b-tab title="Scorers">
          <p>I'm a disabled tab!</p>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import LeagueTable from "./LeagueTable";
import Fixtures from "./Fixtures";
import getData from "../service/apiCalls";
export default {
  name: "Home",
  components: {
    LeagueTable,
    Fixtures
  },

  data() {
    return {
      standings: [],
      fixtures: [],
      year: this.getYear(),
      standingType: "TOTAL"
    };
  },
  methods: {
    getYear() {
      var d = new Date();
      var n = d.getFullYear();
      return n;
    },
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
    getFixtures() {
      getData
        .get("matches?status=SCHEDULED")
        .then(response => {
          this.fixtures = response.data.matches;
          console.log("this.fixtures: ", this.fixtures);
        })
        .catch(error => console.log(error));
    },

    onDropDownType(typeObj) {
      this.standingType = typeObj.standingType;
      this.year = typeObj.year;
      this.getStandings();
    }
  },
  created() {
    this.getStandings();
    this.getFixtures();
  }
};
</script>
