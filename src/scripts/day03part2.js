import { filterForBracket, filterForValidInstruction } from "./day03part1";

function fnDay03Part2(input) {
  const inputSplitted = input.split("do()");

  const inputFilteredDo = [];
  for (let i = 0; i < inputSplitted.length; i++) {
    const inputSplittedDont = inputSplitted[i].split("don't()");

    inputFilteredDo.push(...inputSplittedDont[0].split("mul"));
  }

  const inputFilteredBracket = filterForBracket(inputFilteredDo);
  const result = filterForValidInstruction(inputFilteredBracket);
  const output = result.reduce((acc, num) => acc + num, 0);
  return output;
}

export default fnDay03Part2;
