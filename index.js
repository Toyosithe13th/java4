const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input")
const timeLeft = document.querySelector(".time b");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
           return timeLeft.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArr = randomObj.word.split("");
    for (let i = wordArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (1 + 1));
        [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]]
    }

    wordText.innerText = wordArr.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLocaleLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(randomObj);
}

initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) {
        return alert("Please enter a word check");
    } else if(userWord !== correctWord) {
        return alert(`Oops! ${userWord} is not a correct word`);
     }else{
        alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
     }
     initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
