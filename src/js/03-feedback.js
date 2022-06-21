import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const localValues = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input '),
  textarea: document.querySelector('textarea'),
};

const onForm = event => {
  event.preventDefault();
  if (localValues.email === '' || localValues.message === '') {
    return alert('Please enter a valid email');
  }
  if (localStorage.getItem(STORAGE_KEY)) {
    console.log(localStorage.getItem(STORAGE_KEY));
  }
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
};

const onEmailInput = event => {
  localValues.email = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localValues));
};

const onTextareaInput = event => {
  localValues.message = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localValues));
};

const saveInfo = () => {
  let savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    localValues.email = savedMessage.email;
    localValues.message = savedMessage.message;
    refs.email.value = localValues.email;
    refs.textarea.value = localValues.message;
  }
};

refs.form.addEventListener('submit', onForm);
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
saveInfo();
