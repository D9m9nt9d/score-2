export let score = JSON.parse(localStorage.getItem('score')) || 0;

export let data = {
  scoreAdder: .5,
  scoreMultiplier: 1,
}

import { renderScoreLabel, renderScorePerClickLabel, renderScorePerClickMultiLabel, renderOnWin } from "../index.js";

export function addScoreAdder(amount) {
  data.scoreAdder += amount;
  renderScorePerClickLabel();
}

export function addScoreMultiplier(amount) {
  data.scoreMultiplier += amount;
  renderScorePerClickMultiLabel();
}

export function onWin() {
  addScoreMultiplier(9)
  addScoreAdder(17)
  renderOnWin()
}

function saveScore() {
  localStorage.setItem('score', JSON.stringify(score));
}

export function addScore(amount) {
  score += amount;
  renderScoreLabel();
  saveScore();
  return score;
}