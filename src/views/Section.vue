<template>
  <div class="about">
    <h1>This is about Section {{ $route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return { lala: "lala" };
  }
});
</script>
