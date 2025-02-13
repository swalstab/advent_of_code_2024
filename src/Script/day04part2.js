function proveMAS(input, row, column) {
  const validationForward =
    (input[row - 1][column - 1] === "M" &&
      input[row + 1][column + 1] === "S") ||
    (input[row - 1][column - 1] === "S" &&
      input[row + 1][column + 1] === "M" &&
      true);

  const validationBackward =
    (input[row - 1][column + 1] === "M" &&
      input[row + 1][column - 1] === "S") ||
    (input[row - 1][column + 1] === "S" &&
      input[row + 1][column - 1] === "M" &&
      true);

  return validationForward && validationBackward;
}

function fnDay04Part2(input) {
  const inputSplitted = input.split("\n");

  let count = 0;
  for (let i = 0; i < inputSplitted.length; i++) {
    for (let j = 0; j < inputSplitted[i].length; j++) {
      if (inputSplitted[i][j] === "A") {
        if (i < 1 || i > inputSplitted.length - 2) continue;
        if (j < 1 || i > inputSplitted[i].length - 2) continue;
        proveMAS(inputSplitted, i, j) && count++;
      }
    }
  }

  return count;
}

export default fnDay04Part2;
