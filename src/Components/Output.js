function Output({ part, onButtonPlay, output }) {
  return (
    <div className="output">
      <h2>Part {part}</h2>
      <button className="btn--play" onClick={onButtonPlay}>
        <i className="fa-solid fa-play"></i>
      </button>
      <div className="spinner">
        <div className="spinner--point nr1"></div>
        <div className="spinner--point nr2"></div>
        <div className="spinner--point nr3"></div>
        <div className="spinner--point nr4"></div>
        <div className="spinner--point nr5"></div>
        <div className="spinner--point nr6"></div>
        <div className="spinner--point nr7 spinner--active"></div>
        <div className="spinner--point nr8"></div>
      </div>
      <textarea readOnly rows={1} cols={25} value={output}>
        {output}
      </textarea>
    </div>
  );
}

export default Output;
