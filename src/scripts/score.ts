const STORAGE_KEY = "vvv-score";

export function loadScore(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveScore(points: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(points));
  } catch {
    // localStorage unavailable; keep in-memory score only.
  }
}

export function addPoints(pointsToAdd: number): number {
  const next = loadScore() + pointsToAdd;
  saveScore(next);
  return next;
}
