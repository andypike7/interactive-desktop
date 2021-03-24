<template>
  <div>
    <a :href="href" target="_blank">
      <slot>[Default slot]</slot>
    </a>
    <slot name="named-1">[Default named slot 1]</slot>
    <slot name="named-2">[Default named slot 2]</slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class SlotsComponent extends Vue {
  @Prop(String)
  href = '';
}
</script>
