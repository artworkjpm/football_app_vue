<template>
  <div class="container mt-3">
    <!-- <div>
      <div>
        <b-nav tabs>
          <b-nav-item :to="{ path: '/scorers', props: {scorers: scorers} }">Scorers</b-nav-item>
        </b-nav>
      </div>
    </div>-->
    <!-- GAP -->
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Standings" active>
          <LeagueTable :standings="standings" @standingType="onDropDownType" />
        </b-tab>
        <b-tab title="Fixtures">
          <Fixtures :fixtures="fixtures" />
        </b-tab>
        <b-tab title="Scorers" to="/scorers">
          <Scorers :scorers="scorers" @seasonScorers="getScorersYear" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import LeagueTable from "./LeagueTable";
import Fixtures from "./Fixtures";
import Scorers from "./Scorers";
import getData from "../service/apiCalls";
export default {
  name: "Home",
  components: {
    LeagueTable,
    Fixtures,
    Scorers
  },

  data() {
    return {
      standings: [],
      fixtures: [],
      scorers: [],
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
      getData.getPLData
        .get(
          "standings?season=" + this.year + "&standingType=" + this.standingType
        )
        .then(response => {
          this.standings = response.data.standings[0].table;
          //console.log("standings: ", this.standings);
        })
        .catch(error => console.log(error));
    },
    getFixtures() {
      getData.getPLData
        .get("matches?status=SCHEDULED")
        .then(response => {
          this.fixtures = response.data.matches;
          //console.log("this.fixtures: ", this.fixtures);
        })
        .catch(error => console.log(error));
    },
    getScorers() {
      getData.getPLData
        .get("scorers?season=" + this.year)
        .then(response => {
          this.scorers = response.data;
          //console.log("scorers: ", this.scorers);
        })
        .catch(error => console.log(error));
    },

    onDropDownType(typeObj) {
      this.standingType = typeObj.standingType;
      this.year = typeObj.year;
      this.getStandings();
    },
    getScorersYear(typeObj) {
      this.year = typeObj.year;
      this.getScorers();
    }
  },
  created() {
    this.getStandings();
    this.getFixtures();
    this.getScorers();
  }
};
</script>
