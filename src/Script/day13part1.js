function prepareInput(input, increasePrizePosition) {
  const inputSplitted = input.split("\n");

  const machines = [];
  let tempMachine;
  for (let i = 0; i < inputSplitted.length; i++) {
    if (inputSplitted[i].length === 0) {
      machines.push(tempMachine);
      tempMachine = {};
    }

    if (inputSplitted[i].slice(0, 6) === "Button") {
      const button = inputSplitted[i].split(":")[0].split(" ")[1];
      const x = Number(
        inputSplitted[i].split(":")[1].split(",")[0].split("+")[1]
      );
      const y = Number(
        inputSplitted[i].split(":")[1].split(",")[1].split("+")[1]
      );
      tempMachine = { ...tempMachine, [`${button}X`]: x };
      tempMachine = { ...tempMachine, [`${button}Y`]: y };
    }

    if (inputSplitted[i].slice(0, 5) === "Prize") {
      const prizeX =
        Number(inputSplitted[i].split(":")[1].split(",")[0].split("=")[1]) +
        increasePrizePosition;
      const prizeY =
        Number(inputSplitted[i].split(":")[1].split(",")[1].split("=")[1]) +
        increasePrizePosition;
      tempMachine = { ...tempMachine, prizeX };
      tempMachine = { ...tempMachine, prizeY };
    }
    i === inputSplitted.length - 1 && machines.push(tempMachine);
  }

  return machines;
}

function determineTokens(machines) {
  const tokenA = 3;
  const tokenB = 1;
  const tokens = [];
  for (let i = 0; i < machines.length; i++) {
    const b =
      (machines[i].prizeY * machines[i].AX -
        machines[i].prizeX * machines[i].AY) /
      (machines[i].BY * machines[i].AX - machines[i].BX * machines[i].AY);
    if (!Number.isInteger(b)) continue;
    const a = (machines[i].prizeX - b * machines[i].BX) / machines[i].AX;
    tokens.push(a * tokenA + b * tokenB);
  }

  return tokens;
}

function fnDay13Part1(input) {
  const machines = prepareInput(input, 0);
  const tokens = determineTokens(machines);
  const sum = tokens.reduce((acc, num) => acc + num);

  return sum;
}

export default fnDay13Part1;
export { prepareInput, determineTokens };
