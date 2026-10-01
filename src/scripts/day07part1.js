function evaluateSequence(num, arr) {
  const sequencesToEvaluate = [{ value: num, arr }];

  for (let i = 0; i < sequencesToEvaluate.length; i++) {
    let currentValue = sequencesToEvaluate[i].value;
    let currentArr = sequencesToEvaluate[i].arr;
    let currentItem = currentArr[currentArr.length - 1];

    for (let j = currentArr.length - 1; j > 0; j--) {
      if (currentValue % currentItem === 0) {
        const remainingArr = currentArr.slice(0, j);
        sequencesToEvaluate.push({
          value: currentValue - currentItem,
          arr: remainingArr,
        });
        currentValue /= currentItem;
      } else {
        currentValue -= currentItem;
      }
      currentItem = currentArr[j - 1];
    }

    if (currentValue === arr[0]) {
      return true;
    }
  }

  return false;
}

function fnDay07Part1(input) {
  const inputSplitted = input.split("\n");

  return inputSplitted.reduce((accumulator, sequence) => {
    const value = Number(sequence.split(":")[0]);
    const arr = sequence
      .split(": ")[1]
      .split(" ")
      .map((num) => Number(num));

    if (evaluateSequence(value, arr)) {
      return accumulator + value;
    }

    return accumulator;
  }, 0);
}

export default fnDay07Part1;
