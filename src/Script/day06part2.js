import { nextPosition } from "./day06part1";

function findLoop(input, startPosition) {
  let curPosition = startPosition;
  let curDirection = "up";

  const visitedPosition = [];
  let result;

  for (let step = 0; step < 2; step++) {
    const { validation, position, direction } = nextPosition(
      input,
      curPosition,
      curDirection
    );
    if (validation === "leaving") {
      result = "leaving";
      break;
    } else {
      const symbolWord = `${curDirection}|${direction}`;

      let symbol;
      switch (symbolWord) {
        case "up|up":
          symbol = "i";
          break;
        case "down|down":
          symbol = "|";
          break;
        case "right|right":
          symbol = "-";
          break;
        case "left|left":
          symbol = "_";
          break;
        case "up|right":
          symbol = "F";
          break;
        case "left|down":
          symbol = "f";
          break;
        case "down|right":
          symbol = "l";
          break;
        case "left|up":
          symbol = "L";
          break;
        case "right|up":
          symbol = "J";
          break;
        case "down|left":
          symbol = "j";
          break;
        case "up|left":
          symbol = "T";
          break;
        case "right|down":
          symbol = "t";
          break;
        default:
      }

      if (
        !visitedPosition.includes(`${curPosition.i}:${curPosition.j}:${symbol}`)
      ) {
        visitedPosition.push(`${curPosition.i}:${curPosition.j}:${symbol}`);
      } else if (
        visitedPosition.includes(`${curPosition.i}:${curPosition.j}:${symbol}`)
      ) {
        result = "loop";
        break;
      }

      step = 0;
      curPosition = position;
      curDirection = direction;
    }
  }

  return result;
}

function fnDay06Part2(input) {
  const inputSplitted = input.split("\n");

  const startPosition = {};
  for (let i = 0; i < inputSplitted.length; i++) {
    for (let j = 0; j < inputSplitted[i].length; j++) {
      if (inputSplitted[i][j] === "^") {
        startPosition.i = i;
        startPosition.j = j;
      }
    }
  }

  let curPosition = startPosition;
  let curDirection = "up";
  const visitedPosition = [`${startPosition.i}:${startPosition.j}`];

  for (let step = 0; step < 2; step++) {
    const { validation, position, direction } = nextPosition(
      inputSplitted,
      curPosition,
      curDirection
    );
    if (validation === "leaving") break;
    else {
      step = 0;
      curPosition = position;
      curDirection = direction;

      !visitedPosition.includes(`${curPosition.i}:${curPosition.j}`) &&
        visitedPosition.push(`${curPosition.i}:${curPosition.j}`);
    }
  }

  const positionNewObstruction = [];
  for (let i = 0; i < visitedPosition.length; i++) {
    const newObstructionI = visitedPosition[i].split(":")[0];
    const newObstructionJ = visitedPosition[i].split(":")[1];

    const newInput = inputSplitted.slice();
    newInput[newObstructionI] =
      newInput[newObstructionI].slice(0, Number(newObstructionJ)) +
      "#" +
      newInput[newObstructionI].slice(Number(newObstructionJ) + 1);

    const result = findLoop(newInput, startPosition);
    if (result === "loop") {
      positionNewObstruction.push(visitedPosition[i]);
    }
  }

  return positionNewObstruction.length;
}

export default fnDay06Part2;

// example: 6
// final: 1697
