
let getYear = new Date().getFullYear();
let getMonth = new Date().getMonth();
if (getMonth >= 0 && getMonth < 8){
  getYear = getYear - 1
}
var arr = [];
for ( var i = getYear; i !== 2016; i--) {
    arr.push({
       value: i, text: `${i}-${i + 1}`
    });
}
/* optionYears: [
    { value: "2019", text: "2019-20" },
    { value: "2018", text: "2018-19" },
    { value: "2017", text: "2017-18" }
] */
export default {
    leagues: [
        { value: "PL", text: "ENG | Premier League" },
        { value: "ELC", text: "ENG | Championship" },
        { value: "PD", text: "SPA | Primera Division" },
        { value: "SA", text: "ITA | Serie A" },
        { value: "BL1", text: "GER | Bundesliga" },
        { value: "FL1", text: "FRA | Ligue 1" },
        { value: "DED", text: "HOL | Eredivisie" }
    ],
    optionYears: arr
}
