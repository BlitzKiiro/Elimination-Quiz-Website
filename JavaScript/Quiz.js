class Quiz {
    constructor() {
        this.questions = [];
        this.score = 0;
        this.currentIndex = 0;
        this.remaining = 0;
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
    selectAnswer(ansNum) {
        let currentQuestion = this.questions[this.currentIndex];
        let writeAnswerNum = currentQuestion["rightAnswerNumber"];
        if (ansNum == writeAnswerNum)
            return "right";
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
    get progress() {
        if (this.currentIndex + 1 == this.questions.length)
            return "finished";
        else
            return "unfinished";
    }
}
export default Quiz;
