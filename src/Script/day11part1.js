function blink(map) {
  const mapToArr = [...map];
  const newMap = new Map();
  for (let i = 0; i < mapToArr.length; i++) {
    const numBefore = mapToArr[i][0];
    const amount = mapToArr[i][1];

    const num = [];
    if (numBefore === 0) {
      num.push(1);
    } else if (`${numBefore}`.length % 2 === 0) {
      num.push(Number(`${numBefore}`.slice(0, `${numBefore}`.length / 2)));
      num.push(Number(`${numBefore}`.slice(`${numBefore}`.length / 2)));
    } else {
      num.push(numBefore * 2024);
    }

    for (let j = 0; j < num.length; j++) {
      if (newMap.has(num[j])) {
        const newAmount = newMap.get(num[j]) + amount;
        newMap.set(num[j], newAmount);
      } else {
        newMap.set(num[j], amount);
      }
    }
  }

  return newMap;
}

function fnDay11Part1(input) {
  const inputSplitted = input.split(" ").map((el) => Number(el));

  const inputMap = new Map();
  for (let i = 0; i < inputSplitted.length; i++) {
    inputMap.set(inputSplitted[i], 1);
  }

  const amountBlink = 25;
  let stones = inputMap;
  for (let i = 0; i < amountBlink; i++) {
    const newStones = blink(stones);
    stones = newStones;
  }

  const amountStones = [...stones.values()];

  return amountStones.reduce((acc, num) => acc + num, 0);
}

export default fnDay11Part1;
export { blink };
