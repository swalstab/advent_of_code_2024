function Textarea({ content, dispatch }) {
  return (
    <textarea
      className="editor__textarea"
      id="input"
      aria-label="choose or type in your input"
      spellCheck="false"
      placeholder="choose or type in your input"
      value={content}
      onChange={(e) => dispatch({ type: "setInput", payload: e.target.value })}
    ></textarea>
  );
}

export default Textarea;
