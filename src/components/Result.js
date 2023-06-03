import result from "../assets/card-winner.svg";
import classes from "./Result.module.css";

export default function Result(props) {
  return (
    <div className={classes.card} id="mainCont">
      <h1>Country Quiz</h1>
      <div className={classes.innercard}>
        <img src={result} alt="card-image" />
        <p className={classes.question}>Result</p>
        <p className={classes.result}>
          You got <span>{props.count}</span> correct answers
        </p>
        <button className={classes.button} onClick={props.tryAgain}>
          Try Again
        </button>
      </div>
    </div>
  );
}
