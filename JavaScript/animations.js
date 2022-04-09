const slideUpAnimaion = () => {
    anime({
        targets: ".slideup",
        keyframes: [
            { height: 0, easing: "easeInQuint", duration: 600 },
            { top: -100 },
        ],
    });
    anime();
};
const slideDownAnimation = (status, points) => {
    let bgcolor = status == "win" ? "#1abc9c" : "#e74c3c";
    let result = document.querySelector(".result");
    let score = { score: 0 };
    let timeline = anime.timeline();
    timeline.add({
        targets: ".slidedown",
        keyframes: [
            {
                top: "0px",
                height: "100%",
                "background-color": bgcolor,
                easing: "easeInQuint",
                duration: 600,
            },
        ],
    });
    timeline.add({
        targets: score,
        score: points,
        delay: 50,
        duration: 300,
        easing: "linear",
        round: 1,
        update: () => {
            result.innerHTML = `${score.score} questions passed`;
        },
    });
};
const rightAnswerAnimation = (key) => {
    let target = document.querySelector(`.answer-box[key="${key}"]`);
    anime({
        targets: target,
        keyframes: [
            { "background-color": "#e74c3c" },
            { translateX: 10 },
            { translateX: -5 },
        ],
        easing: "easeInOutQuint",
        duration: 100,
        loop: 3,
    });
};
const wrongAnswerAnimation = (key) => {
    let target = document.querySelector(`.answer-box[key="${key}"]`);
    return new Promise((resolve) => {
        anime({
            targets: target,
            "background-color": "#2ecc71",
            width: 0,
            height: 0,
            duration: 3000,
            begin: () => {
                target.innerHTML = "";
            },
            update: (animeObj) => {
                if (animeObj["progress"] >= 12) {
                    animeObj.remove();
                    target === null || target === void 0 ? void 0 : target.remove();
                    resolve(true);
                }
            },
        });
    });
};
export { slideUpAnimaion, rightAnswerAnimation, wrongAnswerAnimation, slideDownAnimation, };
