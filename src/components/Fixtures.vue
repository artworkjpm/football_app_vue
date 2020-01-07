<template>
  <div class="row">
    <div class="col-md-auto">
      <LeagueDropDown
        :league="league"
        :optionLeagues="optionLeagues"
        @onLeagueChange="onLeagueChange"
      />
      <div>
        <div class="row">
          <DropDownSeasons :year="year" @currentYear="onDropDownYear" />
          <div class="col-6 col-sm-12">
            <b-form-group>
              <b-form-select size="sm" v-model="status" :options="statusType" @change="onChange()" />
            </b-form-group>
          </div>
        </div>
      </div>
    </div>

    <div class="col-auto">
      <b-spinner label="Spinning" class="text-center" v-if="showSpinner"></b-spinner>
      <div v-if="!showSpinner">
        <div v-if="checkYearStatus">
          We can only display SCHEDULED fixtures for the current {{yearWarning}}
          season
        </div>
        <table class="table-responsive table adjust" v-for="(item, i) in newArrayFixtures" :key="i">
          <thead>
            <tr class="alert-info">
              <th class="text-nowrap">{{ item[0].date }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fixture, i) in item" :key="i">
              <td class="text-nowrap">
                <span class="text-right lefty">
                  <span v-if="status === 'FINISHED'" class="light-grey smaller">({{fixture.time}})</span>
                  {{ fixture.home }}
                </span>
                <b-badge>{{ timeResult(fixture) }}</b-badge>
                <span class="rightx">{{ fixture.away }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import DropDownSeasons from "./DropDownSeasons";
import LeagueDropDown from "./LeagueDropDown";
import moment from "moment";
import getData from "../service/apiCalls";
export default {
  name: "Fixtures",
  components: { LeagueDropDown, DropDownSeasons },
  data() {
    return {
      showSpinner: true,
      newArrayFixtures: [],
      status: "SCHEDULED",
      yearWarning: Number,
      statusType: [
        { value: "SCHEDULED", text: "SCHEDULED" },
        { value: "FINISHED", text: "FINISHED" },
        { value: "LIVE", text: "LIVE" },
        { value: "POSTPONED", text: "POSTPONED" },
        { value: "SUSPENDED", text: "SUSPENDED" },
        { value: "CANCELED", text: "CANCELED" }
      ]
    };
  },
  props: {
    league: String,
    optionLeagues: Array,
    year: [String, Number]
  },
  methods: {
    getFixtures() {
      getData.getLeagueData
        .get(
          this.$props.league +
            "/matches?status=" +
            this.status +
            "&season=" +
            this.$props.year
        )
        .then(response => {
          let fixtures = response.data.matches;
          this.newArray(fixtures);
        })
        .catch(error => console.log(error));
    },
    newArray(fixtures) {
      //console.log("fixtures looking for result: ", this.$props.fixtures);
      let newArray = fixtures.map(x => {
        return {
          date: moment(x.utcDate).format("ddd, MMMM Do YYYY"),
          dateNative: x.utcDate,
          time: moment(x.utcDate).format("HH:mm"),
          home: x.homeTeam.name,
          away: x.awayTeam.name,
          score: x.score.fullTime.homeTeam + " - " + x.score.fullTime.awayTeam,
          winner: x.score.winner
        };
      });
      //console.log("newArray:, ", newArray);
      return this.arrayFilter(newArray);
    },
    arrayFilter(newArray) {
      if (this.status === "FINISHED") {
        newArray.sort((a, b) => {
          return new Date(b.dateNative) - new Date(a.dateNative);
        });
      }
      let grouppedObjectByDate = newArray.reduce((acc, item) => {
        (acc[item.date] || (acc[item.date] = [])).push(item);
        return acc;
      }, {});
      grouppedObjectByDate = Object.values(grouppedObjectByDate);
      this.newArrayFixtures = grouppedObjectByDate;
      this.showSpinner = false;
    },

    timeResult(fixture) {
      const statusTypeChosen = this.status;
      if (statusTypeChosen === "SCHEDULED") {
        return fixture.time;
      } else if (statusTypeChosen === "FINISHED") {
        return fixture.score;
      } else if (statusTypeChosen === "LIVE") {
        return "in play";
      } else {
        return "";
      }
    },

    getYear() {
      let d2 = new Date();
      const getMonth = d2.getMonth();
      if (getMonth < 7) {
        d2 = parseInt(moment(d2).format("YYYY"));
        this.yearWarning = d2 - 1;
      } else {
        d2 = parseInt(moment(d2).format("YYYY"));
        this.yearWarning = d2;
      }
    },
    onChange() {
      this.showSpinner = true;
      this.getFixtures();
    },
    onLeagueChange(leagueObj) {
      this.showSpinner = true;
      this.$emit("onLeagueChange", leagueObj);
    },
    onDropDownYear(seasonObj) {
      this.showSpinner = true;
      this.$emit("onYearChange", seasonObj);
    }
  },
  computed: {
    checkYearStatus() {
      if (this.status === "SCHEDULED" && this.$props.year < this.yearWarning) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    league() {
      this.getFixtures();
    },
    year() {
      this.getFixtures();
    }
  },
  created() {
    this.getFixtures();
    this.getYear();
  }
};
</script>
