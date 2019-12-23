import axios from "axios";
const headers = {
  "X-Auth-Token": "54c0e6f1871244888493868bb4d3796b"
}
export default {
  getPLData: axios.create({
    baseURL: "https://api.football-data.org/v2/competitions/PL/",
    timeout: 5000,
    headers
  }),
  getTeamResults: axios.create({
    baseURL: "https://api.football-data.org/v2/teams/",
    timeout: 5000,
    headers
  })



}

/* const token = {
    headers: { "X-Auth-Token": "54c0e6f1871244888493868bb4d3796b" }
  };
  axios
    .get("http://api.football-data.org/v2/competitions/PL/standings", token)
    .then(response => {
      return (
        console.log(response.data.standings[0].table),
        (this.info = response.data.standings[0].table),
        console.log("info:", this.info)
      );
    }); */
