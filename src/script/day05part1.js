function provePageOrder(arr, pageBefore, pageAfter) {
  const beforeExist = arr.includes(pageBefore);
  const afterExist = arr.includes(pageAfter);

  let output;
  if (!beforeExist || !afterExist) {
    output = true;
  } else {
    output = arr.indexOf(pageBefore) < arr.indexOf(pageAfter) ? true : false;
  }

  return output;
}

function fnDay05Part1(input) {
  const pageOrder = input.split("\n\n")[0].split("\n");
  const updatedPages = input
    .split("\n\n")[1]
    .split("\n")
    .map((update) => update.split(",").map((page) => Number(page)));

  const pageBefore = [];
  const pageAfter = [];
  pageOrder.forEach((element) => {
    const order = element.split("|");
    pageBefore.push(Number(order[0]));
    pageAfter.push(Number(order[1]));
  });

  const correctUpdate = [];
  for (let i = 0; i < updatedPages.length; i++) {
    let validation = true;

    for (let j = 0; j < pageBefore.length; j++) {
      if (!provePageOrder(updatedPages[i], pageBefore[j], pageAfter[j]))
        validation = false;
    }

    validation && correctUpdate.push(updatedPages[i]);
  }

  const middlePageNumber = correctUpdate.map(
    (update) => update[(update.length - 1) / 2]
  );

  return middlePageNumber.reduce((acc, num) => acc + num, 0);
}

export default fnDay05Part1;
export { provePageOrder };
