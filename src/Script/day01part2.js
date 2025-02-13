function fnDay01Part2(input) {
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

  const score = [];

  list1.forEach((el) => {
    const amount = list2.filter((num) => num === el).length;
    score.push(amount * el);
  });

  const output = score.reduce((acc, num) => acc + num, 0);

  return output;
}

export default fnDay01Part2;
