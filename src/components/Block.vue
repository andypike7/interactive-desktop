<template>
  <vue-draggable-resizable
    :x="block.x"
    :y="block.y"
    :z="block.z"
    :w="block.width"
    :h="block.height"
    :grid="[config.GRID, config.GRID]"
    :minWidth="config.MIN_BLOCK_WIDTH"
    :minHeight="config.MIN_BLOCK_HEIGHT"
    :style="{ background: block.background }"
    class="block"
    parent
    @activated="activateBlock"
    @dragging="blockDragged"
    @resizing="blockResized"
  >
    <div @click="removeBlock" class="remove-icon">
      X
    </div>
    <b>I'm element #{{ block.id + 1 }} of {{ block.section }}</b>
    <div class="coords">
      X = {{ block.x }}, Y = {{ block.y }}, Z = {{ block.z }}<br />
      W = {{ block.width }}, H = {{ block.height }}
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import { Block } from '@/interfaces';
import { CONFIG } from '@/config';

Vue.component('vue-draggable-resizable', VueDraggableResizable);

@Component
export default class Blockcomp extends Vue {
  @Prop() initialBlock!: Block;
  @Prop() index!: number;

  block = this.initialBlock;
  config = CONFIG;

  activateBlock(): void {
    this.$emit('activate', this.index);
  }

  removeBlock() {
    this.$emit('remove');
  }

  blockDragged(x: number, y: number): void {
    if (this.block) {
      this.block.x = x;
      this.block.y = y;
      this.$emit('update');
    }
  }

  blockResized(x: number, y: number, width: number, height: number): void {
    if (this.block) {
      this.block.x = x;
      this.block.y = y;
      this.block.width = width;
      this.block.height = height;
      this.$emit('update');
    }
  }

  mounted() {
    this.block = this.initialBlock;
  }
}
</script>

<style lang="scss" scoped>
.block {
  border: 1px solid red;
  user-select: none !important;
  cursor: move;
  padding: 5px;
}
.coords {
  border-top: 1px dotted black;
  margin-top: 5px;
  padding-top: 5px;
}
.remove-icon {
  background: red;
  color: white;
  font-weight: bold;
  padding: 0 3px;
  float: right;
  cursor: pointer;
  &:hover {
    color: yellow;
    background: maroon;
  }
}
</style>
