# Training — Jonas & Franca

Trainings-Tracker mit selbst zusammengestellter Trainingswoche. Eine einzelne HTML-Datei, keine
Installation, keine Cloud. Alle Daten liegen im `localStorage` des Geräts.

**Online:** https://ut1707.github.io/Fitnessapp_Jonas/ · **Lokal:** `index.html` doppelklicken.

## Aufbau

Oben zwischen `Franca` und `Jonas` umschalten, unten drei Tabs:

- **Heute** — das nächste offene Training aus „Meine Woche“ mit einem Knopf zum Starten,
  darunter die restlichen Einheiten, „Anderes Training eintragen“ und die letzten drei Einträge
- **Fortschritt** — Kraftentwicklung je Übung, Körpergewicht, Umfänge, alle Trainings
- **Mehr** — Meine Woche, eigene Trainings, bisheriger Plan und Zusatz-Trainings, Sicherungen

## Meine Woche

Jede Person stellt sich unter Mehr → `Woche zusammenstellen` selbst zusammen, welche Trainings
jede Woche anstehen: eigene, Vorlagen, der bisherige Plan oder Zusatz-Trainings. Reihenfolge mit
↑ ↓, rausnehmen mit ✕. Solange nichts gewählt wurde, gilt der bisherige Plan als Vorschlag.
Die Woche läuft von Montag bis Sonntag, der Erledigt-Stand setzt sich jeden Montag zurück.
Neue Trainings landen auf Wunsch direkt in der Woche.

## Trainingseingabe

Für jede Übung schlägt die App Sätze, Wiederholungen und Gewicht vor (Doppelprogression):

- alle Sätze erreicht, oberes Ende des Bereichs noch offen → eine Wiederholung mehr
- oberes Ende erreicht → Gewicht plus Steigerungsschritt, Wiederholungen zurück auf das untere Ende
- zwei Wochen keine zusätzliche Wiederholung → Hinweis, Vorschlag minus 10 %

Das Gewicht ist vorbelegt, `alle = 8` füllt die Wiederholungen mit einem Tipp. Darunter steht,
was beim letzten Mal geschafft wurde. Bei gemeinsamen Einheiten schaltet der Umschalter im
Formular zwischen beiden Personen um, gespeichert wird für beide getrennt.

## Push · Pull · Legs

Fertiger 3er-Split fürs Studio, nach einem Reel von andreasthiemexnn, mit je 3 Sätzen:
**Push** (Brust, Schultern, Trizeps), **Pull** (Rücken, hintere Schulter, Bizeps; ergänzt um Latzug)
und **Beine & Core**. Unter Mehr → `Woche zusammenstellen` ganz oben auswählbar.

## Übungskatalog und neue Trainings

111 Übungen, sortiert nach Brust, Rücken, Schultern, Arme, Beine, Po und Rumpf, mit Suche.
Oben umschalten zwischen **Fitnessstudio** (alle Übungen) und **Zuhause** (42 Übungen ohne Geräte,
höchstens Rucksack, Wasserflasche, Stuhl oder Miniband). Bei einem Heim-Training steht der
Katalog automatisch auf Zuhause. Der Katalog öffnet sich überall, wo eine Übung
dazukommt: im laufenden Training über `+ Übung` und unter Mehr → Anpassen.
Sätze, Wiederholungen, Pause und Steigerungsschritt sind sinnvoll vorbelegt.

Mehr → `+ Neues Training` legt ein Training aus einer Vorlage an oder leer zum Selbstbefüllen,
wahlweise für beide. Auch hier oben Fitnessstudio oder Zuhause:

- **Fitnessstudio:** Push, Pull, Beine, Oberkörper, Unterkörper, Ganzkörper A/B, Po-Fokus, Schultern & Arme, Rumpf
- **Zuhause:** Ganzkörper, Oberkörper, Beine & Po, Po, Bauch, Kurzhantel-Ganzkörper

## Trainings aus Textdatei

Mehr → `+ Trainings aus Textdatei` liest eine `.txt`-Datei oder eingefügten Text —
eine Überschrift pro Training, darunter eine Übung pro Zeile:

    Tag 1 – Push
    - Bankdrücken 4x8-10 Pause 2 Min
    - Seitheben 3 Sätze à 15 Wdh
    - Plank 3x45 Sek

Beispiel: `beispiel-trainings.txt`. Tests für den Parser: `node --test 'tests/*.test.mjs'`

## Datensicherheit

- Ein laufendes Training wird bei jeder Eingabe zwischengespeichert; die Startseite bietet „Weitermachen“ an.
- Jeden Tag eine automatische Sicherung, die letzten fünf werden behalten (Mehr → Automatische Sicherungen).
- Beschädigter Speicher führt nie zu einem stillen Neustart mit leeren Daten.
- Mehr → `Daten sichern` schreibt eine JSON-Datei — auch der Weg, Daten zwischen Geräten zu übertragen.
  Ohne Sicherung sind die Daten weg, wenn der Browser-Speicher gelöscht wird.
