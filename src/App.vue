<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-for="section in sections" :key="section.name">
        <router-link :to="`/section/${section.name}`">
          Section {{ section.name }}
        </router-link>
        |
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
    for (let i = 0; i < DEFAULT_NUMBER_OF_SECTIONS; i++) {
      this.sections.push({ name: i.toString() });
    }
  }
}
</script>
