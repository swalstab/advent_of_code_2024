import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import PlayButton from "./PlayButton";
import Spinner from "./Spinner";

function Result({ part, solved, inputContent, output, setOutput, className }) {
  // const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const worker = useRef(null);
  const { day } = useParams();

  useEffect(() => {
    worker.current = new Worker(
      new URL("../../workers/worker.js", import.meta.url),
      {
        type: "module",
      },
    );

    worker.current.onmessage = ({ data }) => {
      setIsLoading(false);

      if (data.success) {
        setOutput(data.result);
      } else {
        console.error(data.error);
        setOutput("");
      }
    };

    worker.current.onerror = () => {
      setIsLoading(false);
    };

    return () => worker.current.terminate();
  }, [setOutput]);

  function handleClick() {
    setIsLoading(true);
    worker.current.postMessage({ day, part, inputContent });
  }

  return (
    <section
      className={`result ${solved ? "" : "result--unsolved "}${className}`}
    >
      <h2 className="result__title heading--lg">Part {part}</h2>
      {solved && !isLoading && (
        <PlayButton part={part} handleClick={handleClick} />
      )}
      {solved && isLoading && <Spinner />}
      <output className="result__content" htmlFor="input">
        {solved ? output : "Not Solved"}
      </output>
    </section>
  );
}

export default Result;
