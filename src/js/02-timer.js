// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// бібліотека для сповіщень
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  chooseDateEl: document.querySelector('#datetime-picker'),
  btnStartTimer: document.querySelector('button[data-start]'),
  clockEls: document.querySelectorAll('.value'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours'),
  minutesEl: document.querySelector('span[data-minutes'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

const TIME_INTERVAL = 1000;
refs.btnStartTimer.disabled = true;
let dateEnd = null;
let setId = null;

// Об'єкт параметрів для Notiflix
const optionsNotiflix = {
  timeout: 7000,
  clickToClose: true,
  position: 'center-top',
};

// Об'єкт параметрів для flatpickr та його оголошення
const optionsFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateEnd = selectedDates[0];

    if (dateEnd <= Date.now()) {
      Notify.failure('Please choose a date in the future', optionsNotiflix);
    } else {
      refs.btnStartTimer.disabled = false;
    }
  },
};
flatpickr(refs.chooseDateEl, optionsFlatpickr);

// Функція для розрахунку залишку часу для таймеру
const convertMs = function (ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// Робимо отримуване число мінімум 2-значним
const pad = function (value) {
  return value.toString().padStart(2, 0);
};

const clockAnimation = function (listElements) {
  listElements.forEach(el => el.classList.toggle('active'));
};

const finishedTimer = function (time) {
  if (time < TIME_INTERVAL) {
    clearInterval(setId);
    refs.chooseDateEl.disabled = false;
    Notify.info('The countdown timer has finished', optionsNotiflix);
    clockAnimation(refs.clockEls);
  }
};

const addTimerOnDisplay = function () {
  const timerTime = dateEnd - Date.now();

  const { days, hours, minutes, seconds } = convertMs(timerTime);
  const { daysEl, hoursEl, minutesEl, secondsEl } = refs;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  finishedTimer(timerTime);
};

const onStartTimer = () => {
  refs.btnStartTimer.disabled = true;
  refs.chooseDateEl.disabled = true;
  clockAnimation(refs.clockEls);

  setId = setInterval(addTimerOnDisplay, TIME_INTERVAL);
};

refs.btnStartTimer.addEventListener('click', onStartTimer);
