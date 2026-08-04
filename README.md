# 12 Wochen — Jonas & Franca

Trainings-Tracker für den 12-Wochen-Plan. Eine einzelne HTML-Datei, keine
Installation, keine Cloud. Alle Daten liegen im `localStorage` des Geräts.

**Öffnen:** `index.html` doppelklicken.

**Start von Woche 1:** 01.08.2026, änderbar im Plan-Tab.

## Trainingswoche

Umschaltbar im Plan-Tab, jederzeit und ohne Datenverlust:

| | 4 Einheiten (Standard) | 3 Einheiten |
|---|---|---|
| 1 | Unterkörper B · Kniebeuge-Tag · ~60 Min | Unterkörper B · ~75 Min |
| 2 | Oberkörper 1 · Grundübungen · ~50 Min | Oberkörper · ~70 Min |
| 3 | Unterkörper A · Hip-Thrust-Tag · ~55 Min | Unterkörper A · ~70 Min |
| 4 | Oberkörper 2 · Ergänzung · ~55 Min | — |

Im Vierer mischt jeder Oberkörpertag Zug und Druck, damit Rücken, Brust und
Schultern zweimal pro Woche drankommen. Das Wochenvolumen ist in beiden
Varianten gleich, nur anders verteilt.

**Keine festen Wochentage.** Der Kalender zeigt die Einheiten der laufenden
Woche als Liste mit Erledigt-Stand — abgearbeitet wird, wann es passt. Die
Reihenfolge ist ein Vorschlag; zwischen den beiden Beintagen sollte ein Tag
liegen. Wer eine Einheit doch fest auf einen Wochentag legen will, macht das
unter Plan → Anpassen. Volleyball und Beach bleiben auf Montag und Donnerstag.

Beim Wechsel zwischen Vierer und Dreier bleiben Gewichte und Progression
erhalten — die App findet die Übung auch in einem anderen Training wieder.

## Aufbau

Oben zwischen `Franca` und `Jonas` umschalten — getrennte Datensätze, beide
sehen die Einträge des anderen.

- **Kalender** — die Einheiten dieser Woche mit Erledigt-Stand, Gewicht des Tages,
  Ernährungshaken, Monatsübersicht
- **Körper** — Umfänge nach Plan, Kontrollpunkte Start / Woche 4 / 8 / 12
- **Plan** — Wochenaufteilung, alle Trainings, Progression, Blöcke, Messanleitung
- **Essen** — Zielwerte, Beispieltag, Proteinliste, Timing, Schlaf, Supplements,
  Anpassungsregel und der Tageshaken mit Wochenquote
- **Auswertung** — Wochenfortschritt, Beineinheiten, Gewichtstrend, Umfänge, Kraftzuwachs

## Trainingseingabe

Der Plan füllt das Formular vor. Für jede Übung berechnet die App aus dem Log
das Zielgewicht und die Ziel-Wiederholungen nach Doppelprogression:

- alle Sätze erreicht, oberes Ende des Bereichs noch offen → eine Wiederholung mehr
- oberes Ende erreicht → Gewicht plus Steigerungsschritt, Wiederholungen zurück auf das untere Ende
- zwei Wochen keine zusätzliche Wiederholung → Hinweis, Vorschlag minus 10 %
- Woche 7 → automatisch 60 % vom letzten Gewicht (Deload)
- Woche 1 → keine Vorschläge, stattdessen der Startbereich aus dem Plan

Das Gewicht ist vorbelegt, die Wiederholungen stehen als Vorgabe im Feld —
`alle = 8` füllt sie mit einem Tipp. Bei gemeinsamen Einheiten schaltet der
Umschalter oben im Formular zwischen beiden Personen um, gespeichert wird für
beide getrennt.

## Anpassen

Im Plan-Tab hat jedes Training einen `Anpassen`-Knopf:

- **Wochentag ändern** — verschiebt das Training dauerhaft
- **Übungen** — rausnehmen, zurückholen, Reihenfolge ändern, eigene hinzufügen
  (mit Sätzen, Wiederholungsbereich, Steigerungsschritt und Gewichtsart)

Übungsänderungen gelten pro Person, der Wochentag für beide. Bereits erfasste
Einträge bleiben unverändert.

**Zusätzliche Einheiten:** über `+ Eintragen` lässt sich jedes Plan-Training an
jedem Tag erfassen, dazu `Freies Krafttraining` für Einheiten außerhalb des
Plans und eigene Cardio-Arten.

## Abweichungen vom Ausgangsplan

- Kniebeugen-Tag auf Dienstag, Hip-Thrust-Tag auf Freitag (Erholung nach dem Beach)
- **Dienstag und Freitag sind für beide identisch** — gleiche Übungen, gleiche
  Reihenfolge, nur die Gewichte unterscheiden sich
- Beinstrecker durch Abduktion ersetzt, Hip Thrust 8–12 statt 6–10,
  Beinbeuger auf 4 Sätze
- Zug-Block dienstags (Klimmzüge/Latzug, Rudern) und Druck-Block freitags
  (Bankdrücken, Schulterdrücken) — bringt den Oberkörper bei beiden auf
  zweimal pro Woche
- Sie: Donnerstag mit Bizeps, Trizeps und Po-Block am Ende
- Er: Sonntag ist ein vollwertiger Oberkörpertag statt Bodyweight-Zirkel,
  mit Schrägbankdrücken für 10 Brustsätze pro Woche
- Ernährung: bei ihm Kontrolle des Gewichtstrends ab Woche 2, an Volleyballtagen
  300–400 kcal mehr; Schlaf als eigener Punkt ergänzt

### Wochenvolumen nach den Änderungen

| Muskel | Franca | Jonas |
|---|---|---|
| Gesäß | ~17 Sätze, 3× | ~14 Sätze, 2× |
| Quadrizeps | 13, 2× | 13, 2× |
| Beinbeuger | 8,5, 2× | 8,5, 2× |
| Rücken | 12, 2× | 13, 2× |
| Brust | 6, 2× | 10, 2× |
| Schultern | 9, 2× | 9, 2× |

## Sicherung

Im Plan-Tab unten: `Daten sichern` schreibt eine JSON-Datei, `Sicherung einlesen`
holt sie zurück. Auch der Weg, Daten zwischen Handy und Rechner zu übertragen.
Ohne Sicherung sind die Daten weg, wenn der Browser-Speicher gelöscht wird.

---

`index_alt.html` ist die ursprüngliche App vor dem Umbau.
