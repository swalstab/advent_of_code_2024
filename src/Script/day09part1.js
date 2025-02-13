function fnDay09Part1(input) {
  const inputSeparated = [...input].map((el) => Number(el));

  const diskMap = inputSeparated.flatMap((el, idx) => {
    const value = idx % 2 === 0 ? idx / 2 : "x";
    const arr = Array.from({ length: el }, () => value);
    return arr;
  });

  const compactDiskMap = diskMap.slice();
  for (let i = 0; i < compactDiskMap.length; i++) {
    for (let step = 0; step < 2; step++) {
      if (compactDiskMap[compactDiskMap.length - 1] === "x") {
        compactDiskMap.pop();
        step = 0;
      } else {
        step = 1;
      }
    }

    if (compactDiskMap[i] === "x") {
      compactDiskMap[i] = compactDiskMap[compactDiskMap.length - 1];
      compactDiskMap.pop();
    }
  }

  const checksum = compactDiskMap.reduce((acc, el, idx) => acc + el * idx, 0);

  return checksum;
}

export default fnDay09Part1;
