import cardimage from "../assets/card-image.svg";
import classes from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={classes.card} id="mainCont">
      <h1>Country Quiz</h1>
      <div className={classes.innercard}>
        <img src={cardimage} alt="card-image" className={classes.cardImage} />
        {props.isFlag && (
          <img src={props.question} className={classes.flag} alt="flag" />
        )}
        {props.isFlag ? (
          <p className={classes.question}>
            Which country does this flag belong too?
          </p>
        ) : (
          <p className={classes.question}>
            {props.question} is the capital of?
          </p>
        )}
        <ul>
          {props.options.map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              onClick={() => props.selectAnswerHandler(item, index)}
              className={`${
                props.optionClicked && item.isCorrect ? classes.correct : ""
              } ${
                props.currentIndex === index &&
                !item.isCorrect &&
                props.optionClicked
                  ? classes.wrong
                  : ""
              }`}
            >
              <span>{String.fromCharCode(index + 65)}</span>
              {item.text}
            </li>
          ))}
        </ul>
        {props.optionClicked && (
          <button
            className={classes.button}
            onClick={props.nextQuestionHandler}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
