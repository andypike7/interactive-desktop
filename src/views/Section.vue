<template>
  <div class="wrapper">
    <div class="nav">
      <span class="nav__link">
        <router-link to="/">Home</router-link>
      </span>
      <span v-for="section in sections" :key="section.name" class="nav__link">
        |
        <router-link :to="section.to">{{ section.name }}</router-link>
      </span>
    </div>
    <h1>This is Section #{{ $route.params.id }}</h1>
    <div
      class="board"
      :style="{
        width: `${config.BOARD_WIDTH}px`,
        height: `${config.BOARD_HEIGHT}px`,
      }"
    >
      <Blockcomp
        v-for="(block, index) in blocks"
        :initial-block="block"
        :key="`k_${index}`"
        :index="index"
        @removeBlock="removeBlock(index)"
        @activateBlock="activateBlock(index)"
        @updateBlock="updateBlock(index)"
      />
      <!-- vue-draggable-resizable
        v-for="(block, index) in blocks"
        :key="index"
        :x="block.x"
        :y="block.y"
        :z="block.z"
        :w="block.width"
        :h="block.height"
        :grid="[config.GRID, config.GRID]"
        class="block"
        :style="{ background: block.background }"
        parent
        @dragging="blockDragged"
        @resizing="blockResized"
      >
        <b>{{ block.name }}</b>
        <div class="coords">
          X = {{ block.x }}, Y = {{ block.y }}, Z = {{ block.z }}<br />
          W = {{ block.width }}, H = {{ block.height }}
        </div>
      </!-->
    </div>
    <div class="actions-panel">
      <button @click="addBlock">
        Add
      </button>
      <button @click="restoreBlock" :disabled="!removedBlocks.length">
        Restore
      </button>
      <button @click="generateBlocks">
        Generate
      </button>
      <button @click="clearBlocks" :disabled="!blocks.length">
        Clear
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import { getNavMenu } from '@/utils';
import { DEFAULT_NUMBER_OF_BLOCKS, CONFIG } from '@/config';
import { Section, Block } from '@/interfaces';
import { Utils } from '@/utils';
import Blockcomp from '@/views/Blockcomp.vue';

Vue.component('vue-draggable-resizable', VueDraggableResizable);

@Component({
  components: { Blockcomp },
})
export default class SectionPage extends Vue {
  blocks: Block[] = [];
  removedBlocks: Block[] = [];
  activeIndex = 0;
  config = CONFIG;

  activateBlock(index: number) {
    console.log('*** activateBlock:', index);

    if (!this.blocks.length) {
      return;
    }
    this.activeIndex = index;

    const z = this.blocks[index].z;
    const next = this.nextIndex;

    this.blocks.forEach((block, index2) => {
      if (index === index2) {
        block.z = next - 1;
      } else if (block.z > z && block.z !== 0) {
        block.z--;
      }
    });
  }

  blockActivated(activeIndex: number): void {
    if (!this.blocks.length) {
      return;
    }
    this.activeIndex = activeIndex;

    const z = this.blocks[activeIndex].z;
    const next = this.nextIndex;

    this.blocks.forEach((block, index) => {
      if (activeIndex === index) {
        block.z = next - 1;
      } else if (block.z > z && block.z !== 0) {
        block.z--;
      }
    });
  }

  updateBlock(block: Block, index: number) {
    this.blocks[index] = block;
    this.saveState();
  }

  // Actions

  addBlock(centered = false): void {
    this.blocks.push({
      name: `I'm element #${this.nextIndex}.`,
      width: CONFIG.DEFAULT_BLOCK_WIDTH,
      height: CONFIG.DEFAULT_BLOCK_HEIGHT,
      x: centered ? Utils.centeredX() : Utils.randomX(),
      y: centered ? Utils.centeredY() : Utils.randomY(),
      z: this.blocks.length,
      background:
        CONFIG.SET_OF_BACKGROUNDS[
          this.blocks.length % CONFIG.SET_OF_BACKGROUNDS.length
        ],
    });
  }

  restoreBlock(): void {
    const restoredBlock = this.removedBlocks.pop();

    if (restoredBlock !== undefined) {
      restoredBlock.x = Utils.centeredX();
      restoredBlock.y = Utils.centeredY();
      restoredBlock.width = CONFIG.DEFAULT_BLOCK_WIDTH;
      restoredBlock.height = CONFIG.DEFAULT_BLOCK_HEIGHT;
      this.blocks.push(restoredBlock);
    }
  }

  generateBlocks() {
    for (let i = 0; i < DEFAULT_NUMBER_OF_BLOCKS; i++) {
      this.addBlock();
    }
  }

  clearBlocks() {
    this.blocks = [];
  }

  removeBlock(index: number): void {
    const removedBlocks = this.blocks.splice(index, 1);

    this.removedBlocks.push(removedBlocks[0]);
  }

  // Misc

  get sections(): Section[] {
    return getNavMenu();
  }

  get nextIndex(): number {
    return this.blocks.reduce((acc, el) => Math.max(acc, el.z), 0) + 1;
  }

  // State Managing

  @Watch('$route.params.id')
  updateSection() {
    const blocks = this.$store.state.blocks[this.$route.params.id];

    if (blocks) {
      this.blocks = blocks;
    } else {
      this.blocks = [];
    }
  }

  mounted() {
    console.clear();
    this.updateSection();
  }

  @Watch('blocks')
  saveState() {
    this.$store.commit('updateBlocks', {
      blocks: this.blocks,
      index: this.$route.params.id,
    });
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
}
.nav {
  text-align: center;
  color: black;
  a {
    color: black;
    text-decoration: none;
    padding: 5px;
    &:hover {
      background: #eee;
    }
  }
}
.board {
  border: 2px solid black;
  padding: 10px;
  margin: 0 auto 20px;
}
.actions-panel button {
  font-size: 24px;
  margin: 0 5px;
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
  padding: 0 3px;
  &:hover {
    color: yellow;
    background: maroon;
  }
}
</style>
