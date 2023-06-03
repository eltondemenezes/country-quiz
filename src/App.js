import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "./components/Card";
import Result from "./components/Result";

function App() {
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isFlag, setIsFlag] = useState(false);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [optionClicked, setOptionClicked] = useState(null);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    axios("https://restcountries.com/v3.1/all").then((res) => {
      setData(res.data);
      getQuestion(res.data);
    });
  }, []);

  const getQuestion = (data) => {
    const randomNumber = Math.floor(Math.random() * 250);
    const random = Math.floor(Math.random() * 2);
    if (random === 1) {
      setQuestion(data[randomNumber].capital[0]);
      setIsFlag(false);
    }
    if (random === 0) {
      setIsFlag(true);
      setQuestion(data[randomNumber].flags.png);
    }
    setAnswer(data[randomNumber].name.common);

    var options = [];
    for (var i = 0; i < 4; i++) {
      const opt = {
        id: i,
        text: data[randomNumber + i].name.common,
        isCorrect: i === 0,
      };
      options.push(opt);
    }

    options.sort((a, b) => {
      const textA = a.text.toUpperCase();
      const textB = b.text.toUpperCase();

      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
      return 0;
    });

    setOptions(options);
  };

  const selectAnswerHandler = (item, index) => {
    if (!firstClick) {
      setCurrentIndex(index);
      setOptionClicked(true);
      setQuestionCount(questionCount + 1);
      if (item.text === answer) {
        setCount(count + 1);
      }
      setFirstClick(true);
    }
  };

  const nextQuestionHandler = () => {
    setFirstClick(false);
    setCurrentIndex(null);
    setOptionClicked(false);
    getQuestion(data);
  };

  const tryAgain = () => {
    setQuestionCount(0);
    setFirstClick(false);
    setCurrentIndex(null);
    setOptionClicked(false);
    getQuestion(data);
  };

  return (
    <div className="body">
      {questionCount === 6 ? (
        <Result count={count} tryAgain={tryAgain} />
      ) : (
        <Card
          isFlag={isFlag}
          question={question}
          options={options}
          selectAnswerHandler={selectAnswerHandler}
          nextQuestionHandler={nextQuestionHandler}
          currentIndex={currentIndex}
          optionClicked={optionClicked}
        />
      )}
    </div>
  );
}

export default App;
