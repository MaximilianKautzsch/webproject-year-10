/**
 * @file script.js
 * @brief JavaScript-Datei mit der gesamten Logik des Programms.
 */

// Auswahl aller erforderlichen Elemente
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Wenn der startQuiz-Button angeklickt wird
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); // Info-Box anzeigen
};

// Wenn der exitQuiz-Button angeklickt wird
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // Info-Box ausblenden
};

// Wenn der continueQuiz-Button angeklickt wird
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // Info-Box ausblenden
  quiz_box.classList.add("activeQuiz"); // Quiz-Box anzeigen
  showQuetions(0); // Aufruf der showQestions-Funktion
  queCounter(1); // Übergabe eines Parameters an queCounter
  startTimer(15); // Aufruf der startTimer-Funktion
  startTimerLine(0); // Aufruf der startTimerLine-Funktion
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Wenn der restartQuiz-Button angeklickt wird
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); // Quiz-Box anzeigen
  result_box.classList.remove("activeResult"); // Ergebnis-Box ausblenden
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); // Aufruf der showQestions-Funktion
  queCounter(que_numb); // Übergabe des que_numb-Werts an queCounter
  clearInterval(counter); // Zähler zurücksetzen
  clearInterval(counterLine); // Zähler zurücksetzen
  startTimer(timeValue); // Aufruf der startTimer-Funktion
  startTimerLine(widthValue); // Aufruf der startTimerLine-Funktion
  timeText.textContent = "Restzeit"; // Text von timeText zu "Restzeit" ändern
  next_btn.classList.remove("show"); // Nächsten Button ausblenden
};

// Wenn der quitQuiz-Button angeklickt wird
quit_quiz.onclick = () => {
  window.location.reload(); // Aktuelles Fenster neu laden
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Wenn der Next-Que-Button angeklickt wird
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    // Wenn die Fragenanzahl kleiner als die Gesamtanzahl der Fragen ist
    que_count++; // Zähler erhöhen
    que_numb++; // Zähler erhöhen
    showQuetions(que_count); // Aufruf der showQestions-Funktion
    queCounter(que_numb); // Übergabe des que_numb-Werts an queCounter
    clearInterval(counter); // Zähler zurücksetzen
    clearInterval(counterLine); // Zähler zurücksetzen
    startTimer(timeValue); // Aufruf der startTimer-Funktion
    startTimerLine(widthValue); // Aufruf der startTimerLine-Funktion
    timeText.textContent = "Restzeit"; // Text von timeText zu "Restzeit" ändern
    next_btn.classList.remove("show"); // Nächsten Button ausblenden
  } else {
    clearInterval(counter); // Zähler zurücksetzen
    clearInterval(counterLine); // Zähler zurücksetzen
    showResult(); // Aufruf der showResult-Funktion
  }
};

// Fragen und Optionen aus dem Array abrufen
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");
  // Erstellen eines neuen span- und div-Tags für Frage, Bild und Option und Übergeben des Werts mit Array-Index
  let que_tag =
    "<span class='que-img-container'>" +
    "<img src='../img/img" +
    questions[index].numb +
    ".jpg' alt='Fragebild " +
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
  que_text.innerHTML = que_tag; // Neues span-Tag in que_tag einfügen
  option_list.innerHTML = option_tag; // Neues div-Tag in option_tag einfügen

  const option = option_list.querySelectorAll(".option");
  // Allen verfügbaren Optionen das onclick-Attribut zuweisen
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// Neue div-Tags für Icons erstellen
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Wenn der Benutzer auf eine Option klickt
function optionSelected(answer) {
  clearInterval(counter); // Zähler zurücksetzen
  clearInterval(counterLine); // Zähler zurücksetzen
  let userAns = answer.textContent; // Ausgewählte Option des Benutzers abrufen
  let correcAns = questions[que_count].answer; // Richtige Antwort aus dem Array abrufen
  const allOptions = option_list.children.length; // Alle Optionen abrufen

  if (userAns == correcAns) {
    // Wenn die ausgewählte Option des Benutzers der richtigen Antwort im Array entspricht
    userScore += 1; // Punktzahl um 1 erhöhen
    answer.classList.add("correct"); // Grüne Farbe zur ausgewählten richtigen Option hinzufügen
    answer.insertAdjacentHTML("beforeend", tickIconTag); // Häkchen-Symbol zur ausgewählten richtigen Option hinzufügen
    console.log("Richtige Antwort");
    console.log("Deine richtigen Antworten = " + userScore);
  } else {
    answer.classList.add("incorrect"); // Rote Farbe zur ausgewählten falschen Option hinzufügen
    answer.insertAdjacentHTML("beforeend", crossIconTag); // Kreuz-Symbol zur ausgewählten falschen Option hinzufügen
    console.log("Falsche Antwort");
    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        // Wenn eine Option mit der Antwort im Array übereinstimmt
        option_list.children[i].setAttribute("class", "option correct"); // Grüne Farbe zur übereinstimmenden Option hinzufügen
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Häkchen-Symbol zur übereinstimmenden Option hinzufügen
        console.log("Automatisch die richtige Antwort ausgewählt.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); // Alle Optionen deaktivieren, nachdem der Benutzer eine Option ausgewählt hat
  }
  next_btn.classList.add("show"); // Nächsten Button anzeigen, wenn der Benutzer eine Option ausgewählt hat
}

// Ergebnis anzeigen
function showResult() {
  info_box.classList.remove("activeInfo"); // Info-Box ausblenden
  quiz_box.classList.remove("activeQuiz"); // Quiz-Box ausblenden
  result_box.classList.add("activeResult"); // Ergebnis-Box anzeigen
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    // Wenn der Benutzer mehr als 3 Punkte erzielt hat
    // Neues span-Tag erstellen und Benutzerpunktzahl und Gesamtanzahl der Fragen übergeben
    let scoreTag =
      "<span>Super! Du hast <p>" +
      userScore +
      "</p> von <p>" +
      questions.length +
      "</p> Fragen richtig.</span>";
    scoreText.innerHTML = scoreTag; // Neues span-Tag in score_Text einfügen
  } else if (userScore > 1) {
    // Wenn der Benutzer mehr als 1 Punkt erzielt hat
    let scoreTag =
      "<span>Gut! Du hast <p>" +
      userScore +
      "</p> von <p>" +
      questions.length +
      "</p> Fragen richtig.</span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // Wenn der Benutzer weniger als 1 Punkt erzielt hat
    let scoreTag =
      "<span>Schade! Du hast <p>" +
      userScore +
      "</p> von <p>" +
      questions.length +
      "</p> Fragen richtig.</span>";
    scoreText.innerHTML = scoreTag;
  }
}

// Timer starten
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; // Wert von timeCount mit Zeitwert ändern
    time--; // Zeitwert verringern
    if (time < 9) {
      // Wenn die Zeit kleiner als 9 ist
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; // Eine 0 vor den Zeitwert hinzufügen
    }
    if (time < 0) {
      // Wenn die Zeit kleiner als 0 ist
      clearInterval(counter); // Zähler zurücksetzen
      timeText.textContent = "Zeit abgelaufen"; // Text auf Zeit abgelaufen ändern
      const allOptions = option_list.children.length; // Alle Optionen abrufen
      let correcAns = questions[que_count].answer; // Richtige Antwort aus dem Array abrufen
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          // Wenn eine Option mit der Antwort im Array übereinstimmt
          option_list.children[i].setAttribute("class", "option correct"); // Grüne Farbe zur übereinstimmenden Option hinzufügen
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Häkchen-Symbol zur übereinstimmenden Option hinzufügen
          console.log(
            "Zeit abgelaufen: Automatisch die richtige Antwort ausgewählt."
          );
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); // Alle Optionen deaktivieren, nachdem der Benutzer eine Option ausgewählt hat
      }
      next_btn.classList.add("show"); // Nächsten Button anzeigen, wenn der Benutzer eine Option ausgewählt hat
    }
  }
}

// Timerleiste starten
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; // Zeitwert um 1 erhöhen
    time_line.style.width = time + "px"; // Breite der Zeitlinie um px entsprechend dem Zeitwert erhöhen
    if (time > 549) {
      // Wenn der Zeitwert größer als 549 ist
      clearInterval(counterLine); // ZählerLeitung zurücksetzen
    }
  }
}

// Fragenzähler erstellen
function queCounter(index) {
  // Neues span-Tag erstellen und die Frage Nummer und Gesamtanzahl der Fragen übergeben
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> von <p>" +
    questions.length +
    "</p> Fragen</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; // Neues span-Tag in bottom_ques_counter einfügen
}
