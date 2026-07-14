function filterForBracket(input) {
  const filteredInput = [];
  for (let i = 0; i < input.length; i++) {
    let str = "";
    let validation = false;
    if (input[i][0] !== "(") continue;
    for (let j = 1; j < input[i].length; j++) {
      if (input[i][j] === ")") {
        validation = true;
        break;
      }
      str += input[i][j];
    }
    str.includes(",") && validation && filteredInput.push(str);
  }
  return filteredInput;
}

function filterForValidInstruction(input) {
  const result = [];
  for (let i = 0; i < input.length; i++) {
    const instruction = input[i].split(",");
    const first = Number(instruction[0]);
    const second = Number(instruction[1]);

    if (!isNaN(first) && !isNaN(second)) {
      result.push(first * second);
    }
  }
  return result;
}

function fnDay03Part1(input) {
  const inputSplitted = input.split("mul");
  const filteredInput = filterForBracket(inputSplitted);
  const result = filterForValidInstruction(filteredInput);
  const output = result.reduce((acc, num) => acc + num, 0);
  return output;
}

export default fnDay03Part1;
export { filterForBracket, filterForValidInstruction };
