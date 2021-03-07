<template>
  <div class="home">
    <h1>Please select a section</h1>
    <router-link
      v-for="link in links"
      :to="link.to"
      :key="link.name"
      class="link"
    >
      {{ link.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Section } from "@/interfaces";
import { DEFAULT_NUMBER_OF_SECTIONS } from "@/config";

@Component
export default class Home extends Vue {
  links: Section[] = [];

  mounted() {
    for (let i = 1; i <= DEFAULT_NUMBER_OF_SECTIONS; i++) {
      this.links.push({
        name: `Section ${i.toString()}`,
        to: `/section/${i}`
      });
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.link {
  font-size: 16px;
  display: block;
  border: 1px solid black;
  padding: 10px;
  width: 200px;
  margin: 10px auto;
  text-align: center;
  color: black;
  text-decoration: none;
  &:hover {
    background: #eee;
  }
}
</style>
