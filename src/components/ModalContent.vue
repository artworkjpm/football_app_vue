<template>
  <div>
    <b-modal :id="'modalId' + i" v-for="(item,i) in standings" :key="'teamDetails'+ i">
      <template v-slot:modal-title>
        <div class="modal-title-league" v-b-modal="'showBadge' + i">
          <img :src="item.team.crestUrl" class="team-badge mr-2" />
          {{ item.team.name}}
        </div>
      </template>
      <b-tabs content-class="mt-3">
        <b-tab title="Results" active>
          <ModalResults :results="results" />
        </b-tab>
        <b-tab title="Fixtures"></b-tab>
        <b-tab title="Scorers"></b-tab>
      </b-tabs>
    </b-modal>

    <b-modal :id="'showBadge' + i" v-for="(item,i) in standings" :key="'badge'+ i">
      <img :src="item.team.crestUrl" class="team-badge-full" alt />
    </b-modal>
  </div>
</template>

<script>
import getData from "../service/apiCalls";
import ModalResults from "./ModalResults";
export default {
  name: "ModalContent",
  props: {
    standings: Array,
    teamId: [Function, Object]
  },
  components: { ModalResults },
  data() {
    return {
      results: []
    };
  },
  methods: {
    getResults(teamId) {
      getData.getTeamResults
        .get(teamId.teamId + "/matches?status=FINISHED")
        .then(response => {
          this.results = response.data.matches;
          this.$bvModal.show("modalId" + teamId.teamIndex);
        })
        .catch(error => console.log(error));
    }
  },

  watch: {
    teamId() {
      let teamId = this.$props.teamId;
      this.teamId = teamId;
      this.getResults(this.teamId);
    }
  }
};
</script>

<style>
</style>