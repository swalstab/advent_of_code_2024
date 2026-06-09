function ButtonInput({ btnName, onButtonInput, children }) {
  return (
    <button
      className="btn--input"
      type="button"
      name={btnName}
      onClick={onButtonInput}
    >
      {children}
    </button>
  );
}

export default ButtonInput;
