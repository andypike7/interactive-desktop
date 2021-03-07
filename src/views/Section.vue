<template>
  <div class="wrapper">
    <h1>This is Section #{{ $route.params.id }}</h1>
    <div class="board">
      <vue-draggable-resizable
        v-for="(block, index) in blocks"
        :key="index"
        :width="block.width"
        :height="block.height"
        :minWidth="config.MIN_BLOCK_WIDTH"
        :minHeight="config.MIN_BLOCK_HEIGHT"
        :grid="[config.GRID, config.GRID]"
        :x="block.x"
        :y="block.y"
        :z="block.z"
        class="block"
        :style="{ background: block.background }"
        @activated="blockActivated(index)"
        @dragging="blockDragged"
        @resizing="blockResized"
      >
        <div @click="removeBlock(index)" class="remove-icon">
          X
        </div>
        <b>{{ block.name }}</b>
        <div class="coords">
          X = {{ block.x }}, Y = {{ block.y }}, Z = {{ block.z }}<br />
          W = {{ block.width }}, H = {{ block.height }}
        </div>
      </vue-draggable-resizable>
    </div>
    <button @click="addBlock">
      Add
    </button>
    <button @click="restoreBlock" :disabled="!removedBlocks.length">
      Restore
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DEFAULT_NUMBER_OF_BLOCKS, CONFIG } from "@/config";
import { Block } from "@/interfaces";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

Vue.component("vue-draggable-resizable", VueDraggableResizable);

@Component
export default class Section extends Vue {
  blocks: Block[] = [];
  removedBlocks: Block[] = [];
  nextIndex = 0;
  activeBlock = 0;
  config = CONFIG;

  addBlock(): void {
    this.blocks.push({
      name: `I'm an element #${++this.nextIndex}.`,
      width: CONFIG.DEFAULT_BLOCK_WIDTH,
      height: CONFIG.DEFAULT_BLOCK_HEIGHT,
      x: Math.trunc(Math.random() * 30) * CONFIG.GRID,
      y: Math.trunc(Math.random() * 30) * CONFIG.GRID,
      z: this.blocks.length,
      background:
        CONFIG.SET_OF_BACKGROUNDS[
          this.blocks.length % CONFIG.SET_OF_BACKGROUNDS.length
        ]
    });
  }

  removeBlock(index: number): void {
    const removedBlocks = this.blocks.splice(index, 1);

    this.removedBlocks.push(removedBlocks[0]);
  }

  restoreBlock(): void {
    const restoredBlock = this.removedBlocks.pop();

    if (restoredBlock !== undefined) {
      restoredBlock.x = (CONFIG.BOARD_WIDTH - CONFIG.DEFAULT_BLOCK_WIDTH) / 2;
      restoredBlock.y = (CONFIG.BOARD_HEIGHT - CONFIG.DEFAULT_BLOCK_HEIGHT) / 2;
      restoredBlock.width = CONFIG.DEFAULT_BLOCK_WIDTH;
      restoredBlock.height = CONFIG.DEFAULT_BLOCK_HEIGHT;
      this.blocks.push(restoredBlock);
    }
  }

  blockActivated(index: number): void {
    this.activeBlock = index;
    // console.log("*** CLICK!", index);

    console.log(
      "*** IN:",
      this.blocks.map(block => {
        return block.z;
      })
    );
    console.log("*** index:", index);
    const z = this.blocks[this.activeBlock].z;
    console.log("*** Z:", z);

    this.blocks.forEach((block, index2) => {
      if (index === index2) {
        block.z = this.nextIndex - 1;
      } else if (block.z > z) {
        block.z--;
      }
    });

    console.log(
      "*** OUT:",
      this.blocks.map(block => {
        return block.z;
      })
    );
  }

  blockResized(x: number, y: number, width: number, height: number): void {
    const block = this.blocks[this.activeBlock];

    block.x = x;
    block.y = y;
    block.width = width;
    block.height = height;
  }

  blockDragged(x: number, y: number): void {
    const block = this.blocks[this.activeBlock];

    block.x = x;
    block.y = y;
  }

  mounted() {
    for (let i = 0; i < DEFAULT_NUMBER_OF_BLOCKS; i++) {
      this.addBlock();
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
}
.board {
  border: 2px solid black;
  padding: 10px;
  width: 800px;
  height: 500px;
  margin: 0 auto 20px;
}

.block {
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
