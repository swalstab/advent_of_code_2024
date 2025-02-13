function positionAfterTime(robot, second, maxI, maxJ) {
  const tempI = robot.startI + second * robot.moveI;
  const tempJ = robot.startJ + second * robot.moveJ;
  const factorI = tempI < 0 ? -1 : 1;
  const factorJ = tempJ < 0 ? -1 : 1;
  const corrI =
    factorI * (Math.abs(tempI) - Math.trunc(Math.abs(tempI) / maxI) * maxI);
  const corrJ =
    factorJ * (Math.abs(tempJ) - Math.trunc(Math.abs(tempJ) / maxJ) * maxJ);
  const i = corrI < 0 ? maxI + corrI : corrI;
  const j = corrJ < 0 ? maxJ + corrJ : corrJ;
  return { i, j };
}

function fnDay14Part1(input) {
  const inputSplitted = input.split("\n");

  const robots = inputSplitted.map((robot) => {
    const position = robot.split(" ")[0].slice(2);
    const movement = robot.split(" ")[1].slice(2);

    const startI = Number(position.split(",")[1]);
    const startJ = Number(position.split(",")[0]);
    const moveI = Number(movement.split(",")[1]);
    const moveJ = Number(movement.split(",")[0]);

    return { startI, startJ, moveI, moveJ };
  });

  // const width = 11;
  // const height = 7;
  const width = 101;
  const height = 103;

  const positions = [];
  for (let i = 0; i < robots.length; i++) {
    const position = positionAfterTime(robots[i], 100, height, width);
    positions.push(position);
  }

  const widthHalf = (width - 1) / 2;
  const heightHalf = (height - 1) / 2;

  let quadrantI = 0;
  let quadrantII = 0;
  let quadrantIII = 0;
  let quadrantIV = 0;
  for (let i = 0; i < positions.length; i++) {
    if (positions[i].i === heightHalf || positions[i].j === widthHalf) {
      continue;
    } else if (positions[i].i < heightHalf) {
      if (positions[i].j < widthHalf) {
        quadrantI++;
      } else if (positions[i].j > widthHalf) {
        quadrantII++;
      }
    } else if (positions[i].i > heightHalf) {
      if (positions[i].j < widthHalf) {
        quadrantIII++;
      } else if (positions[i].j > widthHalf) {
        quadrantIV++;
      }
    }
  }

  return quadrantI * quadrantII * quadrantIII * quadrantIV;
}

export default fnDay14Part1;
