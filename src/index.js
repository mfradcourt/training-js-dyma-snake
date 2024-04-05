import './style.scss';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let direction = 'south';
const gridElement = 40;
const snake = [[9, 9], [8, 9], [7, 9]];
let apple = [5, 5];
let score = 0;

const drawMap = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 800);
}

const drawSnake = () => {
  ctx.fillStyle = 'green';
  for (let body of snake) {
    ctx.fillRect(body[0] * gridElement, body[1] * gridElement, gridElement, gridElement);
  }
}

const drawApple = () => {
  ctx.fillStyle = 'red';
  ctx.fillRect(apple[0] * gridElement, apple[1] * gridElement, gridElement, gridElement);
}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight': {
      direction = 'east';
      break;
    }

    case 'ArrowLeft': {
      direction = 'west';
      break;
    }

    case 'ArrowUp': {
      direction = 'north';
      break;
    }

    case 'ArrowDown': {
      direction = 'south';
      break;
    }
  }
});

const gameover = () => {
  if (snake[0][0] > 19 || snake[0][0] < 0 || snake[0][1] > 19 || snake[0][1] < 0) {
    return true;
  } else {
    const [head, ...body] = snake;
    for (let bodyElem of body) {
      if (bodyElem[0] === head[0] && bodyElem[1] === head[1]) {
        return true;
      }
    }
  }

  return false;
}

const generateApple = () => {
  score++;
  const [x, y] = [Math.trunc(Math.random() * 19), Math.trunc(Math.random() * 19)];

  for (let body of snake) {
    if (body[0] === x && body[1] === y) {
      return generateApple();
    }
  }

  apple = [x, y];
}

const updateSnakePosition = () => {
  let head;
  switch (direction) {
    case 'east': {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }

    case 'west': {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }

    case 'north': {
      head = [snake[0][0], snake[0][1] - 1];
      break;
    }

    case 'south': {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
  }

  snake.unshift(head);
  if (head[0] === apple[0] && head[1] === apple[1]) {
    generateApple();
  } else {
    snake.pop();
  }

  return gameover();
}

const drawScore = () => {
  ctx.fillStyle = 'white';
  ctx.font = '40px sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText(score, gridElement, gridElement);
}

const move = () => {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    drawScore();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, 500);
  } else {
    alert('Perdu !');
  }

}

requestAnimationFrame(move);