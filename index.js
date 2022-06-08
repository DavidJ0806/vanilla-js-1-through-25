'use strict'
/**
 * function that assigns all of the button's innertext and id to random numbers 1-25
 */
const addNumbersToButtons = () => {
    const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    const buttons = document.querySelectorAll('.tile');
    for (const button of buttons) {
        while (button.innerText == "") {
            const randomNumber = Math.floor((Math.random() * 25) + 1);
            if (numberArray.includes(randomNumber)) {
                button.innerText = randomNumber;
                button.id = randomNumber;
                let index = numberArray.indexOf(randomNumber);
                numberArray.splice(index, 1);
            }
        }
    }
}
/**
 * When a user clicks a wrong number, shuffle all remaining numbers
 */
const shuffleButtons = () => {
    const buttons = document.querySelectorAll('.tile');
    const newArray = [];
    for (const button of buttons) {
        newArray.push(button.innerText);
        button.innerText = "";
        button.id = "";
    }
    for (const button of buttons) {
        while (button.innerText == "") {
            const randomNumber = "" + Math.floor((Math.random() * 25) + 1);
            if (newArray.includes(randomNumber)) {
                button.innerText = randomNumber;
                button.id = randomNumber;
                let index = newArray.indexOf(randomNumber);
                newArray.splice(index, 1);
            }
        }
    }
}
/**
 * changes the color of a button from .newColor to tile
 */
const revertClassName = () => {
    const changedButtons = document.querySelectorAll('.newColor');
    for (const change of changedButtons) {
        change.className = "tile";
    }
}
/**
 * clears the .innerText of button's with .tile
 */
const clearInnerText = () => {
    const buttons = document.querySelectorAll('.tile');
    for (const button of buttons) {
        button.innerText = "";
        button.id = "";
    }
}
/**
 * clears the win message and resets the classname and innertext
 */
const clearButtons = () => {
    const deleteWinMessage = document.querySelector('#winMessage')
    deleteWinMessage.innerText = "";
    revertClassName();
    clearInnerText();
}
/**
 * clears the button text and win message, as well as starts the timer and starts the game
 */
const start = () => {
    clearButtons();
    addNumbersToButtons();
    stopTimer();
    resetTimer();
    startTimer();
}
/**
 * assigns event listener to the start button
 */
const startButton = () => {
    const startButton = document.querySelector('#start');
    startButton.addEventListener('click', start);
}
/**
 * checks if the previous button has the new class, and if it does, assigns it the new class
 *        if not, the remaining buttons get reshuffled, and the timer increments by 10 seconds
 * @param {event} e mouse event 'click'
 */
const colorChange = (e) => {
    let previousButtonId = e.target.id - 1;
    if (e.target.id == 1 || document.getElementById(previousButtonId).classList.contains('newColor') === true) { //check if e.target.id -1 has newColor) {
        e.target.className = "newColor";
        winMessage();
    } else {
        shuffleButtons();
        if (seconds <= 50) {
            seconds += 10;
        } else if (seconds >= 51) {
            seconds = seconds - 50;
            appendSeconds.innerHTML = "0" + seconds;
            minutes = Number(minutes) + 1;
            appendMinutes.innerHTML = "0" + minutes;
        }
    }
}
/**
 * adds event listeners to all .tile buttons 
 */
const addListenersToButtons = () => {
    const buttons = document.querySelectorAll('.tile');
    for (const button of buttons) {
        button.addEventListener('click', colorChange);

    }
}
/**
 * creates a win message to display to the user if the 25th button changes color. stops timer
 */
const winMessage = () => {
    if (document.getElementById(25).classList.contains('newColor')) {
        document.querySelector('#winMessage').innerText = "You Win!";
        stopTimer();
    }
}
startButton();
addListenersToButtons();

let seconds = 0;
let tens = 0;
let minutes = 0;
const appendSeconds = document.getElementById("seconds");
const appendMinutes = document.getElementById('minutes');
const buttonStart = document.getElementById('start');
const buttonStop = document.getElementById('start');
const buttonReset = document.getElementById('start');
let Interval;

/**
 * sets interval for timer
 */
buttonStart.onclick = function () {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}
/**
 * stops the timer
 */
const stopTimer = () => {
    if (buttonStop.onclick) {
        clearInterval(Interval);
    }
}
/**
 * resets and displays the timer to 0
 */
const resetTimer = () => {
    if (buttonReset.onclick) {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        minutes = "00";
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;
    }
}
/**
 * starts and displays the timer
 */
const startTimer = () => {
    tens++;
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
    }
}