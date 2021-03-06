<template>
  <div id="app">
    {{ set }}
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-for="(entry, index) in set" :key="index">
        {{ entry }}
        <router-link :to="'/section/' + index">Section {{ index }}</router-link>
        |
      </span>
    </div>
    <router-view />
    <div class="debugging">
      deletedEntries:
      <span v-if="deletedEntries.length === 0">
        No way back.
      </span>
      <div v-else>
        {{ deletedEntries }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      set: ["1", "2", "3"],
      deletedEntries: []
    };
  }
});
</script>

<style lang="scss">
.debugging {
  color: #bbb;
}
</style>
