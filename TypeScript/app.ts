//imports
import {
  slideUpAnimaion,
  rightAnswerAnimation,
  wrongAnswerAnimation,
  slideDownAnimation,
} from "./animations.js";
import Quiz from "./quiz.js";

//query selectors
let start = document.querySelector(".start-icon")! as HTMLParagraphElement;
let reset = document.querySelector(".reset-icon")! as HTMLParagraphElement;
let [questionTitle, answersDiv] = Array.from(
  document.querySelector(".questions-area")!.children
);

//initiate quiz class object
let quiz = new Quiz();

// rendering functions
const renderNextQuestion = () => {
  let question = quiz.getCurrentQuestion();
  let answers = question["answers"] as [];
  questionTitle.textContent = question["title"];
  answersDiv.innerHTML = "";
  answers.forEach((answer, index) => {
    answersDiv.innerHTML += `<div class='answer-box' key=${
      index + 1
    }>  ${answer} </div>`;
  });
};

const checkAnswer = (key: number) => {
  const result = quiz.selectAnswer(key);

  switch (result) {
    case "right":
      rightAnswerAnimation(key);
      slideDownAnimation("lose", quiz.answeredScore);
      break;
    case "wrong":
      wrongAnswerAnimation(key).then(() => {
        if (quiz.remainingAnswers == 1) levelUp();
      });
      break;
  }
};

const levelUp = () => {
  if (quiz.progress == "unfinished") {
    quiz.upToNextQuestion();
    renderNextQuestion();
  } else {
    slideDownAnimation("win", quiz.answeredScore + 1);
  }
};

//event listeners
start.addEventListener("click", () => {
  slideUpAnimaion();
  renderNextQuestion();
});

reset.addEventListener("click", () => {
  location.reload();
});

answersDiv.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) return;
  let box = e.target as HTMLDivElement;
  let key = Number(box.getAttribute("key"));
  checkAnswer(key);
});
