import { provePageOrder } from "./day05part1";

function filterRelevantPageOrder(arr, pageBefore, pageAfter) {
  const pageOrder = [];
  for (let i = 0; i < pageBefore.length; i++) {
    (arr.includes(pageBefore[i]) || arr.includes(pageAfter[i])) &&
      pageOrder.push([pageBefore[i], pageAfter[i]]);
  }
  return pageOrder;
}

function fnDay05Part2(input) {
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

  const uncorrectUpdate = [];
  for (let i = 0; i < updatedPages.length; i++) {
    let orderIsCorrect = true;

    for (let j = 0; j < pageBefore.length; j++) {
      if (!provePageOrder(updatedPages[i], pageBefore[j], pageAfter[j]))
        orderIsCorrect = false;
    }

    !orderIsCorrect && uncorrectUpdate.push(updatedPages[i]);
  }

  const correctUpdate = [];

  for (let i = 0; i < uncorrectUpdate.length; i++) {
    const relevantPageOrder = filterRelevantPageOrder(
      uncorrectUpdate[i],
      pageBefore,
      pageAfter
    );

    let falsePageOrder = uncorrectUpdate[i];
    for (let j = 0; j < 1000; j++) {
      const ignoredRule = [];
      for (let k = 0; k < relevantPageOrder.length; k++) {
        const pageOrderIsCorrect = provePageOrder(
          falsePageOrder,
          relevantPageOrder[k][0],
          relevantPageOrder[k][1]
        );

        if (!pageOrderIsCorrect) {
          ignoredRule.push(relevantPageOrder[k][0], relevantPageOrder[k][1]);
          break;
        }
      }

      const indexPageBefore = falsePageOrder.indexOf(ignoredRule[0]);
      const indexPageAfter = falsePageOrder.indexOf(ignoredRule[1]);

      const updateSorted = [
        ...falsePageOrder.slice(0, indexPageAfter),
        ignoredRule[0],
        ignoredRule[1],
        ...falsePageOrder.slice(indexPageAfter + 1, indexPageBefore),
        ...falsePageOrder.slice(indexPageBefore + 1),
      ];

      let orderIsCorrect = true;
      for (let k = 0; k < relevantPageOrder.length; k++) {
        if (
          !provePageOrder(
            updateSorted,
            relevantPageOrder[k][0],
            relevantPageOrder[k][1]
          )
        )
          orderIsCorrect = false;
      }

      if (orderIsCorrect) {
        correctUpdate.push(updateSorted);
        j = 1000;
      } else {
        falsePageOrder = updateSorted;
      }
    }
  }

  const middlePageNumber = correctUpdate.map(
    (update) => update[(update.length - 1) / 2]
  );

  return middlePageNumber.reduce((acc, num) => acc + num, 0);
}

export default fnDay05Part2;
