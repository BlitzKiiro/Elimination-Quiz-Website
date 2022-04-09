class Quiz {
  private questions = [];
  private score = 0;
  private currentIndex = 0;
  private remaining = 0;
  constructor() {
    fetch("../db/questions.json")
      .then((response) => response.json())
      .then((data) => {
        this.questions = data;
        this.remaining = data[0]["answers"].length;
      })
      .catch((error) => console.log(error));
  }
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  selectAnswer(ansNum: number): "right" | "wrong" {
    let currentQuestion = this.questions[this.currentIndex];
    let writeAnswerNum = currentQuestion["rightAnswerNumber"];
    if (ansNum == writeAnswerNum) return "right";
    else {
      this.remaining--;
      return "wrong";
    }
  }

  upToNextQuestion() {
    this.score++;
    this.currentIndex++;
    this.remaining = this.questions[this.currentIndex]["answers"]["length"];
  }

  get remainingAnswers() {
    return this.remaining;
  }

  get answeredScore() {
    return this.score;
  }
  get progress(): "unfinished" | "finished" {
    if (this.currentIndex + 1 == this.questions.length) return "finished";
    else return "unfinished";
  }
}
export default Quiz;
