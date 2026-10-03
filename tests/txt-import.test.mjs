// tests/txt-import.test.mjs
// Prüft den Text-Import-Parser aus index.html, ohne Browser.
// Ausführen:  node --test 'tests/*.test.mjs'
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const a = html.indexOf('/* @@TXT-IMPORT-BEGIN */');
const b = html.indexOf('/* @@TXT-IMPORT-END */');
if(a < 0 || b < a) throw new Error('Parser-Block @@TXT-IMPORT-BEGIN/END in index.html nicht gefunden');

const ctx = vm.createContext({});
vm.runInContext('"use strict";\n' + html.slice(a, b), ctx);

/* Ergebnisse stammen aus einem anderen Realm — deepStrictEqual vergleicht Prototypen,
   deshalb einmal durch JSON schicken. */
const parse = (t, o) => JSON.parse(JSON.stringify(ctx.parseTrainingText(t, o)));
const STEPS = ['grund','presse','maschine','kh','iso'];

test('einzelnes Training mit Überschrift', () => {
  const r = parse('Push\nBankdrücken 4x8-10\nSeitheben 3 x 15');
  assert.equal(r.workouts.length, 1);
  const w = r.workouts[0];
  assert.equal(w.name, 'Push');
  assert.equal(w.plan, '');
  assert.deepEqual(w.ex.map(x => [x.n, x.sets, x.reps]), [
    ['Bankdrücken', 4, [8,10]],
    ['Seitheben', 3, [15,15]]
  ]);
  assert.equal(w.ex[0].step, 'grund');
  assert.equal(w.ex[0].rest, '90 Sek.');
});

test('kompletter Plan: erste leere Überschrift wird Planname', () => {
  const t = [
    'Mein Sommerplan',
    '',
    'Tag 1: Push',
    '- Bankdrücken 4×8–10',
    '- Schulterdrücken Kurzhantel 3x10-12 Pause 90s',
    '',
    'Tag 2: Pull',
    '1. Klimmzüge 4x6-8',
    '2. Rudern Langhantel 3 Sätze à 10 Wdh'
  ].join('\r\n');
  const r = parse(t);
  assert.deepEqual(r.workouts.map(w => [w.name, w.plan, w.ex.length]), [
    ['Tag 1 · Push', 'Mein Sommerplan', 2],
    ['Tag 2 · Pull', 'Mein Sommerplan', 2]
  ]);
  const sd = r.workouts[0].ex[1];
  assert.equal(sd.n, 'Schulterdrücken Kurzhantel');
  assert.equal(sd.step, 'kh');
  assert.equal(sd.unit, 'kgSeite');
  assert.equal(sd.rest, '90 Sek.');
  assert.equal(r.workouts[1].ex[0].unit, 'kgZusatz');
  assert.deepEqual(r.workouts[1].ex[1].reps, [10,10]);
});

test('Plan-Zeile setzt die Gruppe für folgende Trainings', () => {
  const r = parse('Trainingsplan: Ganzkörper\nA\nKniebeuge 3x5\nB\nKreuzheben 3x5');
  assert.deepEqual(r.workouts.map(w => [w.name, w.plan]), [['A','Ganzkörper'], ['B','Ganzkörper']]);
});

test('verschiedene Schreibweisen für Sätze und Wiederholungen', () => {
  const r = parse('X\nBeinbeuger 12 Wdh x 3 Sätze\nCrunches 20 Wdh\nRudern Kabel 3 sets of 12\nLatzug 4 x 8 bis 12');
  assert.deepEqual(r.workouts[0].ex.map(x => [x.n, x.sets, x.reps]), [
    ['Beinbeuger', 3, [12,12]],
    ['Crunches', 3, [20,20]],
    ['Rudern Kabel', 3, [12,12]],
    ['Latzug', 4, [8,12]]
  ]);
});

test('Zeitübungen sind ohne Gewicht, Minuten werden Sekunden', () => {
  const r = parse('Core\nPlank 3x45 Sek\nWall Sit 3x1 min\nSeitstütz 60s');
  const [p, w, s] = r.workouts[0].ex;
  assert.deepEqual([p.time, p.noWeight, p.reps, p.step], [true, true, [45,45], undefined]);
  assert.deepEqual(w.reps, [60,60]);
  assert.deepEqual([s.sets, s.reps, s.time], [3, [60,60], true]);
});

test('kg, Pause und pro Bein werden aus dem Namen gelöst', () => {
  const r = parse('Beine\nBulgarian Split Squat Kurzhantel 3x10 pro Bein 12kg Pause 90s\nHip Thrust 4x8-12 @ 82,5 kg, 2 Min Pause');
  const [b, h] = r.workouts[0].ex;
  assert.equal(b.n, 'Bulgarian Split Squat Kurzhantel');
  assert.deepEqual([b.perLeg, b.kg, b.rest, b.unit], [true, 12, '90 Sek.', 'kgSeite']);
  assert.equal(h.n, 'Hip Thrust');
  assert.deepEqual([h.kg, h.rest, h.step], [82.5, '2 Min.', 'grund']);
});

test('ohne Überschrift: Name aus fallbackName', () => {
  const r = parse('Liegestütze 3x15', { fallbackName: 'zuhause' });
  assert.equal(r.workouts[0].name, 'zuhause');
  assert.equal(parse('Liegestütze 3x15').workouts[0].name, 'Importiertes Training');
});

test('Aufzählung ohne Zahlen: Standard 3 × 8–12, markiert als geschätzt', () => {
  const r = parse('Rücken\n- Latzug breit\n- Plank');
  const [l, p] = r.workouts[0].ex;
  assert.deepEqual([l.sets, l.reps, l.guessed, l.step], [3, [8,12], true, 'maschine']);
  assert.deepEqual([p.time, p.reps, p.noWeight], [true, [30,45], true]);
});

test('Aufwärmen, Notiz und Fließtext', () => {
  const r = parse([
    'Unterkörper',
    'Aufwärmen: 5 Min Rad, 10 Squats',
    'Notiz: Knie warm halten',
    'Alle Wiederholungen langsam und kontrolliert ausführen.',
    'Kniebeuge 4x6-8'
  ].join('\n'));
  const w = r.workouts[0];
  assert.deepEqual(w.warmup, ['5 Min Rad', '10 Squats']);
  assert.match(w.note, /Knie warm halten/);
  assert.match(w.note, /kontrolliert/);
  assert.equal(w.ex.length, 1);
});

test('Aufwärmen als Liste darunter', () => {
  const r = parse('Oberkörper\nAufwärmen:\n- 5 Min Rudergerät\n- Bandzug Außenrotation\n\nBankdrücken 3x8');
  assert.deepEqual(r.workouts[0].warmup, ['5 Min Rudergerät', 'Bandzug Außenrotation']);
  assert.equal(r.workouts[0].ex.length, 1);
});

test('doppelte Übungsnamen werden eindeutig', () => {
  const r = parse('A\nBankdrücken 3x10\nBankdrücken 2x15');
  assert.deepEqual(r.workouts[0].ex.map(x => x.n), ['Bankdrücken', 'Bankdrücken (2)']);
});

test('leere Überschriften landen in skipped, nicht als Training', () => {
  const r = parse('Push\nBankdrücken 3x10\nNotizen von Montag\nZugtag');
  assert.equal(r.workouts.length, 1);
  assert.deepEqual(r.skipped, ['Notizen von Montag', 'Zugtag']);
});

test('leerer Text und reiner Fließtext', () => {
  assert.deepEqual(parse(''), { workouts: [], skipped: [] });
  assert.equal(parse('Hallo, das ist nur ein Satz ohne Übungen.').workouts.length, 0);
});

test('Steigerungsschritt ist immer ein Schlüssel aus PLAN.steps', () => {
  const r = parse('X\nBeinpresse 3x12\nKabelzug 3x12\nBizepscurl 3x12\nKniebeuge 3x12\nKH Rudern 3x12');
  r.workouts[0].ex.forEach(x => assert.ok(STEPS.includes(x.step), x.n + ' → ' + x.step));
  assert.deepEqual(r.workouts[0].ex.map(x => x.step), ['presse','maschine','iso','grund','kh']);
});

test('Beispieldatei aus dem Repo wird vollständig erkannt', () => {
  const t = readFileSync(new URL('../beispiel-trainings.txt', import.meta.url), 'utf8');
  const r = parse(t);
  assert.equal(r.workouts.length, 3);
  assert.equal(r.skipped.length, 0);
  r.workouts.forEach(w => assert.ok(w.ex.length >= 3, w.name));
});
