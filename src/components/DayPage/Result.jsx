import { useState } from "react";
import PlayButton from "./PlayButton";

function Result({ part, solved, inputContent, className }) {
  const [output, setOutput] = useState("");

  return (
    <section
      className={`result ${solved ? "" : "result--unsolved "}${className}`}
    >
      <h2 className="result__title heading--lg">Part {part}</h2>
      {solved && (
        <PlayButton
          part={part}
          inputContent={inputContent}
          setOutput={setOutput}
        />
      )}
      <output className="result__content" htmlFor="input">
        {solved ? output : "Not Solved"}
      </output>
    </section>
  );
}

export default Result;
