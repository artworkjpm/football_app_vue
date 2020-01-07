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
        </div>
      </div>
    </div>
    <div class="col">
      <b-spinner label="Spinning" class="text-center" v-if="showSpinner"></b-spinner>
      <div v-if="!showSpinner">
        <b-table
          responsive
          striped
          hover
          small
          :items="scorersNewArray"
          :fields="fields"
          class="small"
          primary-key
        ></b-table>
      </div>
    </div>
  </div>
</template>
<script>
import DropDownSeasons from "./DropDownSeasons";
import LeagueDropDown from "./LeagueDropDown";
import getData from "../service/apiCalls";
export default {
  name: "Scorers",
  components: { LeagueDropDown, DropDownSeasons },
  props: {
    league: String,
    optionLeagues: Array,
    year: [String, Number]
  },
  data() {
    return {
      scorersNewArray: [],
      showSpinner: true,
      scorers: [],
      fields: [
        {
          key: "pos",
          label: "",
          sortable: true,
          thClass: "alert-info"
        },
        {
          key: "Player",
          label: "Player",
          sortable: true,
          thClass: "alert-info"
        },
        {
          key: "Goals",
          label: "Goals",
          sortable: true,
          thClass: "alert-info"
        },
        {
          key: "Team",
          label: "Team",
          sortable: true,
          thClass: "alert-info"
        }
      ]
    };
  },
  methods: {
    getScorers() {
      this.showSpinner = true;
      getData.getLeagueData
        .get(
          this.$props.league +
            "/scorers?season=" +
            this.$props.year +
            "&limit=100"
        )
        .then(response => {
          let res = response.data.scorers;
          this.newArray(res);
        })
        .catch(error => console.log(error));
    },
    newArray(res) {
      let newArray = res.map((x, i) => {
        return {
          pos: i + 1 + ".",
          Player: x.player.name,
          Goals: x.numberOfGoals,
          Team: x.team.name
        };
      });
      this.scorersNewArray = newArray;
      this.showSpinner = false;
    },
    onLeagueChange(leagueObj) {
      this.$emit("onLeagueChange", leagueObj);
      this.getScorers();
    },
    onDropDownYear(seasonObj) {
      this.$emit("onYearChange", seasonObj);
      this.getScorers();
    }
  },
  watch: {
    league() {
      this.getScorers();
    },
    year() {
      this.getScorers();
    }
  },
  created() {
    this.getScorers();
  }
};
</script>
