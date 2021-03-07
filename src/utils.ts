import { CONFIG } from "@/config";

export const Utils = {
  centeredX() {
    return (CONFIG.BOARD_WIDTH - CONFIG.DEFAULT_BLOCK_WIDTH) / 2;
  },
  centeredY() {
    return (CONFIG.BOARD_HEIGHT - CONFIG.DEFAULT_BLOCK_HEIGHT) / 2;
  },
  randomX() {
    return (
      Math.trunc(
        (Math.random() * (CONFIG.BOARD_WIDTH - CONFIG.DEFAULT_BLOCK_WIDTH)) /
          CONFIG.GRID
      ) * CONFIG.GRID
    );
  },
  randomY() {
    return (
      Math.trunc(
        (Math.random() * (CONFIG.BOARD_HEIGHT - CONFIG.DEFAULT_BLOCK_HEIGHT)) /
          CONFIG.GRID
      ) * CONFIG.GRID
    );
  }
};
