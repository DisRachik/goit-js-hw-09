const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const TIME_INTERVAL = 1000;
let setId = null;

const getRandomHexColor = function () {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const getChangeColor = function () {
  document.body.style.backgroundColor = getRandomHexColor();
};

const onStartMagic = e => {
  getChangeColor();

  setId = setInterval(() => {
    getChangeColor();
  }, TIME_INTERVAL);

  e.currentTarget.setAttribute('disabled', '');
};

const onStopMagic = () => {
  clearInterval(setId);
  refs.startBtn.removeAttribute('disabled');
};

refs.startBtn.addEventListener('click', onStartMagic);
refs.stopBtn.addEventListener('click', onStopMagic);
