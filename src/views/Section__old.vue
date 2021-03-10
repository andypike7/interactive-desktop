<template>
  <div class="wrapper">
    <div class="nav">
      <span>
        <router-link to="/" class="nav__link">Home</router-link>
      </span>
      <span v-for="section in sections" :key="section.name">
        |
        <router-link
          :to="section.to"
          :class="[
            'nav__link',
            { 'nav__link--active': section.id === +$route.params.id },
          ]"
        >
          {{ section.name }}</router-link
        >
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
        :block="block"
        :key="`k_${index}`"
        :index="index"
        @activate="activateBlock(index)"
        @updateBlock="updateBlock(block, index)"
        @removeBlock="removeBlock(index)"
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
import Blockcomp from '@/views/Blockcomp.vue';

@Component({
  components: { Blockcomp },
})
export default class SectionPage extends Vue {
  blocks: Block[] = [];
  removedBlocks: Block[] = [];
  activeIndex = 0;
  config = CONFIG;

  // Actions

  addBlock(centered = false): void {
    this.blocks.push({
      name: `I'm element #${this.nextIndex}.`,
      width: CONFIG.DEFAULT_BLOCK_WIDTH,
      height: CONFIG.DEFAULT_BLOCK_HEIGHT,
      x: centered ? Utils.centeredX() : Utils.randomX(),
      y: centered ? Utils.centeredY() : Utils.randomY(),
      z: this.nextIndex,
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

    console.log('*** SS 1');
    this.saveState();
  }

  get nextIndex(): number {
    return this.blocks.length
      ? this.blocks.reduce((acc, el) => Math.max(acc, el.z), 0) + 1
      : 0;
  }

  get sections(): Section[] {
    return getNavMenu();
  }

  // State Managing

  @Watch('$route.params.id')
  updateSection() {
    const blocks = this.$store.state.blocks[this.$route.params.id];

    this.blocks = blocks && blocks.length ? blocks : [];
  }

  beforeMount() {
    // this.$store.dispatch('getBlocks');
  }

  mounted() {
    // console.clear();
    console.log('-------------- 1');
    // this.$store.commit('getBlocks');
    // this.$store.dispatch('getBlocks');
    this.blocks = this.$store.state.blocks[this.$route.params.id];
    if (!this.blocks) {
      this.blocks = [];
    }
    // this.updateSection();
    console.log('-------------- 2');
  }

  @Watch('blocks')
  saveState() {
    console.log('*** SS 3');
    console.log('*** id:', +this.$route.params.id - 1);
    console.log('*** saveState:', this.blocks);
    this.$store.commit('updateBlocks', {
      blocks: this.blocks,
      index: +this.$route.params.id - 1,
    });
  }

  updateBlock(block: Block, index: number) {
    // console.log('*** updateBlock:', index);
    this.blocks[index] = block;
    console.log('*** SS 2');
    this.saveState();
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
}
.nav__link {
  color: black;
  text-decoration: none;
  padding: 5px;
  &:hover {
    background: #eee;
  }
}
.nav__link--active {
  cursor: default;
  background: #eee;
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
</style>
