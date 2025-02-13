import { blink } from "./day11part1";

function fnDay11Part2(input) {
  const inputSplitted = input.split(" ").map((el) => Number(el));

  const inputMap = new Map();
  for (let i = 0; i < inputSplitted.length; i++) {
    inputMap.set(inputSplitted[i], 1);
  }

  const amountBlink = 75;
  let stones = inputMap;
  for (let i = 0; i < amountBlink; i++) {
    const newStones = blink(stones);
    stones = newStones;
  }

  const amountStones = [...stones.values()];

  return amountStones.reduce((acc, num) => acc + num, 0);
}

export default fnDay11Part2;
