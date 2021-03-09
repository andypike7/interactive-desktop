<template>
  <div class="home">
    <h1>Please select a section</h1>
    <router-link
      v-for="section in sections"
      :to="section.to"
      :key="section.name"
      class="link"
    >
      {{ section.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Section } from '@/interfaces';
import { getNavMenu } from '@/utils';

@Component
export default class Home extends Vue {
  get sections(): Section[] {
    return getNavMenu();
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
