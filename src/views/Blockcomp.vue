<template>
  <vue-draggable-resizable
    :x="block.x"
    :y="block ? block.y : 0"
    :z="block ? block.z : 0"
    :w="block ? block.width : 0"
    :h="block ? block.height : 0"
    :grid="[config.GRID, config.GRID]"
    :minWidth="config.MIN_BLOCK_WIDTH"
    :minHeight="config.MIN_BLOCK_HEIGHT"
    class="block"
    :style="{ background: block.background }"
    parent
    @activated="activateBlock"
    @dragging="blockDragged"
    @resizing="blockResized"
  >
    <div @click="removeBlock" class="remove-icon">
      X
    </div>
    <b>{{ block.name }}</b>
    <div class="coords">
      X = {{ block.x }}, Y = {{ block.y }}, Z = {{ block.z }}<br />
      W = {{ block.width }}, H = {{ block.height }}
    </div>
    <!-- {{ block }} -->
  </vue-draggable-resizable>
</template>

<script lang="ts">
// vue-draggable-resizable
import Vue from 'vue';
import { Component, Prop /*, Watch*/ } from 'vue-property-decorator';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import { Block } from '@/interfaces';
import { CONFIG } from '@/config';

Vue.component('vue-draggable-resizable', VueDraggableResizable);

@Component
export default class Blockcomp extends Vue {
  @Prop() initialBlock!: Block;
  @Prop() index!: number;

  block: Block | null = null;
  config = CONFIG;

  activateBlock(): void {
    this.$emit('activateBlock', this.index);
  }

  removeBlock() {
    console.log('removeBlock', this.index);
    this.$emit('removeBlock', this.index);
  }

  blockDragged(x: number, y: number): void {
    if (this.block) {
      this.block.x = x;
      this.block.y = y;
      this.$emit('updateBlock', this.block, this.index);
    }
  }

  blockResized(x: number, y: number, width: number, height: number): void {
    if (this.block) {
      this.block.x = x;
      this.block.y = y;
      this.block.width = width;
      this.block.height = height;
      this.$emit('updateBlock', this.block, this.index);
    }
  }

  mounted() {
    console.clear();
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
  float: right;
  cursor: pointer;
  &:hover {
    color: yellow;
    background: maroon;
  }
}
</style>
