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
          <LeagueTable :standings="standings" @standingType="onDropDownType" :year="year" />
        </b-tab>
        <b-tab title="Fixtures">
          <Fixtures :fixtures="fixtures" @statusType="onDropDownStatusType" />
        </b-tab>
        <b-tab title="Scorers" to="/scorers">
          <Scorers :scorers="scorers" @seasonScorers="getScorersYear" :year="year" />
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
      year: Number,
      standingType: "TOTAL",
      statusType: "SCHEDULED"
    };
  },
  methods: {
    getYear(year) {
      var d = new Date(year);
      var n = d.getFullYear();
      return n;
    },
    getFixtures() {
      getData.getPLData
        .get("matches?status=" + this.statusType)
        .then(response => {
          this.fixtures = response.data.matches;
          this.year = this.getYear(response.data.matches[0].season.startDate);
          //console.log("this.fixtures: ", this.year, this.fixtures);
          this.getStandings();
        })
        .catch(error => console.log(error));
    },
    getStandings() {
      getData.getPLData
        .get(
          "standings?season=" + this.year + "&standingType=" + this.standingType
        )
        .then(response => {
          this.standings = response.data.standings[0].table;
          //console.log("standings: ", this.standings);
          this.getScorers();
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
    onDropDownStatusType(receivedStatus) {
      //console.log("statusType: ", receivedStatus);
      this.statusType = receivedStatus;
      this.getFixtures();
    },
    getScorersYear(season) {
      this.year = season;
      this.getScorers();
    }
  },
  created() {
    this.getFixtures();
  }
};
</script>
