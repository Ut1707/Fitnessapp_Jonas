# Training — Jonas & Franca

Schlichter Trainings-Tracker. Eine einzelne HTML-Datei, keine Installation,
keine Cloud. Alle Daten liegen im `localStorage` des jeweiligen Geräts.

**Öffnen:** `index.html` doppelklicken.

## Aufbau

- **Profile** — oben zwischen `Franca` und `Jonas` umschalten. Beide sehen die
  Einträge des anderen, jeder hat aber seinen eigenen Datensatz.
- **Kalender** — Tag antippen, Training eintragen. Punkte zeigen Tage mit Training.
- **Körper** — Gewicht, Brust, Taille, Hüfte, Oberschenkel, Arm.
- **Dashboard** — Einheiten, Kilometer, bewegtes Gewicht, Gewichtsverlauf.

## Kategorien

- **Cardio** — Distanz, Dauer, Pace wird berechnet.
- **Fitness** — Trainings mit Übungsliste; pro Satz Wiederholungen und Gewicht.
  Beim nächsten Mal sind die Werte des letzten Mals vorausgefüllt.
- **Weitere** — eigene Kategorien, Eingabeart beim Anlegen wählbar.

Trainings und Übungen lassen sich im Kalender unter
„Kategorien & Übungen bearbeiten" anpassen.

## Sicherung

Im Dashboard: `Daten sichern` schreibt eine JSON-Datei, `Sicherung einlesen`
holt sie zurück. Ohne Sicherung sind die Daten weg, wenn der Browser-Speicher
gelöscht wird.

---

`index_alt.html` ist die frühere, deutlich umfangreichere Version.
