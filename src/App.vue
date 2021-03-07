<template>
  <div id="app">
    <div class="nav">
      <span class="nav__link">
        <router-link to="/">Home</router-link>
      </span>
      <span v-for="section in sections" :key="section.name" class="nav__link">
        |
        <router-link :to="section.to">{{ section.name }}</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Section } from "@/interfaces";
import { getNavMenu } from "@/utils";

@Component
export default class App extends Vue {
  get sections(): Section[] {
    return getNavMenu();
  }
}
</script>

<style lang="scss">
body {
  font: 14px "Verdana";
}
.nav__link a {
  color: black;
  text-decoration: none;
  padding: 5px;
  &:hover {
    background: #eee;
  }
}
</style>

<style scoped>
.nav {
  text-align: center;
  color: black;
}
</style>
