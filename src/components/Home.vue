<template>
  <div class="container mt-3">
    <!-- <div class="text-center" v-if="showSpinner">
      <b-spinner label="Spinning"></b-spinner>
    </div>-->
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
          <b-spinner label="Spinning" class="text-center" v-if="showSpinner"></b-spinner>
          <LeagueTable
            :standings="standings"
            @standingType="onDropDownType"
            :year="year"
            v-if="!showSpinner"
          />
        </b-tab>
        <b-tab title="Fixtures">
          <Fixtures :fixtures="fixtures" @statusType="onDropDownStatusType" />
        </b-tab>
        <b-tab title="Scorers" to="/scorers">
          <Scorers :currentYear="currentYear" />
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
      showSpinner: true,
      standings: [],
      fixtures: [],
      year: Number,
      currentYear: Number,
      league: "PL",
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
      getData.getLeagueData
        .get(this.league + "/matches?status=" + this.statusType)
        .then(response => {
          this.fixtures = response.data.matches;
          this.year = this.getYear(response.data.matches[0].season.startDate);
          this.currentYear = this.getYear(
            response.data.matches[0].season.startDate
          );
          //console.log("this.fixtures: ", this.year, this.fixtures);
          this.getStandings();
        })
        .catch(error => console.log(error));
    },
    getStandings() {
      getData.getLeagueData
        .get(
          this.league +
            "/standings?season=" +
            this.year +
            "&standingType=" +
            this.standingType
        )
        .then(response => {
          this.standings = response.data.standings[0].table;
          this.showSpinner = false;
          //console.log("standings: ", this.standings);
        })
        .catch(error => console.log(error));
    },

    onDropDownType(typeObj) {
      this.league = typeObj.league;
      this.standingType = typeObj.standingType;
      this.year = typeObj.year;
      this.getFixtures();
      //console.log("typeObj: ", typeObj);
    },
    onDropDownStatusType(receivedStatus) {
      //console.log("statusType: ", receivedStatus);
      this.statusType = receivedStatus;
      this.getFixtures();
    }
  },
  created() {
    this.getFixtures();
  }
};
</script>
