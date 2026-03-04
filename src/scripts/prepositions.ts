import { addPoints, loadScore } from "./score.ts";

type ItemId =
  | "inside"
  | "outside"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "straight"
  | "forward"
  | "on"
  | "under"
  | "above"
  | "below";

interface QuizItem {
  id: ItemId;
  fr: string;
  en: string;
}

interface Cluster {
  name: string;
  items: QuizItem[];
}

interface Round {
  cluster: Cluster;
  target: QuizItem;
  options: QuizItem[];
}

interface State {
  totalPoints: number;
  streak: number;
  current: Round | null;
  locked: boolean;
  timer: ReturnType<typeof setTimeout> | null;
  lastTarget: ItemId | null;
}

const NEXT_DELAY = 1000;

const CLUSTERS: Cluster[] = [
  {
    name: "Position",
    items: [
      { id: "inside", fr: "a l'interieur", en: "inside" },
      { id: "outside", fr: "a l'exterieur", en: "outside" },
      { id: "top", fr: "en haut", en: "top" },
      { id: "bottom", fr: "en bas", en: "bottom" },
    ],
  },
  {
    name: "Direction",
    items: [
      { id: "left", fr: "a gauche", en: "left" },
      { id: "right", fr: "a droite", en: "right" },
      { id: "straight", fr: "tout droit", en: "straight" },
      { id: "forward", fr: "en avant", en: "forward" },
    ],
  },
  {
    name: "Vertical",
    items: [
      { id: "on", fr: "sur", en: "on" },
      { id: "under", fr: "sous", en: "under" },
      { id: "above", fr: "au-dessus", en: "above" },
      { id: "below", fr: "au-dessous", en: "below" },
    ],
  },
];

const state: State = {
  totalPoints: loadScore(),
  streak: 0,
  current: null,
  locked: false,
  timer: null,
  lastTarget: null,
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRound(): Round {
  const cluster = CLUSTERS[Math.floor(Math.random() * CLUSTERS.length)];
  const filtered = cluster.items.filter((item) => item.id !== state.lastTarget);
  const pool = filtered.length > 0 ? filtered : cluster.items;
  const target = pool[Math.floor(Math.random() * pool.length)];
  state.lastTarget = target.id;
  return {
    cluster,
    target,
    options: shuffle(cluster.items),
  };
}

function getElements() {
  return {
    clusterEl: document.getElementById("prep-cluster")!,
    promptEl: document.getElementById("prep-prompt")!,
    helperEl: document.getElementById("prep-helper")!,
    sceneEl: document.getElementById("prep-scene")!,
    choicesEl: document.getElementById("prep-choices")!,
    roundScoreEl: document.getElementById("prep-round-score")!,
    scoreEl: document.getElementById("prep-score")!,
    streakEl: document.getElementById("prep-streak")!,
    skipBtn: document.getElementById("prep-skip") as HTMLButtonElement,
  };
}

function updateScoreDisplay() {
  const { scoreEl, streakEl } = getElements();
  scoreEl.innerHTML = `<span>${state.totalPoints}</span> points partages`;
  streakEl.textContent = state.streak > 1 ? `Serie x${state.streak}` : "";
}

function iconArrow(x1: number, y1: number, x2: number, y2: number): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2f3447" stroke-width="10" stroke-linecap="round" />`;
}

function sceneSvg(id: ItemId): string {
  if (id === "inside") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true"><rect x="45" y="30" width="170" height="120" rx="16" fill="#d8e2ff" stroke="#5a6cb2" stroke-width="8"/><circle cx="130" cy="90" r="24" fill="#ef7b45"/></svg>`;
  }

  if (id === "outside") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true"><rect x="45" y="30" width="170" height="120" rx="16" fill="#d8e2ff" stroke="#5a6cb2" stroke-width="8"/><circle cx="228" cy="90" r="22" fill="#ef7b45"/></svg>`;
  }

  if (id === "top") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true"><line x1="130" y1="25" x2="130" y2="155" stroke="#5a6cb2" stroke-width="8"/><circle cx="130" cy="48" r="20" fill="#ef7b45"/></svg>`;
  }

  if (id === "bottom") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true"><line x1="130" y1="25" x2="130" y2="155" stroke="#5a6cb2" stroke-width="8"/><circle cx="130" cy="133" r="20" fill="#ef7b45"/></svg>`;
  }

  if (id === "left") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true">${iconArrow(210, 90, 55, 90)}<polygon points="55,90 92,62 92,118" fill="#ef7b45"/></svg>`;
  }

  if (id === "right") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true">${iconArrow(50, 90, 205, 90)}<polygon points="205,90 168,62 168,118" fill="#ef7b45"/></svg>`;
  }

  if (id === "straight") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true">${iconArrow(130, 150, 130, 30)}<polygon points="130,30 102,67 158,67" fill="#ef7b45"/></svg>`;
  }

  if (id === "forward") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true"><circle cx="90" cy="90" r="22" fill="#ef7b45"/>${iconArrow(118, 90, 208, 90)}<polygon points="208,90 171,62 171,118" fill="#ef7b45"/></svg>`;
  }

  if (id === "on") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true"><rect x="80" y="88" width="100" height="60" rx="10" fill="#d8e2ff" stroke="#5a6cb2" stroke-width="8"/><circle cx="130" cy="64" r="22" fill="#ef7b45"/></svg>`;
  }

  if (id === "under") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true"><rect x="80" y="44" width="100" height="60" rx="10" fill="#d8e2ff" stroke="#5a6cb2" stroke-width="8"/><circle cx="130" cy="128" r="22" fill="#ef7b45"/></svg>`;
  }

  if (id === "above") {
    return `<svg viewBox="0 0 260 180" aria-hidden="true"><rect x="80" y="88" width="100" height="60" rx="10" fill="#d8e2ff" stroke="#5a6cb2" stroke-width="8"/><circle cx="130" cy="36" r="20" fill="#ef7b45"/></svg>`;
  }

  return `<svg viewBox="0 0 260 180" aria-hidden="true"><rect x="80" y="34" width="100" height="60" rx="10" fill="#d8e2ff" stroke="#5a6cb2" stroke-width="8"/><circle cx="130" cy="142" r="20" fill="#ef7b45"/></svg>`;
}

function renderRound() {
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }

  const { clusterEl, promptEl, helperEl, sceneEl, choicesEl, roundScoreEl, skipBtn } = getElements();
  const round = pickRound();
  state.current = round;
  state.locked = false;

  clusterEl.textContent = `Cluster: ${round.cluster.name}`;
  promptEl.textContent = "Que montre cette image ?";
  helperEl.textContent = `Hint: ${round.target.en}`;
  sceneEl.innerHTML = sceneSvg(round.target.id);
  sceneEl.setAttribute("aria-label", round.target.fr);
  roundScoreEl.textContent = "";
  roundScoreEl.className = "round-score";

  choicesEl.innerHTML = "";
  for (const option of round.options) {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.type = "button";
    button.dataset.id = option.id;
    button.textContent = option.fr;
    choicesEl.appendChild(button);
  }

  skipBtn.disabled = false;
  updateScoreDisplay();
}

function revealAndAdvance(message: string, className: string) {
  const { roundScoreEl, skipBtn } = getElements();
  roundScoreEl.textContent = message;
  roundScoreEl.className = `round-score ${className}`;
  skipBtn.disabled = true;

  state.timer = setTimeout(() => {
    renderRound();
  }, NEXT_DELAY);
}

function handleChoice(choiceId: ItemId) {
  if (!state.current || state.locked) return;
  state.locked = true;

  const { choicesEl } = getElements();
  const buttons = Array.from(choicesEl.querySelectorAll("button"));

  for (const button of buttons) {
    button.setAttribute("disabled", "true");
    if ((button as HTMLButtonElement).dataset.id === state.current.target.id) {
      button.classList.add("is-answer");
    }
  }

  if (choiceId === state.current.target.id) {
    state.streak += 1;
    state.totalPoints = addPoints(1);
    const selected = buttons.find((btn) => (btn as HTMLButtonElement).dataset.id === choiceId);
    if (selected) selected.classList.add("correct");
    updateScoreDisplay();
    revealAndAdvance("+1 bien joue", "partial");
    return;
  }

  state.streak = 0;
  const selected = buttons.find((btn) => (btn as HTMLButtonElement).dataset.id === choiceId);
  if (selected) selected.classList.add("incorrect");
  updateScoreDisplay();
  revealAndAdvance(`C'etait: ${state.current.target.fr}`, "");
}

function skipRound() {
  if (state.locked) return;
  state.streak = 0;
  renderRound();
}

export function initPrepositionsQuiz() {
  const { choicesEl, skipBtn } = getElements();

  choicesEl.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target || target.tagName !== "BUTTON") return;
    const id = (target as HTMLButtonElement).dataset.id as ItemId | undefined;
    if (!id) return;
    handleChoice(id);
  });

  skipBtn.addEventListener("click", skipRound);
  renderRound();
}
