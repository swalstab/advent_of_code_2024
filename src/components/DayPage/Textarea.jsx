import { useDay } from "../../contexts/DayContext";

function Textarea() {
  const { inputContent: content, dispatch } = useDay();
  return (
    <textarea
      className="editor__textarea"
      id="input"
      aria-label="choose or type in your input"
      spellCheck="false"
      placeholder="choose or type in your input"
      value={content}
      onChange={(e) => {
        dispatch({ type: "setInputContent", payload: e.target.value });
      }}
    ></textarea>
  );
}

export default Textarea;
