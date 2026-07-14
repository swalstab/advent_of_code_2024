function proofIncreasing(arr) {
  let validation = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      validation = false;
    }
  }
  return validation;
}

function proofDecreasing(arr) {
  let validation = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[i - 1]) {
      validation = false;
    }
  }
  return validation;
}

function proofDiffer(arr) {
  let validation = true;
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - arr[i - 1]);
    if (diff < 1 || diff > 3) {
      validation = false;
    }
  }
  return validation;
}

function fnDay02Part1(input) {
  const reports = [];
  input.split("\n").forEach((element) => {
    const levels = [];
    element.split(" ").forEach((el) => levels.push(Number(el)));
    reports.push(levels);
  });

  const reportsFiltered = reports.filter(
    (report) => (proofIncreasing(report) || proofDecreasing(report)) && report
  );

  const safeReports = reportsFiltered.filter((report) => proofDiffer(report));

  const output = safeReports.length;

  return output;
}

export default fnDay02Part1;
export { proofIncreasing, proofDecreasing, proofDiffer };
