const fs = require('fs');

let cardsWithPossibleBingo = [];
let cardsWithBingo = [];

const checkIfCardHasBingo = (card, number, cards) => {
  let bingo = false;
  let horizontalBingo = false;
  let verticalBingo = false;

  card.forEach(row => {
    bingo = row.filter(value => value.drawn).length === 5;
    if (bingo) {
      horizontalBingo = true;
    }
  });

  [...Array(5)].forEach((_, i) => {
    const vertical = card.map(row => {
      return row[i];
    });

    bingo = vertical.filter(value => value.drawn).length === 5;
    if (bingo) {
      verticalBingo = true;
    }
  });

  if (cardsWithBingo.length === (cards.length - 1) && (horizontalBingo || verticalBingo)) {
    let sum = 0;
    cardsWithPossibleBingo.filter(item => !item.hasBingo)[0].card.forEach(row => row.filter(item => !item.drawn).forEach(a => sum += parseInt(a.value)));
    console.log('number', number * (sum - number));
  }

  if (horizontalBingo || verticalBingo) {
    return true;
  }
  return false;
}

const drawNumber = (cards, number) => {
  return cards.map((card) => {
    return {
      index: card.index,
      hasBingo: card.hasBingo,
      card: card.card.map((row, i) => {
        return row.map(value => {
          if (value.value === number) {
            return { drawn: true, value: value.value};
          }
          return value;
        })
      })
    }
  });
}


const bingo = (cards, numbers, index) => {
  let cardsCheck = cards;

  numbers.forEach(number => {
    cardsCheck = drawNumber(cardsCheck, number);

    cardsWithPossibleBingo = cardsCheck.map((card, i) => {
      return {
        index: card.index,
        card: card.card,
        hasBingo: checkIfCardHasBingo(card.card, number, cards)
      }
    });
    cardsWithBingo = cardsWithPossibleBingo.filter(card => card.hasBingo);
  });
}


const generateBingoCards = () => {
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    const numbers = data.split('\n')[0].split(',');
    const bingoCards = data.split('\n\n');
    bingoCards.shift();
    const cards = bingoCards.map(card => card.split('\n'));
    const cardBingo = cards.map((card, i) => {
      return {
        index: i,
        card: card.map(b => {
          return b.split(' ').map(a => {
            if (a.length) {
              return { drawn: false, value: a}
            }
          }).filter(c => c !== undefined);
        })
      }
    });
    globalNumbers = numbers;
    bingo(cardBingo, numbers, 0);
  });
}

generateBingoCards();