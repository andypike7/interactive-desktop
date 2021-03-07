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
import { DEFAULT_NUMBER_OF_SECTIONS } from "@/config";
import { Section } from "@/interfaces";

@Component
export default class App extends Vue {
  sections: Section[] = [];

  mounted() {
    for (let i = 1; i <= DEFAULT_NUMBER_OF_SECTIONS; i++) {
      this.sections.push({
        name: `Section ${i}`,
        to: `/section/${i}`
      });
    }
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
