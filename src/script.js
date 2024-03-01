var correct_cnt = 0;
var wrong_cnt = 0;

function check(question, correct_index) {
  var radio_buttons = document.getElementsByName("answers" + question);
  if (radio_buttons[correct_index].checked) {
    correct_cnt++;
    alert("Richtig!");
  } else {
    wrong_cnt++;
    alert("Falsch!");
  }
}

function summary() {
  alert(
    "Richtige Antworten: " +
      correct_cnt +
      "\nFalsche Antworten: " +
      wrong_cnt +
      "\nAnteil:" +
      Math.round((correct_cnt / (correct_cnt + wrong_cnt)) * 100) +
      "%"
  );
}
