<template>
  <div id="app">
    {{ set }}
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-for="(entry, index) in set" :key="index">
        {{ entry }}
        <router-link :to="'/section-' + index">About {{ index }}</router-link> |
      </span>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      set: ["1", "2", "3"]
    };
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
