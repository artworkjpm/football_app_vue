import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue"
import Scorers from "@/components/Scorers.vue"
import LeagueTable from "@/components/LeagueTable";
import Fixtures from "@/components/Fixtures";
import Fixtures2 from "@/components/Fixtures2";

Vue.use(VueRouter);

export default new VueRouter({


  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/standings",
      name: "Standings",
      component: LeagueTable
    },
    {
      path: "/fixtures",
      name: "Fixtures",
      component: Fixtures
    },
    {
      path: "/fixtures2",
      name: "Fixtures2",
      component: Fixtures2
    },
    {
      path: "/scorers",
      name: "Scorers",
      component: Scorers,
      props: true
    },
  ],
  mode: "history"
});
