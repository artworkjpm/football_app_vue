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
            v-if="!showSpinner"
            :year="year"
            :league="league"
            :typeOfGame="typeOfGame"
          />
        </b-tab>
        <b-tab title="Fixtures">
          <Fixtures />
        </b-tab>
        <b-tab title="Scorers">
          <Scorers />
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
import moment from "moment";
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
      league: "PL",
      typeOfGame: "TOTAL",
      statusType: "SCHEDULED"
    };
  },
  methods: {
    //Season 2019-2020 can only accept 2019, if todays date is less than august, change to 2019.
    getYear() {
      let d2 = new Date();
      const getMonth = d2.getMonth();
      if (getMonth < 7) {
        d2 = parseInt(moment(d2).format("YYYY"));
        this.year = d2 - 1;
      } else {
        d2 = parseInt(moment(d2).format("YYYY"));
        this.year = d2;
      }
      //console.log("this.getYear=", this.year);
      this.getStandings();
    },
    getStandings() {
      this.showSpinner = true;
      getData.getLeagueData
        .get(
          this.league +
            "/standings?season=" +
            this.year +
            "&standingType=" +
            this.typeOfGame
        )
        .then(response => {
          this.standings = response.data.standings[0].table;

          this.showSpinner = false;
          console.log("standings: ", this.standings);
        })
        .catch(error => console.log(error));
    },

    onDropDownType(typeObj) {
      this.league = typeObj.league;
      this.typeOfGame = typeObj.standingType;
      this.year = typeObj.year;
      this.getStandings();
      //console.log("typeObj: ", typeObj);
    }
  },
  created() {
    this.getYear();
  }
};
</script>
