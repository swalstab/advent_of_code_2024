function nextPosition(input, position, direction) {
  let tempDirection = direction;
  let tempI, tempJ, i, j;
  let validation = "not leaving";

  for (let k = 0; k < 2; k++) {
    switch (tempDirection) {
      case "up":
        tempI = position.i - 1;
        tempJ = position.j;
        break;
      case "down":
        tempI = position.i + 1;
        tempJ = position.j;
        break;
      case "right":
        tempI = position.i;
        tempJ = position.j + 1;
        break;
      case "left":
        tempI = position.i;
        tempJ = position.j - 1;
        break;
      default:
    }

    if (
      tempI === -1 ||
      tempJ === -1 ||
      tempI === input.length ||
      tempJ === input[0].length
    ) {
      k = 20;
      validation = "leaving";
    } else if (input[tempI][tempJ] !== "#") {
      i = tempI;
      j = tempJ;
      k = 20;
    } else {
      k = 0;
      switch (tempDirection) {
        case "up":
          tempDirection = "right";
          break;
        case "down":
          tempDirection = "left";
          break;
        case "right":
          tempDirection = "down";
          break;
        case "left":
          tempDirection = "up";
          break;
        default:
      }
    }
  }

  return { position: { i, j }, validation, direction: tempDirection };
}

function fnDay06Part1(input) {
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
  const visitedField = [`${startPosition.i}|${startPosition.j}`];

  for (let i = 0; i < 2; i++) {
    const { validation, position, direction } = nextPosition(
      inputSplitted,
      curPosition,
      curDirection
    );
    if (validation === "leaving") break;
    else {
      i = 0;
      curPosition = position;
      curDirection = direction;
      visitedField.push(`${curPosition.i}|${curPosition.j}`);
    }
  }

  return new Set(visitedField).size;
}

export default fnDay06Part1;
export { nextPosition };

// example: 41
// final: 4988
