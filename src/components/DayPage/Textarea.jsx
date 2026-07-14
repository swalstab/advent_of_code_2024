function Textarea({ content, onContentChange }) {
  return (
    <textarea
      className="editor__textarea"
      id="input"
      aria-label="choose or type in your input"
      spellCheck="false"
      placeholder="choose or type in your input"
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
    ></textarea>
  );
}

export default Textarea;
