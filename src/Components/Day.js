import Output from "./Output.js";
import ButtonInput from "./ButtonInput.js";
import ButtonHead from "./ButtonHead.js";
import data from "../data.js";
import { useState } from "react";

function Day({ onHomeClick, day, preDay, sucDay, setActiveDay }) {
  const link = `https://adventofcode.com/2024/day/${day}`;
  const [input, setInput] = useState("");
  const [output1, setOutput1] = useState("");
  const [output2, setOutput2] = useState("");

  function handleDayBack() {
    if (preDay !== 0) {
      setActiveDay(preDay);
      setInput("");
      setOutput1("");
      setOutput2("");
    }
  }

  function handleDayForward() {
    if (sucDay !== day) {
      setActiveDay(sucDay);
      setInput("");
      setOutput1("");
      setOutput2("");
    }
  }

  async function getInput(day, part) {
    const res = await fetch(
      `./Input/day${day < 10 ? "0" + day : day}/${part}.txt`
    );
    const data = await res.text();

    return data;
  }

  function handleButtonInput(e) {
    getInput(day, e.target.name).then((input) => setInput(input));
  }

  function handleInputChange(e) {
    setInput(() => e.target.value);
  }

  function handleButtonPlay1() {
    if (data[day - 1].part1 !== undefined) {
      const output = data[day - 1].part1(input);
      setOutput1(output);
    } else {
      setOutput1("not solved");
    }
  }

  function handleButtonPlay2() {
    if (data[day - 1].part2 !== undefined) {
      const output = data[day - 1].part2(input);
      setOutput2(output);
    } else {
      setOutput2("not solved");
    }
  }

  return (
    <>
      <div className="symbol--home" onClick={onHomeClick}>
        <i className="fa-solid fa-house"></i>
      </div>
      <div className="day--head">
        {preDay !== 0 ? (
          <ButtonHead direction="left" onButtonClick={handleDayBack} />
        ) : (
          <div className="btn--head--inactive"></div>
        )}
        <h1>DAY {day}</h1>
        {sucDay !== day ? (
          <ButtonHead direction="right" onButtonClick={handleDayForward} />
        ) : (
          <div className="btn--head--inactive"></div>
        )}
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Go to Task
      </a>
      <div className="input--selection">
        {data[day - 1].input.map((btn) => (
          <ButtonInput
            key={btn}
            btnName={btn}
            onButtonInput={handleButtonInput}
          >
            {btn === "final"
              ? "Puzzle Input"
              : btn[0].toUpperCase() + btn.slice(1) + " Input"}
          </ButtonInput>
        ))}
      </div>
      <textarea
        className="input"
        spellCheck="false"
        placeholder="choose or write your input"
        value={input}
        onChange={handleInputChange}
      >
        {input}
      </textarea>
      <Output part={1} onButtonPlay={handleButtonPlay1} output={output1} />
      <Output part={2} onButtonPlay={handleButtonPlay2} output={output2} />
    </>
  );
}

export default Day;
