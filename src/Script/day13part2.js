import { prepareInput, determineTokens } from "./day13part1";

function fnDay13Part2(input) {
  const machines = prepareInput(input, 10000000000000);
  const tokens = determineTokens(machines);
  const sum = tokens.reduce((acc, num) => acc + num);

  return sum;
}

export default fnDay13Part2;
