const fs = require('fs');

const checkIfCardHasBingo = (card, number) => {
  let bingo = false;
  console.log('set false', bingo);
  card.every(row => {
    bingo = hasBingo ? false : row.filter(value => value.drawn).length === 5;

    if (!hasBingo && bingo) {
      console.log("BINGO?", bingo)
      hasBingo = bingo;
      bingoCard = { number, card };
      return false;
    }
    return true;
  });
  console.log('halfway', bingo)
  [...Array(5)].every((_, i) => {
    const vertical = card.map(row => {
      return row[i];
    });
    bingo = hasBingo ? false : vertical.filter(value => value.drawn).length === 5;

    if (!hasBingo && bingo) {
      console.log("BINGO?", bingo)
      hasBingo = bingo;
      bingoCard = { number, card };
      return false;
    }
    return true
  });
  console.log(number, bingo, hasBingo);

}

let hasBingo = false;
let bingoCard;

const bingo = (cards, numbers, index) => {
  const newCards = cards.map((card) => {
    return card.map((row) => {
      return row.map(value => {
        numbers[index];
        if (value.value === numbers[index] && !hasBingo && !bingoCard) {
          return { drawn: true, value: value.value};
        }
        return value;
      })
    });
  });

  if (!hasBingo) {
    newCards.forEach(cards => {
      !hasBingo && checkIfCardHasBingo(cards, numbers[index]);
    });
  }

  if (!hasBingo && !bingoCard) {
    bingo(newCards, numbers, index + 1);
  }

  if (hasBingo && bingoCard) {
    let sum = 0;
    bingoCard.card.forEach(row => row.filter(item => !item.drawn).forEach(a => sum += parseInt(a.value)));
    console.log(sum * bingoCard.number);
    return;
  }

}


const generateBingoCards = () => {
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    const numbers = data.split('\n')[0].split(',');
    const bingoCards = data.split('\n\n');
    bingoCards.shift();
    const cards = bingoCards.map(card => card.split('\n'));
    const cardBingo = cards.map(card =>
      card.map(b => {
        return b.split(' ').map(a => {
          if (a.length) {
            return { drawn: false, value: a}
          }
        }).filter(c => c !== undefined);
      })
    );
    bingo(cardBingo, numbers, 0);
  });
}

generateBingoCards();