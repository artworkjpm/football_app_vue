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
          <ModalResults :teamId="teamId" />
        </b-tab>
        <b-tab title="Fixtures">
          <ModalFixtures :teamId="teamId" />
        </b-tab>
        <b-tab title="Squad">
          <ModalSquad :teamId="teamId" />
        </b-tab>
      </b-tabs>
    </b-modal>

    <b-modal :id="'showBadge' + i" v-for="(item,i) in standings" :key="'badge'+ i">
      <img :src="item.team.crestUrl" class="team-badge-full" alt />
    </b-modal>
  </div>
</template>

<script>
import ModalResults from "./ModalResults";
import ModalFixtures from "./ModalFixtures";
import ModalSquad from "./ModalSquad";
export default {
  name: "ModalContent",
  props: {
    standings: Array,
    teamId: [Function, Object]
  },
  components: { ModalResults, ModalFixtures, ModalSquad },
  watch: {
    teamId() {
      this.teamId = this.$props.teamId;
      this.$bvModal.show("modalId" + this.teamId.teamIndex);
    }
  }
};
</script>

<style>
</style>