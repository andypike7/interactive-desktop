<template>
  <div class="wrapper">
    <h1>This is Section #{{ $route.params.id }}</h1>
    <div class="board">
      <vue-draggable-resizable
        v-for="(block, index) in blocks"
        :key="index"
        :minWidth="config.MIN_BLOCK_WIDTH"
        :minHeight="config.MIN_BLOCK_HEIGHT"
        :grid="[config.GRID, config.GRID]"
        :x="block.x"
        :y="block.y"
        :z="block.z"
        :w="block.width"
        :h="block.height"
        class="block"
        :style="{ background: block.background }"
        parent
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
    <button @click="generateBlocks">
      Geneate
    </button>
    <button @click="clearBlocks" :disabled="!blocks.length">
      Clear
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { DEFAULT_NUMBER_OF_BLOCKS, CONFIG } from "@/config";
import { Block } from "@/interfaces";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

Vue.component("vue-draggable-resizable", VueDraggableResizable);

@Component
export default class Section extends Vue {
  blocks: Block[] = [];
  removedBlocks: Block[] = [];
  activeIndex = 0;
  config = CONFIG;

  @Watch("blocks")
  saveState() {
    localStorage.setItem("blocks", JSON.stringify(this.blocks));
  }

  nextIndex() {
    return this.blocks.reduce((acc, el) => Math.max(acc, el.z), 0) + 1;
  }

  addBlock(centered = false): void {
    this.blocks.push({
      name: `I'm an element #${this.nextIndex()}.`,
      width: CONFIG.DEFAULT_BLOCK_WIDTH,
      height: CONFIG.DEFAULT_BLOCK_HEIGHT,
      x: centered ? this.centeredX() : this.randomX(),
      y: centered ? this.centeredY() : this.randomY(),
      z: this.blocks.length,
      background:
        CONFIG.SET_OF_BACKGROUNDS[
          this.blocks.length % CONFIG.SET_OF_BACKGROUNDS.length
        ]
    });
  }

  generateBlocks() {
    for (let i = 0; i < DEFAULT_NUMBER_OF_BLOCKS; i++) {
      this.addBlock();
    }
  }

  clearBlocks() {
    this.blocks = [];
  }

  randomX() {
    return (
      Math.trunc(
        (Math.random() * (CONFIG.BOARD_WIDTH - CONFIG.DEFAULT_BLOCK_WIDTH)) /
          CONFIG.GRID
      ) * CONFIG.GRID
    );
  }
  randomY() {
    return (
      Math.trunc(
        (Math.random() * (CONFIG.BOARD_HEIGHT - CONFIG.DEFAULT_BLOCK_HEIGHT)) /
          CONFIG.GRID
      ) * CONFIG.GRID
    );
  }

  removeBlock(index: number): void {
    const removedBlocks = this.blocks.splice(index, 1);

    this.removedBlocks.push(removedBlocks[0]);
  }

  centeredX() {
    return (CONFIG.BOARD_WIDTH - CONFIG.DEFAULT_BLOCK_WIDTH) / 2;
  }
  centeredY() {
    return (CONFIG.BOARD_HEIGHT - CONFIG.DEFAULT_BLOCK_HEIGHT) / 2;
  }

  restoreBlock(): void {
    const restoredBlock = this.removedBlocks.pop();

    if (restoredBlock !== undefined) {
      restoredBlock.x = this.centeredX();
      restoredBlock.y = this.centeredY();
      restoredBlock.width = CONFIG.DEFAULT_BLOCK_WIDTH;
      restoredBlock.height = CONFIG.DEFAULT_BLOCK_HEIGHT;
      this.blocks.push(restoredBlock);
    }
  }

  blockActivated(activeIndex: number): void {
    if (!this.blocks.length) {
      return;
    }
    this.activeIndex = activeIndex;

    const z = this.blocks[activeIndex].z;
    const next = this.nextIndex();

    this.blocks.forEach((block, index) => {
      if (activeIndex === index) {
        block.z = next - 1;
      } else if (block.z > z && block.z !== 0) {
        block.z--;
      }
    });
  }

  blockResized(x: number, y: number, width: number, height: number): void {
    const block = this.blocks[this.activeIndex];

    if (block) {
      block.x = x;
      block.y = y;
      block.width = width;
      block.height = height;
      this.saveState();
    }
  }

  blockDragged(x: number, y: number): void {
    const block = this.blocks[this.activeIndex];

    if (block) {
      block.x = x;
      block.y = y;
      this.saveState();
    }
  }

  mounted() {
    const blocks = localStorage.getItem("blocks");

    if (blocks) {
      this.blocks = JSON.parse(blocks);
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
button {
  font-size: 24px;
  margin: 0 5px;
}
</style>
