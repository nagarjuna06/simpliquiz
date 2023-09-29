import { v4 as uuid } from "uuid";
import ReactAceEditor from "../../react-ace-code";
import "./index.css";
import { Correct, Wrong } from "../../smallComponents/correct&Wrong";
const ReviewItem = (props) => {
  const { item, no, mark, negativeMark, totalQuestions } = props;
  const { question, code, options, answer, selected, correct, explanation } =
    item;
  const option = (each) => {
    const id = uuid();
    return (
      <div key={id} className="review-option">
        <input
          type="radio"
          id={id}
          name={no}
          value={each}
          disabled
          checked={each === selected}
        />
        <label
          htmlFor={id}
          className={each === answer ? "green" : each === selected ? "red" : ""}
        >
          {each}
        </label>
        {each === answer && <Correct size={20} />}
        {!correct && each === selected && <Wrong size={20} />}
      </div>
    );
  };
  return (
    <li className="review-question">
      <h4>
        {no}. {question}
      </h4>
      {code && <ReactAceEditor code={code} />}
      <div className="review-options">
        {options.map((each) => option(each))}
      </div>
      {explanation && (
        <details>
          <summary>Explanation</summary>
          <p>{explanation}</p>
        </details>
      )}
      <div className="mark-container">
        <p className="text-bold-right">
          Status:{" "}
          <span
            className={`text-bold-right ${
              correct === undefined ? "orange" : correct ? "green" : "red"
            }`}
          >
            {correct === undefined
              ? "Not Attempted"
              : correct
              ? "Correct"
              : "Wrong"}
          </span>
        </p>
        <p className="text-bold-right">
          Marks:{" "}
          <span
            className={`text-bold-right ${
              correct === undefined ? "orange" : correct ? "green" : "red"
            }`}
          >
            {correct === undefined ? 0 : correct ? "+" + mark : negativeMark}
          </span>
        </p>
      </div>
    </li>
  );
};

export default ReviewItem;
