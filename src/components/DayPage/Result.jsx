import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useDay } from "../../contexts/DayContext";

import PlayButton from "./PlayButton";
import Spinner from "./Spinner";

function Result({ part, solved, className }) {
  const worker = useRef(null);
  const { day } = useParams();
  const { inputContent, outputs, loading, dispatch } = useDay();

  const output = outputs[part];
  const isLoading = loading[part];

  useEffect(() => {
    worker.current = new Worker(
      new URL("../../workers/worker.js", import.meta.url),
      {
        type: "module",
      },
    );

    worker.current.onmessage = ({ data }) => {
      dispatch({ type: "setLoading", part, payload: false });

      if (data.success) {
        dispatch({ type: "setOutput", part, payload: data.result });
      } else {
        console.error(data.error);
        dispatch({ type: "resetOutput" });
      }
    };

    worker.current.onerror = () => {
      dispatch({ type: "setLoading", part, payload: false });
    };

    return () => worker.current.terminate();
  }, [dispatch, part]);

  function handleClick() {
    dispatch({ type: "setLoading", part, payload: true });
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
