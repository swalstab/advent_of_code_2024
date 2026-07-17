import { useEffect, useRef } from "react";
import { useParams } from "react-router";

import PlayButton from "./PlayButton";
import Spinner from "./Spinner";

function Result({
  part,
  solved,
  inputContent,
  output,
  isLoading,
  dispatch,
  className,
}) {
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
      dispatch({ type: "setIsLoading", payload: { [`${part}`]: false } });

      if (data.success) {
        dispatch({ type: "setOutput", payload: { [`${part}`]: data.result } });
      } else {
        console.error(data.error);
        dispatch({ type: "resetOutput" });
      }
    };

    worker.current.onerror = () => {
      dispatch({ type: "setIsLoading", payload: { [`${part}`]: false } });
    };

    return () => worker.current.terminate();
  }, [dispatch, part]);

  function handleClick() {
    dispatch({ type: "setIsLoading", payload: { [`${part}`]: true } });
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
