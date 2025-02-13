function nextStep(input, position) {
  const value = Number(input[position[0]][position[1]]);

  let validation = false;
  const nextPosition = [];
  if (
    position[0] + 1 < input.length &&
    Number(input[position[0] + 1][position[1]]) === value + 1
  ) {
    validation = true;
    nextPosition.push([position[0] + 1, position[1]]);
  }
  if (
    position[0] - 1 >= 0 &&
    Number(input[position[0] - 1][position[1]]) === value + 1
  ) {
    validation = true;
    nextPosition.push([position[0] - 1, position[1]]);
  }
  if (
    position[1] + 1 < input[0].length &&
    Number(input[position[0]][position[1] + 1]) === value + 1
  ) {
    validation = true;
    nextPosition.push([position[0], position[1] + 1]);
  }
  if (
    position[1] - 1 >= 0 &&
    Number(input[position[0]][position[1] - 1]) === value + 1
  ) {
    validation = true;
    nextPosition.push([position[0], position[1] - 1]);
  }

  return { validation, nextPosition };
}

function fnDay10Part1(input) {
  const inputSplitted = input.split("\n");

  const trailheads = [];
  for (let i = 0; i < inputSplitted.length; i++) {
    for (let j = 0; j < inputSplitted[i].length; j++) {
      Number(inputSplitted[i][j]) === 0 && trailheads.push([i, j]);
    }
  }

  const score = [];
  for (let i = 0; i < trailheads.length; i++) {
    let position = trailheads[i];

    let otherTrail = [];
    const endPosition = [];
    for (let j = 0; j < 9; j++) {
      const { nextPosition: tempPosition, validation } = nextStep(
        inputSplitted,
        position
      );
      if (!validation) break;
      if (tempPosition.length > 1) {
        if (
          Number(inputSplitted[tempPosition[0][0]][tempPosition[0][1]]) === 9
        ) {
          endPosition.push(...tempPosition);
        } else {
          otherTrail.push(...tempPosition.slice(1));
        }
      }
      position = tempPosition[0];
      if (Number(inputSplitted[position[0]][position[1]]) === 9)
        endPosition.push([position[0], position[1]]);
    }

    for (let j = 0; j < otherTrail.length; j++) {
      let position = otherTrail[j];
      const value = Number(inputSplitted[position[0]][position[1]]) - 1;
      for (let k = value; k < 9; k++) {
        const { nextPosition: tempPosition, validation } = nextStep(
          inputSplitted,
          position
        );
        if (!validation) break;
        if (tempPosition.length > 1) {
          if (
            Number(inputSplitted[tempPosition[0][0]][tempPosition[0][1]]) === 9
          ) {
            endPosition.push(...tempPosition);
          } else {
            otherTrail.push(...tempPosition.slice(1));
          }
        }

        position = tempPosition[0];
        if (Number(inputSplitted[position[0]][position[1]]) === 9)
          endPosition.push([position[0], position[1]]);
      }
    }

    const endPositionPreparation = [];
    for (let j = 0; j < endPosition.length; j++) {
      endPositionPreparation.push(`${endPosition[j][0]}|${endPosition[j][1]}`);
    }
    const endPositionUnique = [...new Set(endPositionPreparation)];
    score.push(endPositionUnique.length);
  }

  const sum = score.reduce((acc, num) => acc + num, 0);

  return sum;
}

export default fnDay10Part1;
export { nextStep };
