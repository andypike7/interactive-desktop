<template>
  <a :href="href" target="_blank">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class SectionPage extends Vue {
  @Prop(String)
  href = '';
}
</script>
