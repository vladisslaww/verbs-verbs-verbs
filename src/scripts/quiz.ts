import { verbs, type CompactVerb, type TenseName } from "../data/verbs.ts";
import { conjugate, withPronoun } from "../data/conjugate.ts";
import type { FullFormTuple } from "../data/types.ts";

const TENSES: TenseName[] = [
  "présent",
  "imparfait",
  "futur simple",
  "passé composé",
  "conditionnel présent",
  "subjonctif présent",
];

const ADVANCE_DELAY = 5000;
const STORAGE_KEY = "vvv-score";

interface Round {
  verb: CompactVerb;
  tense: TenseName;
  forms: FullFormTuple;
}

interface State {
  current: Round | null;
  checked: boolean;
  totalPoints: number;
  roundPoints: number;
  timer: ReturnType<typeof setTimeout> | null;
}

function loadScore(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function saveScore(points: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(points));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

const state: State = {
  current: null,
  checked: false,
  totalPoints: loadScore(),
  roundPoints: 0,
  timer: null,
};

function pick(): Round {
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const tense = TENSES[Math.floor(Math.random() * TENSES.length)];
  const forms = conjugate(verb, tense);
  return { verb, tense, forms };
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function getElements() {
  const verbEl = document.getElementById("verb")!;
  const translationEl = document.getElementById("translation")!;
  const tenseEl = document.getElementById("tense")!;
  const btn = document.getElementById("check-btn") as HTMLButtonElement;
  const countdown = document.getElementById("countdown")!;
  const countdownFill = document.getElementById("countdown-fill")!;
  const scoreEl = document.getElementById("score")!;
  const roundScoreEl = document.getElementById("round-score")!;

  const inputs: HTMLInputElement[] = [];
  const wrappers: HTMLElement[] = [];
  for (let i = 0; i < 6; i++) {
    inputs.push(document.getElementById(`f${i}`) as HTMLInputElement);
    wrappers.push(document.getElementById(`w${i}`)!);
  }

  return { verbEl, translationEl, tenseEl, btn, countdown, countdownFill, scoreEl, roundScoreEl, inputs, wrappers };
}

function updateScoreDisplay() {
  const { scoreEl } = getElements();
  scoreEl.innerHTML = `<span>${state.totalPoints}</span> points`;
}

function loadRound() {
  const { verbEl, translationEl, tenseEl, btn, countdown, countdownFill, inputs, wrappers, roundScoreEl } =
    getElements();

  // Clear previous state
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }

  state.current = pick();
  state.checked = false;
  state.roundPoints = 0;

  verbEl.textContent = state.current.verb.infinitive;
  translationEl.textContent = state.current.verb.english;
  tenseEl.textContent = state.current.tense;

  btn.disabled = false;
  btn.textContent = "Vérifier";
  countdown.classList.remove("active");
  roundScoreEl.textContent = "";
  roundScoreEl.className = "round-score";

  // Reset the fill animation by forcing reflow
  countdownFill.style.animation = "none";
  void countdownFill.offsetHeight;
  countdownFill.style.animation = "";

  for (let i = 0; i < 6; i++) {
    inputs[i].value = "";
    inputs[i].disabled = false;
    wrappers[i].className = "input-wrapper";

    // Remove any existing correction spans
    const existing = wrappers[i].querySelector(".correction");
    if (existing) existing.remove();
  }

  updateScoreDisplay();

  // Focus first input
  inputs[0].focus();
}

function checkAnswers() {
  if (state.checked || !state.current) return;
  state.checked = true;

  const { btn, countdown, inputs, wrappers, roundScoreEl } = getElements();
  const { forms } = state.current;

  let correctCount = 0;

  for (let i = 0; i < 6; i++) {
    const userAnswer = normalize(inputs[i].value);
    const correctForm = forms[i];
    const correctAnswer = normalize(correctForm);
    inputs[i].disabled = true;

    if (userAnswer === correctAnswer) {
      correctCount++;
      wrappers[i].classList.add("correct");
    } else {
      wrappers[i].classList.add("incorrect");

      // Show correction with pronoun for full context
      const span = document.createElement("span");
      span.className = "correction";
      span.textContent = withPronoun(correctForm, i);
      wrappers[i].appendChild(span);
    }
  }

  // Update scores
  state.roundPoints = correctCount;
  state.totalPoints += correctCount;
  saveScore(state.totalPoints);
  updateScoreDisplay();

  // Show round result
  if (correctCount === 6) {
    roundScoreEl.textContent = "+6 parfait !";
    roundScoreEl.classList.add("perfect");
  } else {
    roundScoreEl.textContent = `+${correctCount}/6`;
    if (correctCount > 0) {
      roundScoreEl.classList.add("partial");
    }
  }

  btn.disabled = true;
  btn.textContent = "Suivant...";
  countdown.classList.add("active");

  state.timer = setTimeout(() => {
    loadRound();
  }, ADVANCE_DELAY);
}

export function initQuiz() {
  const { btn } = getElements();

  btn.addEventListener("click", checkAnswers);

  // Enter key to submit from any input
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !state.checked) {
      e.preventDefault();
      checkAnswers();
    }
  });

  loadRound();
}
