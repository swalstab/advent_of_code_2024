function nextPosition(positionRobot, movement) {
  const posI = Number(positionRobot.split("|")[0]);
  const posJ = Number(positionRobot.split("|")[1]);

  let movementI = 0;
  let movementJ = 0;
  switch (movement) {
    case "^":
      movementI = -1;
      movementJ = 0;
      break;
    case "v":
      movementI = 1;
      movementJ = 0;
      break;
    case "<":
      movementI = 0;
      movementJ = -1;
      break;
    case ">":
      movementI = 0;
      movementJ = 1;
      break;
    default:
      movementI = 0;
      movementJ = 0;
      break;
  }
  return `${posI + movementI}|${posJ + movementJ}`;
}

function fnDay15Part1(input) {
  const map = input.split("\n\n")[0].split("\n");
  const movements = input.split("\n\n")[1].split("\n").join("");

  let positionRobot = "";
  const positionWall = [];
  let positionBoxes = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "@") positionRobot = `${i}|${j}`;
      map[i][j] === "#" && positionWall.push(`${i}|${j}`);
      map[i][j] === "O" && positionBoxes.push(`${i}|${j}`);
    }
  }

  for (let i = 0; i < movements.length; i++) {
    const tempPositionRobot = nextPosition(positionRobot, movements[i]);
    const posI = Number(tempPositionRobot.split("|")[0]);
    const posJ = Number(tempPositionRobot.split("|")[1]);

    if (
      !positionWall.includes(`${posI}|${posJ}`) &&
      !positionBoxes.includes(`${posI}|${posJ}`)
    ) {
      positionRobot = `${posI}|${posJ}`;
      continue;
    }

    if (positionWall.includes(`${posI}|${posJ}`)) {
      continue;
    }

    if (positionBoxes.includes(`${posI}|${posJ}`)) {
      const diffI = posI - Number(positionRobot.split("|")[0]);
      const diffJ = posJ - Number(positionRobot.split("|")[1]);

      let tempI = posI;
      let tempJ = posJ;

      for (let j = 0; j < 2; j++) {
        tempI += diffI;
        tempJ += diffJ;
        if (positionWall.includes(`${tempI}|${tempJ}`)) {
          break;
        }
        if (positionBoxes.includes(`${tempI}|${tempJ}`)) {
          j = 0;
        }
        if (
          !positionWall.includes(`${tempI}|${tempJ}`) &&
          !positionBoxes.includes(`${tempI}|${tempJ}`)
        ) {
          positionRobot = `${posI}|${posJ}`;
          positionBoxes = positionBoxes.filter(
            (box) => box !== `${posI}|${posJ}`
          );
          positionBoxes.push(`${tempI}|${tempJ}`);
          break;
        }
      }
    }
  }

  const gps = positionBoxes.map(
    (position) =>
      Number(position.split("|")[0]) * 100 + Number(position.split("|")[1])
  );

  const sum = gps.reduce((acc, num) => acc + num, 0);

  return sum;
}

export default fnDay15Part1;
export { nextPosition };

// 10092
// 2028
