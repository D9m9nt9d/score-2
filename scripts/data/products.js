import { addScore, score, addScoreAdder, addScoreMultiplier, data, onWin } from "./score.js";

export const products = [
  {
    name: 'Determination level 1',
    desc: 'Increases score per click by 0.5',
    maxAmount: 5,
    price: 10,
    func: () => {
      addScoreAdder(0.5);
    }
  },

  {
    name: 'Cheap labor',
    desc: 'Autoclicks every second',
    maxAmount: 10,
    price: 20,
    func: () => {
      intervals.push(
        setInterval(() => {
          addScore(data.scoreAdder * data.scoreMultiplier);
        }, 1000)
      );
    }
  },

  {
    name: 'Determination level 2',
    desc: 'Increases score per click multiplier by 1',
    maxAmount: 5,
    price: 50,
    func: () => {
      addScoreMultiplier(1);
    }
  },

  {
    name: 'Expensive labor',
    desc: 'Clicks 50 times in a row every 10 seconds',
    maxAmount: 5,
    price: 1000,
    func: () => {
      intervals.push(
        setInterval(() => {
          addScore(data.scoreAdder * data.scoreMultiplier * 50);
        }, 10000)
      );
    }
  },

  {
    name: 'Win',
    desc: '',
    maxAmount: 1,
    price: 1,
    func: () => {
      onWin()
    }
  }
]

let intervals = []
export function clearAllIntervals() {
  while (intervals.length > 0) {
    clearInterval(intervals.pop());
  }
}

export const boughtProducts = JSON.parse(localStorage.getItem('boughtProducts')) || {};

function saveBoughtProducts() {
  localStorage.setItem('boughtProducts', JSON.stringify(boughtProducts));
}

export function purchaseProduct(product) {
  if (boughtProducts[product.name] >= product.maxAmount) {
    return 2;
  }

  if (score >= product.price) {
    boughtProducts[product.name] = (boughtProducts[product.name] || 0) + 1;
    saveBoughtProducts();
    product.func();
    return 1;
  }

  return 0;
}