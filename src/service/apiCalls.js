import axios from "axios";
const headers = {
  "X-Auth-Token": process.env.VUE_APP_API_TOKEN
}
export default {
  getLeagueData: axios.create({
    baseURL: "https://api.football-data.org/v2/competitions/",
    timeout: 5000,
    headers
  }),
  getTeamResults: axios.create({
    baseURL: "https://api.football-data.org/v2/teams/",
    timeout: 5000,
    headers
  })
}
