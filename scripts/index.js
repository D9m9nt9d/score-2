import { products, purchaseProduct, boughtProducts, clearAllIntervals } from "./data/products.js";
import { score, addScore, data } from "./data/score.js";

if (location.href.endsWith('#')) {
  localStorage.clear()
}

const sidebar = document.querySelector('.sidebar');
const scoreLabel = document.querySelector('.score-label');
const scoreButton = document.querySelector('.score-button');
const resetButton = document.querySelector('.score-reset');
const scorePerClickLabel = document.querySelector('.score-per-click');
const scorePerClickMultiLabel = document.querySelector('.score-per-click-multi');

products.forEach((product, index) => {
  const button = document.createElement('button');
  button.className = 'product-button';

  const name = document.createElement('p');
  name.className = 'product-name';
  name.textContent = getLabelForProduct(product);

  const description = document.createElement('p');
  description.className = 'product-desc';
  description.textContent = product.desc;
  
  button.addEventListener('mouseenter', () => {
    name.style.opacity = '0.5';
    description.style.opacity = '1';
  });
  button.addEventListener('mouseleave', () => {
    name.style.opacity = '1';
    description.style.opacity = '0.5';
  });

  button.addEventListener('click', () => {
    const result = purchaseProduct(product);
    if (result === 1) {
      addScore(-product.price);
      renderScoreLabel();
      name.textContent = getLabelForProduct(product);
    } else if (result === 2) {
      alert('You have reached the maximum amount for this product.');
    } else {
      alert('Not enough score to purchase this product.');
    }
  });
  
  sidebar.appendChild(button);

  button.appendChild(name);
  button.appendChild(description);

  // load previously bought products
  for (let i = 0; i < boughtProducts[product.name] || 0; i++) {
    product.func(true);
  }
});

function getLabelForProduct(product) {
  return `${product.name} - $${product.price} (${boughtProducts[product.name] || 0}/${product.maxAmount})`;
}

export function renderScoreLabel() {
  scoreLabel.textContent = `Your score: $${score}`;
} renderScoreLabel();

export function renderScorePerClickLabel() {
  scorePerClickLabel.textContent = `Score per click: ${data.scoreAdder}`
} renderScorePerClickLabel();

export function renderScorePerClickMultiLabel() {
  scorePerClickMultiLabel.textContent = `Score per click multiplier: ${data.scoreMultiplier}`
} renderScorePerClickMultiLabel();

export function renderOnWin() {
  const winLabel = document.createElement('p')
  winLabel.className = 'win-label'
  winLabel.textContent = 'you win'
  document.querySelector('body').appendChild(winLabel)
  setTimeout(() => {
    winLabel.classList.add('win-label-animate')
  }, 10);
}

scoreButton.addEventListener('click', () => {
  addScore(data.scoreAdder * data.scoreMultiplier);
  renderScoreLabel();
});

resetButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to reset everything?')) {
    clearAllIntervals()
    localStorage.clear()
    location.reload()
  }
});