export function getInputPath(day, fileName) {
  return `/inputs/day${day.padStart(2, "0")}/${fileName}.txt`;
}

export async function getInput(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("Could not get input.");
  const data = await res.text();
  return data;
}

export function getResult(value, script) {
  if (value === "") {
    return "Input required";
  }
  if (!script) {
    console.error("Unknown script");
  }
  return script(value);
}
