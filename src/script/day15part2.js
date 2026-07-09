import { nextPosition } from "./day15part1";

function createNewMap(oldMap) {
  const newMap = [];
  for (let i = 0; i < oldMap.length; i++) {
    const tempMap = [];
    for (let j = 0; j < oldMap[i].length; j++) {
      const symbol = oldMap[i][j];
      let newSymbol;
      switch (symbol) {
        case "#":
          newSymbol = "##";
          break;
        case ".":
          newSymbol = "..";
          break;
        case "O":
          newSymbol = "[]";
          break;
        case "@":
          newSymbol = "@.";
          break;
        default:
          newSymbol = "";
      }
      tempMap.push(newSymbol);
    }
    newMap.push(tempMap.join(""));
  }
  return newMap;
}

function robotMovingInRow(
  positionRobot,
  nextPositionRobot,
  positionBoxes,
  positionWall
) {
  const currentRowRoboter = Number(positionRobot.split("|")[0]);
  const currentColumnRoboter = Number(positionRobot.split("|")[1]);
  const movingDirection =
    nextPositionRobot.split("|")[1] - currentColumnRoboter;

  let newPositionRobot, newPositionBoxes;
  let count = 1;
  const boxesToMove = [];
  for (let i = 0; i < 2; i++) {
    if (
      positionWall.includes(
        `${currentRowRoboter}|${currentColumnRoboter + count * movingDirection}`
      )
    ) {
      newPositionRobot = positionRobot;
      newPositionBoxes = positionBoxes;
      break;
    } else if (
      [...positionBoxes.flat()].includes(
        `${currentRowRoboter}|${currentColumnRoboter + count * movingDirection}`
      )
    ) {
      const tempJ = currentColumnRoboter + count * movingDirection;
      const currentBox = positionBoxes.filter((box) =>
        box.includes(`${currentRowRoboter}|${tempJ}`)
      );
      boxesToMove.push(...currentBox);
      count += 2;
      i = 0;
    } else {
      newPositionRobot = nextPositionRobot;
      newPositionBoxes = positionBoxes
        .slice()
        .filter((box) => !boxesToMove.includes(box));

      const movedBoxs = boxesToMove.map((box) => {
        const [boxStart, boxEnd] = box;
        const movedBoxStart = `${currentRowRoboter}|${
          Number(boxStart.split("|")[1]) + movingDirection
        }`;
        const movedBoxEnd = `${currentRowRoboter}|${
          Number(boxEnd.split("|")[1]) + movingDirection
        }`;
        return [movedBoxStart, movedBoxEnd];
      });

      newPositionBoxes.push(...movedBoxs);
      break;
    }
  }

  return { newPositionRobot, newPositionBoxes };
}

function robotMovingInColumn(
  positionRobot,
  nextPositionRobot,
  positionBoxes,
  positionWall
) {
  const currentRowRoboter = Number(positionRobot.split("|")[0]);
  const currentColumnRoboter = Number(positionRobot.split("|")[1]);
  const movingDirection = nextPositionRobot.split("|")[0] - currentRowRoboter;

  let newPositionRobot, newPositionBoxes;
  let columnsToProve = [currentColumnRoboter];
  let count = 1;
  const boxesToMove = [];
  for (let i = 0; i < 2; i++) {
    let tempColumnsToProve = [];
    const currentRow = currentRowRoboter + movingDirection * count;
    for (let j = 0; j < columnsToProve.length; j++) {
      const positionToProve = `${currentRow}|${columnsToProve[j]}`;

      if (positionWall.includes(positionToProve)) {
        newPositionRobot = positionRobot;
        newPositionBoxes = positionBoxes;
        i = 2;

        break;
      } else if ([...positionBoxes.flat()].includes(positionToProve)) {
        const currentBox = positionBoxes.filter((box) =>
          box.includes(positionToProve)
        );
        boxesToMove.push(...currentBox);
        const columnFirst = currentBox[0][0].split("|")[1];
        const columnSecond = currentBox[0][1].split("|")[1];
        tempColumnsToProve = [...tempColumnsToProve, columnFirst, columnSecond];
        i = 0;
      }
    }

    columnsToProve = tempColumnsToProve;
    count++;

    if (columnsToProve.length === 0 && i !== 2) {
      const uniqueBoxesToMove = [
        ...new Set(
          boxesToMove.slice().map((box) => {
            const boxStart = box[0];
            const boxEnd = box[1];
            return `${boxStart}--${boxEnd}`;
          })
        ),
      ].map((box) => box.split("--"));

      newPositionRobot = nextPositionRobot;
      newPositionBoxes = positionBoxes
        .slice()
        .filter((box) => !boxesToMove.includes(box));

      const movedBoxes = uniqueBoxesToMove.map((box) => {
        const [boxStart, boxEnd] = box;
        const movedBoxStart = `${
          Number(boxStart.split("|")[0]) + movingDirection
        }|${Number(boxStart.split("|")[1])}`;
        const movedBoxEnd = `${
          Number(boxEnd.split("|")[0]) + movingDirection
        }|${Number(boxEnd.split("|")[1])}`;
        return [movedBoxStart, movedBoxEnd];
      });

      newPositionBoxes.push(...movedBoxes);
      break;
    }
  }

  return { newPositionRobot, newPositionBoxes };
}

function fnDay15Part2(input) {
  const map = input.split("\n\n")[0].split("\n");
  const movements = input.split("\n\n")[1].split("\n").join("");
  const modifiedMap = createNewMap(map);

  let positionRobot = "";
  const positionWall = [];
  let positionBoxes = [];
  for (let i = 0; i < modifiedMap.length; i++) {
    for (let j = 0; j < modifiedMap[i].length; j++) {
      if (modifiedMap[i][j] === "@") positionRobot = `${i}|${j}`;
      modifiedMap[i][j] === "#" && positionWall.push(`${i}|${j}`);
      modifiedMap[i][j] === "[" &&
        modifiedMap[i][j + 1] === "]" &&
        positionBoxes.push([`${i}|${j}`, `${i}|${j + 1}`]);
    }
  }

  for (let i = 0; i < movements.length; i++) {
    const tempNextPositionRobot = nextPosition(positionRobot, movements[i]);

    if (positionRobot.split("|")[0] === tempNextPositionRobot.split("|")[0]) {
      const { newPositionRobot, newPositionBoxes } = robotMovingInRow(
        positionRobot,
        tempNextPositionRobot,
        positionBoxes,
        positionWall
      );
      positionRobot = newPositionRobot;
      positionBoxes = newPositionBoxes;
    } else {
      const { newPositionRobot, newPositionBoxes } = robotMovingInColumn(
        positionRobot,
        tempNextPositionRobot,
        positionBoxes,
        positionWall
      );
      positionRobot = newPositionRobot;
      positionBoxes = newPositionBoxes;
    }
  }

  const gps = positionBoxes.map((box) => {
    const row = Number(box[0].split("|")[0]);
    const column = Number(box[0].split("|")[1]);
    return row * 100 + column;
  });

  const sum = gps.reduce((acc, num) => acc + num, 0);

  return sum;
}

export default fnDay15Part2;
