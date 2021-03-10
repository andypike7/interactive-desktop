<template>
  <div class="wrapper">
    <div class="nav">
      <span class="nav__link">
        <router-link to="/">Home</router-link>
      </span>
      <span
        v-for="section in sections"
        :key="section.name"
        :class="[
          'nav__link',
          { 'nav__link--active': section.to === $route.path },
        ]"
      >
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
      <BlockComp
        v-for="(block, index) in blocks"
        :initial-block="block"
        :key="`${block.section}-${block.id}`"
        :index="index"
        @remove="removeBlock(index)"
        @activate="activateBlock(index)"
        @update="updateBlock(index)"
      />
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
import { getNavMenu } from '@/utils';
import { DEFAULT_NUMBER_OF_BLOCKS, CONFIG } from '@/config';
import { Section, Block } from '@/interfaces';
import { Utils } from '@/utils';
import BlockComp from '@/components/Block.vue';

@Component({
  components: { BlockComp },
})
export default class SectionPage extends Vue {
  blocks: Block[] = [];
  removedBlocks: Block[] = [];
  activeIndex = 0;
  config = CONFIG;

  // Actions

  addBlock(centered = false): void {
    this.blocks.push({
      id: this.nextId,
      section: +this.$route.params.id,
      width: CONFIG.DEFAULT_BLOCK_WIDTH,
      height: CONFIG.DEFAULT_BLOCK_HEIGHT,
      x: centered ? Utils.centeredX() : Utils.randomX(),
      y: centered ? Utils.centeredY() : Utils.randomY(),
      z: this.blocks.length,
      background:
        CONFIG.SET_OF_BACKGROUNDS[
          this.nextId % CONFIG.SET_OF_BACKGROUNDS.length
        ],
    });
  }

  removeBlock(index: number): void {
    const removed = this.blocks.splice(index, 1);

    this.removedBlocks.push(removed[0]);
  }

  restoreBlock(): void {
    const restoredBlock = this.removedBlocks.pop();

    if (restoredBlock !== undefined) {
      restoredBlock.x = Utils.centeredX();
      restoredBlock.y = Utils.centeredY();
      restoredBlock.z = this.nextIndex;
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

  // Misc

  activateBlock(activeIndex: number) {
    this.activeIndex = activeIndex;

    const currentZ = this.blocks[activeIndex].z;
    const maxZ = this.nextIndex - 1;

    this.blocks.forEach((block, index) => {
      if (activeIndex === index) {
        block.z = maxZ;
      } else if (block.z > currentZ) {
        block.z--;
      }
    });
    this.saveState();
  }

  get nextIndex(): number {
    return this.blocks.length
      ? this.blocks.reduce((acc, block) => Math.max(acc, block.z), 0) + 1
      : 0;
  }

  get nextId(): number {
    const set = this.blocks.concat(this.removedBlocks);

    const max = set.reduce((acc, block) => {
      if (block.section !== +this.$route.params.id || block.id < acc) {
        return acc;
      } else {
        return block.id;
      }
    }, -1);

    return max + 1;
  }

  updateBlock(block: Block, index: number) {
    this.blocks[index] = block;
    this.saveState();
  }

  get sections(): Section[] {
    return getNavMenu();
  }

  // State Management

  @Watch('$route.params.id')
  updateSection() {
    const blocks = this.$store.state.blocks[this.$route.params.id];
    const removedBlocks = this.$store.state.removedBlocks[
      this.$route.params.id
    ];

    this.blocks = blocks ? blocks : [];
    this.removedBlocks = removedBlocks ? removedBlocks : [];
  }

  mounted() {
    this.updateSection();
  }

  @Watch('blocks')
  saveState() {
    this.$store.commit('updateBlocks', {
      blocks: this.blocks,
      removedBlocks: this.removedBlocks,
      section: this.$route.params.id,
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
.nav__link--active a {
  background: #eee;
  cursor: default;
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
