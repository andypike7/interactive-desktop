import { CONFIG, DEFAULT_NUMBER_OF_SECTIONS } from "@/config";
import { Section } from "@/interfaces";

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

export function getNavMenu(): Section[] {
  const sections: Section[] = [];

  for (let i = 1; i <= DEFAULT_NUMBER_OF_SECTIONS; i++) {
    sections.push({
      name: `Section ${i}`,
      to: `/section/${i}`
    });
  }
  return sections;
}
