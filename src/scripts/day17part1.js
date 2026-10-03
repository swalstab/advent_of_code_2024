function prepareInput(input) {
  const inputSplitted = input.split("\n");

  const registerA = Number(inputSplitted[0].split(": ")[1]);
  const registerB = Number(inputSplitted[1].split(": ")[1]);
  const registerC = Number(inputSplitted[2].split(": ")[1]);

  const program = inputSplitted[4]
    .split(": ")[1]
    .split(",")
    .map((num) => Number(num));

  return { registerA, registerB, registerC, program };
}

function fnDay17Part1(input) {
  const { registerA, registerB, registerC, program } = prepareInput(input);

  let a = registerA;
  let b = registerB;
  let c = registerC;
  let output = [];
  let step = 0;

  for (let i = 0; i < program.length; i += 2) {
    if (step > 100) break;

    const currentProgramm = program[i];
    const currentOperand = program[i + 1];

    let operandValue = currentOperand;
    switch (operandValue) {
      case 4:
        operandValue = a;
        break;
      case 5:
        operandValue = b;
        break;
      case 6:
        operandValue = c;
        break;
    }

    switch (currentProgramm) {
      case 0:
        a = Math.trunc(a / Math.pow(2, operandValue));
        break;
      case 1:
        b = b ^ operandValue;
        break;
      case 2:
        b = operandValue % 8;
        break;
      case 3:
        if (a !== 0) {
          i = operandValue - 2;
        }
        break;
      case 4:
        b = b ^ c;
        break;
      case 5:
        output.push(operandValue % 8);
        break;
      case 6:
        b = Math.trunc(a / Math.pow(2, operandValue));
        break;
      case 7:
        c = Math.trunc(a / Math.pow(2, operandValue));
        break;
      default:
        console.log("No programm found");
    }

    step++;
  }
  return output.join(",");
}

export default fnDay17Part1;
