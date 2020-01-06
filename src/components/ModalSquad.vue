<template>
  <div>
    <table class="table-responsive table small">
      <thead class="alert-info">
        <tr>
          <th>Staff</th>
          <th>Role</th>
          <th>Nationality</th>
          <th>DOB</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in coachArray" :key="i">
          <td>{{item.name}}</td>
          <td>{{item.role.replace("_", " ")}}</td>
          <td>{{item.nationality}}</td>
          <td>{{dob(item.dateOfBirth).dob}}</td>
          <td>{{dob(item.dateOfBirth).age}}</td>
        </tr>
      </tbody>
    </table>

    <b-table responsive striped hover small :items="players" :fields="fields" class="small"></b-table>

    <!-- <table class="table-responsive table small">
      <thead class="alert-info">
        <tr>
          <th>Player</th>
          <th>Position</th>
          <th>Nationality</th>
          <th>DOB</th>
          <th>Age</th>
          <th>Shirt Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in players" :key="i">
          <td>{{item.name}}</td>
          <td>{{item.position}}</td>
          <td>{{item.nationality}}</td>
          <td>{{dob(item.dateOfBirth).dob}}</td>
          <td>{{dob(item.dateOfBirth).age}}</td>
          <td>{{item.shirtNumber}}</td>
        </tr>
      </tbody>
    </table>-->
  </div>
</template>

<script>
import getData from "../service/apiCalls";
import moment from "moment";
export default {
  name: "ModalSquad",
  data() {
    return {
      clubInfo: Object,
      coachArray: Array,
      players: Array,
      fields: [
        {
          key: "name",
          label: "Player",
          sortable: true,
          thClass: "alert-info"
        },
        {
          key: "position",
          label: "Position",
          sortable: true,
          thClass: "alert-info"
        },
        {
          key: "nationality",
          label: "Nationality",
          sortable: true,
          thClass: "alert-info"
        },
        {
          key: "dateOfBirth",
          label: "DOB",
          sortable: true,
          thClass: "alert-info"
        },
        {
          key: "age",
          label: "Age",
          sortable: true,
          thClass: "alert-info"
        },
        {
          key: "shirtNumber",
          label: "Shirt Number",
          sortable: true,
          thClass: "alert-info"
        }
      ]
    };
  },
  props: {
    teamId: [Function, Object]
  },

  methods: {
    getTeamInfo(teamId) {
      getData.getTeamResults
        .get(teamId.teamId + "/")
        .then(response => {
          console.log("getTeamInfo ", response.data);
          this.clubInfo = response.data;
          this.getCoach();
          this.getPlayers();
        })
        .catch(error => console.log(error));
    },
    getCoach() {
      this.coachArray = this.clubInfo.squad.filter(item => {
        return item.role != "PLAYER";
      });
    },
    getPlayers() {
      let justPlayers = this.clubInfo.squad.filter(
        item => item.role === "PLAYER"
      );
      justPlayers = justPlayers.map(item => {
        return {
          name: item.name,
          position: item.position,
          nationality: item.nationality,
          dateOfBirth: moment(item.dateOfBirth).format("DD/MM/YYYY"),
          age: moment().diff(item.dateOfBirth, "years"),
          shirtNumber: item.shirtNumber
        };
      });
      //console.log("justPlayers: ", justPlayers);

      return (this.players = justPlayers);
    },
    dob(date) {
      return {
        dob: moment(date).format("DD/MM/YYYY"),
        age: moment().diff(date, "years")
      };
    }
  },

  beforeMount() {
    this.getTeamInfo(this.$props.teamId);
  }
};
</script>

<style>
</style>