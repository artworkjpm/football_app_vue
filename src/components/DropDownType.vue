<template>
  <div class="col col-sm-4 col-md-4 col-lg-2">
    <b-form-group label="Season">
      <b-form-select v-model="year" :options="optionYears" @change="onChange('Year')" />
    </b-form-group>
    <b-form-group label="Type of games">
      <b-form-select v-model="standingType" :options="options" @change="onChange('standingType')" />
    </b-form-group>
  </div>
</template>