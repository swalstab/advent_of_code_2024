import { proofIncreasing, proofDecreasing, proofDiffer } from "./day02part1";

function fnDay02Part2(input) {
  const reports = [];
  input.split("\n").forEach((element) => {
    const levels = [];
    element.split(" ").forEach((el) => levels.push(Number(el)));
    reports.push(levels);
  });

  let count = 0;

  for (let i = 0; i < reports.length; i++) {
    for (let j = 0; j < reports[i].length; j++) {
      const newReport = reports[i].filter((el, idx) => idx !== j);

      if (
        (proofIncreasing(newReport) || proofDecreasing(newReport)) &&
        proofDiffer(newReport)
      ) {
        count++;
        break;
      }
    }
  }

  return count;
}

export default fnDay02Part2;
