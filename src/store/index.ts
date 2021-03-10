import Vue from 'vue';
import Vuex from 'vuex';
import { Block } from '@/interfaces';

Vue.use(Vuex);

function getBlocks(name: string): Block[] {
  let arr: Block[] = [];
  const data = localStorage.getItem(name);

  try {
    if (data) {
      arr = JSON.parse(data);
    }
  } catch (error) {
    console.log(`Internal error: ${error}.`);
  }

  return arr;
}

export default new Vuex.Store({
  state: {
    blocks: getBlocks('blocks'),
    removedBlocks: getBlocks('removedBlocks'),
  },
  mutations: {
    updateBlocks(state, { blocks, removedBlocks, section }) {
      state.blocks[section] = blocks;
      state.removedBlocks[section] = removedBlocks;
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
      localStorage.setItem(
        'removedBlocks',
        JSON.stringify(state.removedBlocks),
      );
    },
  },
  actions: {},
  modules: {},
});
