// бібліотека для сповіщень
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const formRefs = {
  delay: formEl.elements.delay,
  step: formEl.elements.step,
  amount: formEl.elements.amount,
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  const { delay, step, amount } = formRefs;

  for (let i = 1; i <= Number(amount.value); i += 1) {
    const delayValue = Number(delay.value) + i * Number(step.value);
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`👌 Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`🙏 Rejected promise ${position} in ${delay}ms`);
      });
  }
}
