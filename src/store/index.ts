import Vue from 'vue';
import Vuex from 'vuex';
import { Block } from '@/interfaces';

Vue.use(Vuex);

function getBlocks(): Array<Block> {
  let arr: Array<Block> = [];
  const data = localStorage.getItem('blocks');

  try {
    if (data) {
      arr = JSON.parse(data);
    }
  } catch (error) {
    console.log(error);
  }

  return arr;
}

export default new Vuex.Store({
  state: {
    blocks: getBlocks(),
  },
  mutations: {
    updateBlocks(state, { blocks, index }) {
      state.blocks[index] = blocks;
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
  },
  actions: {},
  modules: {},
});
