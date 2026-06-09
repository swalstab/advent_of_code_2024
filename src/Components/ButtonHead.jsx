function ButtonHead({ direction, onButtonClick }) {
  return (
    <button className="btn--head">
      <i
        className={"fa-solid fa-circle-chevron-" + direction}
        onClick={onButtonClick}
      ></i>
    </button>
  );
}

export default ButtonHead;
