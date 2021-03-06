<template>
  <div class="about">
    <h1>This is about Section #{{ $route.params.id }}</h1>
    <div v-for="(block, index) in blocks" class="block" :key="index">
      <div @click="remove(index)" class="remove-icon">
        X
      </div>
      Name: {{ block.name }}
    </div>
    <button @click="add">
      Add
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

interface Block {
  name: string;
}

const DEFAULT_NUMBER_OF_BLOCKS = 5;

@Component
export default class Section extends Vue {
  // data() {
  //   return {
  // lala: "lala",
  //   };
  // },
  // blocks: Block[],
  blocks: Block[] = [];
  nextIndex = 1;

  remove(index: number): void {
    this.blocks.splice(index, 1);
  }

  add(): void {
    this.blocks.push({
      name: `I'm an element #${this.nextIndex++}.`
    });
  }

  mounted() {
    for (let i = 1; i <= DEFAULT_NUMBER_OF_BLOCKS; i++) {
      this.add();
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
