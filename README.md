# Quiz: Topographie Sachsens

Das vorliegende Projekt ist ein interaktives Geographie-Quiz, das entwickelt wurde, um das Wissen über die Topographie des deutschen Bundeslandes Sachsen zu testen. Die Anwendung ermöglicht es den Benutzern, eine Reihe von Fragen zu beantworten, wobei jede Frage eine begrenzte Zeit hat. Die Benutzer müssen aus einer Auswahl von Antwortmöglichkeiten die richtige Option auswählen. Das Projekt umfasst ein Frontend mit HTML, CSS und JavaScript, das die Benutzeroberfläche für das Quiz bereitstellt, sowie ein Backend, das die Logik für das Zählen der richtigen Antworten und die Auswertung der Ergebnisse enthält.

<div align="center">
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Vorname</th>
      <th>Klasse</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kautzsch</td>
      <td>Maximilian</td>
      <td>10/3</td>
    </tr>
  </tbody>
</table>
</div>

## Funktionen

| Methode                  | Parameter                        | Beschreibung                                                                                                                                                                                                                    |
| ------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start_btn.onclick`      | -                                | Event handler für den Klick auf den Start-Quiz-Button. Fügt die Klasse `activeInfo` hinzu, um die Infobox anzuzeigen.                                                                                                           |
| `exit_btn.onclick`       | -                                | Event handler für den Klick auf den Exit-Quiz-Button. Entfernt die Klasse `activeInfo`, um die Infobox zu verbergen.                                                                                                            |
| `continue_btn.onclick`   | -                                | Event handler für den Klick auf den Weiter-Quiz-Button. Entfernt die Klasse `activeInfo`, um die Infobox zu verbergen, und fügt die Klasse `activeQuiz` hinzu, um die Quizbox anzuzeigen. Startet den Timer und die Timerzeile. |
| `restart_quiz.onclick`   | -                                | Event handler für den Klick auf den Quiz neu starten-Button. Setzt die Quizvariablen zurück und startet den Timer und die Timerzeile erneut.                                                                                    |
| `quit_quiz.onclick`      | -                                | Event handler für den Klick auf den Quiz verlassen-Button. Lädt die aktuelle Seite neu.                                                                                                                                         |
| `next_btn.onclick`       | -                                | Event handler für den Klick auf den Weiter-Button. Zeigt die nächste Frage an oder zeigt das Quizergebnis an, wenn alle Fragen beantwortet wurden.                                                                              |
| `showQuetions(index)`    | `index`: Index der Frage         | Funktion zur Anzeige der Frage und der Optionen basierend auf dem übergebenen Index.                                                                                                                                            |
| `optionSelected(answer)` | `answer`: Ausgewählte Antwort    | Funktion zur Behandlung der Auswahl einer Option durch den Benutzer. Überprüft die Antwort auf Richtigkeit und aktualisiert den Punktestand.                                                                                    |
| `showResult()`           | -                                | Funktion zur Anzeige des Quizergebnisses basierend auf dem Benutzerpunktestand.                                                                                                                                                 |
| `startTimer(time)`       | `time`: Anfangswert für die Zeit | Funktion zum Starten des Timers mit dem angegebenen Anfangswert.                                                                                                                                                                |
| `startTimerLine(time)`   | `time`: Anfangswert für die Zeit | Funktion zum Starten der Timerzeile mit dem angegebenen Anfangswert.                                                                                                                                                            |
| `queCounter(index)`      | `index`: Index der Frage         | Funktion zur Aktualisierung des Fragezählers.                                                                                                                                                                                   |

## Flowcharts

Die Flussdiagramme (Flowcharts) visualisieren den Hauptalgorithmus, den Ablauf der Funktionen für das Zählen der richtigen Ergebnisse und die Auswertung der Ergebnisse.

### Hauptalgorithmus

```mermaid

%%{init: {'theme':'neutral'}}%%

graph TD
    A[Start] --> B(Info anzeigen)
    B --> C{Spieler startet}
    C -->|Ja| D[Quiz starten]
    C -->|Nein| B
    D --> E(Frage anzeigen)
    E --> F{Antwort auswählen}
    F -->|Zeit abgelaufen| G(Resultat anzeigen)
    F -->|Antwort ausgewählt| H{Weiter zur nächsten Frage}
    H -->|Letzte Frage| G
    H -->|Weitere Fragen| E
    G --> I(Ende des Quiz)
    I --> J[Quiz wiederholen]
    I --> K[Quiz beenden]
    J --> B
    K --> L(Ende)
```

### Zählen der richtigen Antworten

```mermaid

%%{init: {'theme':'neutral'}}%%

graph TD
    A[Start] --> B(Initialisieren)
    B --> C{Frage beantwortet?}
    C -->|Ja| D(Richtige Antwort?)
    C -->|Nein| B
    D -->|Ja| E(Richtiges Ergebnis zählen)
    D -->|Nein| F(Weiter zur nächsten Frage)
    E --> F
    F --> C
```

### Auswertung der Ergebnisse

```mermaid

%%{init: {'theme':'neutral'}}%%

graph TD
    A[Start] --> B(Initialisieren)
    B --> C{Score überprüfen}
    C -->|Score > 3| D(Gute Nachricht anzeigen)
    C -->|Score > 1 and Score <= 3| E(Mittlere Nachricht anzeigen)
    C -->|Score <= 1| F(Schlechte Nachricht anzeigen)
    D --> G(Ende)
    E --> G
    F --> G
```
