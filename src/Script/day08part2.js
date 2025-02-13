function fnDay08Part2(input) {
  const inputSplitted = input.split("\n");
  const maxI = inputSplitted.length;
  const maxJ = inputSplitted[0].length;

  const antennaMap = new Map();
  for (let i = 0; i < inputSplitted.length; i++) {
    for (let j = 0; j < inputSplitted[i].length; j++) {
      if (inputSplitted[i][j] !== ".") {
        if (!antennaMap.has(inputSplitted[i][j]))
          antennaMap.set(inputSplitted[i][j], [[i, j]]);
        else
          antennaMap.set(inputSplitted[i][j], [
            ...antennaMap.get(inputSplitted[i][j]),
            [i, j],
          ]);
      }
    }
  }

  const antenna = [...antennaMap];
  const antinode = [];

  for (let i = 0; i < antenna.length; i++) {
    const antennaPosition = antenna[i][1];

    for (let j = 0; j < antennaPosition.length; j++) {
      antinode.push(`${antennaPosition[j][0]}|${antennaPosition[j][1]}`);
    }

    for (let j = 0; j < antennaPosition.length; j++) {
      for (let k = j + 1; k < antennaPosition.length; k++) {
        const deltaI = antennaPosition[k][0] - antennaPosition[j][0];
        const deltaJ = antennaPosition[k][1] - antennaPosition[j][1];

        let count = 1;
        for (let l = 0; l < 2; l++) {
          const position1I = antennaPosition[j][0] - count * deltaI;
          const position1J = antennaPosition[j][1] - count * deltaJ;

          if (
            position1I >= 0 &&
            position1I < maxI &&
            position1J >= 0 &&
            position1J < maxJ
          ) {
            antinode.push(`${position1I}|${position1J}`);
            l = 0;
            count++;
          } else {
            break;
          }
        }

        count = 1;
        for (let l = 0; l < 2; l++) {
          const position2I = antennaPosition[k][0] + count * deltaI;
          const position2J = antennaPosition[k][1] + count * deltaJ;

          if (
            position2I >= 0 &&
            position2I < maxI &&
            position2J >= 0 &&
            position2J < maxJ
          ) {
            antinode.push(`${position2I}|${position2J}`);
            l = 0;
            count++;
          } else {
            break;
          }
        }
      }
    }
  }

  const antinodeUnique = [...new Set(antinode)];

  return antinodeUnique.length;
}

export default fnDay08Part2;
