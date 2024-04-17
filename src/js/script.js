/**
 * @file script.js
 * @brief JavaScript file containing functions for managing the quiz application.
 */

// Selecting all required elements
const start_btn =
  document.querySelector(".start_btn button"); /**< Start button element */
const info_box = document.querySelector(".info_box"); /**< Info box element */
const exit_btn =
  info_box.querySelector(".buttons .quit"); /**< Exit button element */
const continue_btn =
  info_box.querySelector(".buttons .restart"); /**< Continue button element */
const quiz_box = document.querySelector(".quiz_box"); /**< Quiz box element */
const result_box =
  document.querySelector(".result_box"); /**< Result box element */
const option_list =
  document.querySelector(".option_list"); /**< Option list element */
const time_line =
  document.querySelector("header .time_line"); /**< Time line element */
const timeText = document.querySelector(
  ".timer .time_left_txt"
); /**< Time left text element */
const timeCount =
  document.querySelector(".timer .timer_sec"); /**< Timer count element */
const restart_quiz =
  result_box.querySelector(
    ".buttons .restart"
  ); /**< Restart quiz button element */
const quit_quiz =
  result_box.querySelector(".buttons .quit"); /**< Quit quiz button element */
const next_btn =
  document.querySelector(
    "footer .next_btn"
  ); /**< Next question button element */
const bottom_ques_counter =
  document.querySelector(
    "footer .total_que"
  ); /**< Total question counter element */

/**
 * @brief Event handler for the start quiz button click.
 */
start_btn.onclick = () => {
  info_box.classList.add(
    "activeInfo"
  ); /**< Add activeInfo class to show info box */
};

/**
 * @brief Event handler for the exit quiz button click.
 */
exit_btn.onclick = () => {
  info_box.classList.remove(
    "activeInfo"
  ); /**< Remove activeInfo class to hide info box */
};

/**
 * @brief Event handler for the continue quiz button click.
 */
continue_btn.onclick = () => {
  info_box.classList.remove(
    "activeInfo"
  ); /**< Remove activeInfo class to hide info box */
  quiz_box.classList.add(
    "activeQuiz"
  ); /**< Add activeQuiz class to show quiz box */
  showQuetions(0); /**< Show the first question */
  queCounter(1); /**< Update the question counter */
  startTimer(15); /**< Start the timer */
  startTimerLine(0); /**< Start the timer line */
};

// Initialize variables
let timeValue = 15; /**< Initial time value */
let que_count = 0; /**< Question count */
let que_numb = 1; /**< Question number */
let userScore = 0; /**< User score */
let counter; /**< Timer counter */
let counterLine; /**< Timer line counter */
let widthValue = 0; /**< Timer line width */

/**
 * @brief Event handler for the restart quiz button click.
 */
restart_quiz.onclick = () => {
  quiz_box.classList.add(
    "activeQuiz"
  ); /**< Add activeQuiz class to show quiz box */
  result_box.classList.remove(
    "activeResult"
  ); /**< Remove activeResult class to hide result box */
  // Reset variables
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); /**< Show the first question */
  queCounter(que_numb); /**< Update the question counter */
  clearInterval(counter); /**< Clear timer counter */
  clearInterval(counterLine); /**< Clear timer line counter */
  startTimer(timeValue); /**< Start the timer */
  startTimerLine(widthValue); /**< Start the timer line */
  timeText.textContent = "Restzeit"; /**< Update timer text */
  next_btn.classList.remove("show"); /**< Hide next button */
};

/**
 * @brief Event handler for the quit quiz button click.
 */
quit_quiz.onclick = () => {
  window.location.reload(); /**< Reload the current window */
};

/**
 * @brief Event handler for the next question button click.
 */
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++; /**< Increment question count */
    que_numb++; /**< Increment question number */
    showQuetions(que_count); /**< Show the next question */
    queCounter(que_numb); /**< Update the question counter */
    clearInterval(counter); /**< Clear timer counter */
    clearInterval(counterLine); /**< Clear timer line counter */
    startTimer(timeValue); /**< Start the timer */
    startTimerLine(widthValue); /**< Start the timer line */
    timeText.textContent = "Restzeit"; /**< Update timer text */
    next_btn.classList.remove("show"); /**< Hide next button */
  } else {
    clearInterval(counter); /**< Clear timer counter */
    clearInterval(counterLine); /**< Clear timer line counter */
    showResult(); /**< Show the quiz result */
  }
};

/**
 * @brief Function to display the question and options.
 * @param index - Index of the question.
 */
function showQuetions(index) {
  const que_text =
    document.querySelector(".que_text"); /**< Question text element */
  // Create HTML for question and options
  let que_tag =
    "<span class='que-img-container'>" +
    "<img src='../img/img" +
    questions[index].numb +
    ".jpg' alt='Question Image " +
    questions[index].numb +
    "'>" +
    "</span>" +
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag; /**< Update question text */
  option_list.innerHTML = option_tag; /**< Update option list */

  const option = option_list.querySelectorAll(".option"); /**< Option list */
  // Add onclick attribute to all options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

/**
 * @brief Function to handle option selection.
 * @param answer - Selected answer.
 */
function optionSelected(answer) {
  clearInterval(counter); /**< Clear timer counter */
  clearInterval(counterLine); /**< Clear timer line counter */
  let userAns = answer.textContent; /**< User selected answer */
  let correcAns = questions[que_count].answer; /**< Correct answer */
  const allOptions =
    option_list.children.length; /**< Total number of options */

  // Check if the user's answer is correct
  if (userAns == correcAns) {
    userScore += 1; /**< Increment user score */
    answer.classList.add(
      "correct"
    ); /**< Add correct class to selected option */
    answer.insertAdjacentHTML("beforeend", tickIconTag); /**< Add tick icon */
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add(
      "incorrect"
    ); /**< Add incorrect class to selected option */
    answer.insertAdjacentHTML("beforeend", crossIconTag); /**< Add cross icon */
    console.log("Wrong Answer");
    // Auto-select correct answer
    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        option_list.children[i].setAttribute(
          "class",
          "option correct"
        ); /**< Add correct class to correct option */
        option_list.children[i].insertAdjacentHTML(
          "beforeend",
          tickIconTag
        ); /**< Add tick icon */
        console.log("Auto selected correct answer.");
      }
    }
  }
  // Disable all options
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show"); /**< Show next button */
}

/**
 * @brief Function to display the quiz result.
 */
function showResult() {
  info_box.classList.remove(
    "activeInfo"
  ); /**< Remove activeInfo class to hide info box */
  quiz_box.classList.remove(
    "activeQuiz"
  ); /**< Remove activeQuiz class to hide quiz box */
  result_box.classList.add(
    "activeResult"
  ); /**< Add activeResult class to show result box */
  const scoreText =
    result_box.querySelector(".score_text"); /**< Score text element */
  // Display different messages based on the score
  if (userScore > 3) {
    let scoreTag =
      "<span>Super! Du hast <p>" +
      userScore +
      "</p> von <p>" +
      questions.length +
      "</p> Fragen richtig.</span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>Gut! Du hast <p>" +
      userScore +
      "</p> von <p>" +
      questions.length +
      "</p> Fragen richtig.</span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>Schade! Du hast <p>" +
      userScore +
      "</p> von <p>" +
      questions.length +
      "</p> Fragen richtig.</span>";
    scoreText.innerHTML = scoreTag;
  }
}

/**
 * @brief Function to start the timer.
 * @param time - Initial time value.
 */
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; /**< Update timer count */
    time--; /**< Decrement time */
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; /**< Add leading zero */
    }
    if (time < 0) {
      clearInterval(counter); /**< Clear timer counter */
      timeText.textContent = "Time Off"; /**< Update timer text */
      const allOptions =
        option_list.children.length; /**< Total number of options */
      let correcAns = questions[que_count].answer; /**< Correct answer */
      // Auto-select correct answer
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          option_list.children[i].setAttribute(
            "class",
            "option correct"
          ); /**< Add correct class to correct option */
          option_list.children[i].insertAdjacentHTML(
            "beforeend",
            tickIconTag
          ); /**< Add tick icon */
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      // Disable all options
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show"); /**< Show next button */
    }
  }
}

/**
 * @brief Function to start the timer line.
 * @param time - Initial time value.
 */
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; /**< Increment time */
    time_line.style.width = time + "px"; /**< Update timer line width */
    if (time > 549) {
      clearInterval(counterLine); /**< Clear timer line counter */
    }
  }
}

/**
 * @brief Function to update the question counter.
 * @param index - Index of the question.
 */
function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> von <p>" +
    questions.length +
    "</p> Fragen</span>";
  bottom_ques_counter.innerHTML =
    totalQueCounTag; /**< Update question counter */
}
