<template>
  <div class="about">
    <h1>This is Section #{{ $route.params.id }}</h1>
    <vue-draggable-resizable
      v-for="(block, index) in blocks"
      :key="index"
      :w="block.width"
      :h="block.height"
      :style="{ background: block.background }"
    >
      <div @click="removeBlock(index)" class="remove-icon">
        X
      </div>
      I'm a <b>vue-draggable-resizable</b> Block!
      <div class="block">Name: {{ block.name }}</div>
    </vue-draggable-resizable>
    <button @click="addBlock">
      Add
    </button>
    <button @click="restoreBlock" :disabled="!removedBlocks.length">
      Restore
    </button>
    <!-- {{ removedBlocks }} -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import {
  DEFAULT_NUMBER_OF_BLOCKS,
  DEFAULT_BLOCK_WIDTH,
  DEFAULT_BLOCK_HEIGHT,
  SET_OF_BACKGROUNDS
} from "@/config";
import { Block } from "@/interfaces";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

Vue.component("vue-draggable-resizable", VueDraggableResizable);

@Component
export default class Section extends Vue {
  blocks: Block[] = [];
  removedBlocks: Block[] = [];
  nextIndex = 0;

  addBlock(): void {
    this.blocks.push({
      name: `I'm an element #${++this.nextIndex}.`,
      width: DEFAULT_BLOCK_WIDTH,
      height: DEFAULT_BLOCK_HEIGHT,
      background:
        SET_OF_BACKGROUNDS[this.blocks.length % SET_OF_BACKGROUNDS.length]
    });
  }

  removeBlock(index: number): void {
    const removedBlocks = this.blocks.splice(index, 1);

    this.removedBlocks.push(removedBlocks[0]); // yeah, KISS
  }

  restoreBlock(): void {
    const restoredBlock = this.removedBlocks.pop();

    if (restoredBlock !== undefined) {
      restoredBlock.width = DEFAULT_BLOCK_WIDTH;
      restoredBlock.height = DEFAULT_BLOCK_HEIGHT;
      this.blocks.push(restoredBlock); // yeah, KISS
    }
  }

  mounted() {
    for (let i = 0; i < DEFAULT_NUMBER_OF_BLOCKS; i++) {
      this.addBlock();
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  border: 1px solid black;
  padding: 5px;
  margin: 5px auto;
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
