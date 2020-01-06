<template>
  <div class="row">
    <div class="col-md-auto">
      <div class="row">
        <div class="col-md-auto">
          <LeagueDropDown
            :league="league"
            :optionLeagues="optionLeagues"
            @onLeagueChange="onLeagueChange"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-auto">
          <b-form-group title="Season">
            <b-form-select size="sm" v-model="year" :options="optionYears" @change="onChange()" />
          </b-form-group>
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
import LeagueDropDown from "./LeagueDropDown";
import getData from "../service/apiCalls";
export default {
  name: "Scorers",
  components: { LeagueDropDown },
  props: {
    league: String,
    optionLeagues: Array
  },
  data() {
    return {
      scorersNewArray: [],
      showSpinner: true,
      year: 2019,
      optionYears: [
        { value: "2019", text: "2019-20" },
        { value: "2018", text: "2018-19" },
        { value: "2017", text: "2017-18" }
      ],
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
        .get(this.$props.league + "/scorers?season=" + this.year + "&limit=100")
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
    onChange() {
      this.getScorers();
    },
    onLeagueChange(leagueObj) {
      this.$emit("onLeagueChange", leagueObj);
    }
  },
  watch: {
    league() {
      this.getScorers();
    }
  },
  created() {
    this.getScorers();
  }
};
</script>
