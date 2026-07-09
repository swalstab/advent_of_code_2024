function transpose(input) {
  const output = [];
  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let temp = [];
      for (let k = 0; k < input.length; k++) {
        temp.push(input[k][j]);
      }
      output.push(temp);
    }
  }
  return output;
}

function diagonalForward(input) {
  const num = input.length + input[0].length - 2;
  const output = [];
  for (let i = 0; i <= num; i++) {
    const temp = [];
    for (let j = 0; j <= i; j++) {
      j < input.length && i - j < input[0].length && temp.push(input[j][i - j]);
    }
    output.push(temp);
  }
  return output;
}

function diagonalBackward(input) {
  const num = input.length + input[0].length - 2;
  const output = [];
  for (let i = input[0].length - 1; i >= input[0].length - 1 - num; i--) {
    const temp = [];
    for (let j = 0; j < input.length; j++) {
      i + j < input[0].length && i + j >= 0 && temp.push(input[j][i + j]);
    }
    output.push(temp);
  }
  return output;
}

function countXMAS(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "X") {
      continue;
    } else {
      arr[i + 1] === "M" && arr[i + 2] === "A" && arr[i + 3] === "S" && count++;
    }
  }
  return count;
}

function fnDay04Part1(input) {
  const inputSplitted = input.split("\n");
  const inputTransposed = transpose(inputSplitted);
  const inputDiaFor = diagonalForward(inputSplitted);
  const inputDiaBack = diagonalBackward(inputSplitted);

  let countHorizontal,
    countHorizontalReverse,
    countVertical,
    countVerticalReverse,
    countDiaFor,
    countDiaForReverse,
    countDiaBack,
    countDiaBackReverse;

  countHorizontal =
    countHorizontalReverse =
    countVertical =
    countVerticalReverse =
    countDiaFor =
    countDiaForReverse =
    countDiaBack =
    countDiaBackReverse =
      0;

  for (let i = 0; i < inputSplitted.length; i++) {
    const reverse = [...inputSplitted[i]].slice().reverse();
    countHorizontal += countXMAS(inputSplitted[i]);
    countHorizontalReverse += countXMAS(reverse);
  }

  for (let i = 0; i < inputTransposed.length; i++) {
    const reverse = [...inputTransposed[i]].slice().reverse();
    countVertical += countXMAS(inputTransposed[i]);
    countVerticalReverse += countXMAS(reverse);
  }

  for (let i = 0; i < inputDiaFor.length; i++) {
    const reverse = [...inputDiaFor[i]].slice().reverse();
    countDiaFor += countXMAS(inputDiaFor[i]);
    countDiaForReverse += countXMAS(reverse);
  }

  for (let i = 0; i < inputDiaBack.length; i++) {
    const reverse = [...inputDiaBack[i]].slice().reverse();
    countDiaBack += countXMAS(inputDiaBack[i]);
    countDiaBackReverse += countXMAS(reverse);
  }

  return (
    countHorizontal +
    countHorizontalReverse +
    countVertical +
    countVerticalReverse +
    countDiaFor +
    countDiaForReverse +
    countDiaBack +
    countDiaBackReverse
  );
}

export default fnDay04Part1;
