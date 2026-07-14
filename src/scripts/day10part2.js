import { nextStep } from "./day10part1";

function fnDay10Part2(input) {
  const inputSplitted = input.split("\n");

  const trailheads = [];
  for (let i = 0; i < inputSplitted.length; i++) {
    for (let j = 0; j < inputSplitted[i].length; j++) {
      Number(inputSplitted[i][j]) === 0 && trailheads.push([i, j]);
    }
  }

  let score = 0;
  for (let i = 0; i < trailheads.length; i++) {
    let position = trailheads[i];

    let otherTrail = [];
    const completeTrail = [];
    const trail = [position];
    for (let j = 1; j < 10; j++) {
      const { nextPosition: tempPosition, validation } = nextStep(
        inputSplitted,
        position
      );

      if (!validation) break;

      if (tempPosition.length > 1) {
        for (let k = 1; k < tempPosition.length; k++) {
          otherTrail.push([...trail.slice(), tempPosition[k]]);
        }
      }
      trail.push(tempPosition[0]);
      position = tempPosition[0];
      trail.length === 10 && completeTrail.push(trail);
    }

    for (let j = 0; j < otherTrail.length; j++) {
      const currTrail = otherTrail[j];
      let position = currTrail.at(-1);

      if (currTrail.length === 10) {
        completeTrail.push(currTrail);
        continue;
      }

      const value = Number(inputSplitted[position[0]][position[1]]) + 1;

      for (let k = value; k < 10; k++) {
        const { nextPosition: tempPosition, validation } = nextStep(
          inputSplitted,
          position
        );
        if (!validation) break;

        if (tempPosition.length > 1) {
          for (let l = 1; l < tempPosition.length; l++) {
            const tempTrail = [...currTrail.slice(), tempPosition[l]];

            if (tempTrail.length === 10) {
              completeTrail.push(tempTrail);
            } else {
              otherTrail.push(tempTrail);
            }
          }
        }

        currTrail.push(tempPosition[0]);
        position = tempPosition[0];
        currTrail.length === 10 && completeTrail.push(currTrail.slice());
      }
    }

    score += completeTrail.length;
  }

  return score;
}

export default fnDay10Part2;
