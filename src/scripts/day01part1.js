function fnDay01Part1(input) {
  const inputSplitted = [];

  input.split("\n").forEach((element) => {
    const newElement = element.split(" ").filter((el) => el !== "");
    inputSplitted.push(newElement);
  });

  const list1 = [];
  const list2 = [];

  inputSplitted.forEach((el) => {
    list1.push(Number(el[0]));
    list2.push(Number(el[1]));
  });

  const list1Sorted = list1.slice().sort((a, b) => a - b);
  const list2Sorted = list2.slice().sort((a, b) => a - b);

  const diffList = [];

  for (let i = 0; i < list1Sorted.length; i++) {
    const diff = Math.abs(list1Sorted[i] - list2Sorted[i]);
    diffList.push(diff);
  }

  const output = diffList.reduce((acc, num) => acc + num, 0);

  return output;
}

export default fnDay01Part1;
