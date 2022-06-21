import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
saveInfo();

form.addEventListener('input', throttle(inputFormData, 500));
form.addEventListener('submit', submitForm);

const formData = {};
function submitForm(event) {
  event.preventDefault();
  if (email.value === '' || message.value === '') {
    return alert('Please enter a valid email');
  }
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
}

function inputFormData() {
  formData[email.name] = email.value;
  formData[message.name] = message.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function saveInfo() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (localStorage.getItem(STORAGE_KEY)) {
    email.value = data.email;
    message.value = data.message;
  }
}

// костыльный вариант

// const localValues = {
//   email: '',
//   message: '',
// };

// const refs = {
//   form: document.querySelector('.feedback-form'),
//   email: document.querySelector('input '),
//   textarea: document.querySelector('textarea'),
// };

// const onEmailInput = event => {
//   localValues.email = event.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(localValues));
// };

// const onTextareaInput = event => {
//   localValues.message = event.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(localValues));
// };
// const onForm = event => {
//   event.preventDefault();
//   if (localValues.email === '' || localValues.message === '') {
//     return alert('Please enter a valid email');
//   }
//   if (localStorage.getItem(STORAGE_KEY)) {
//     console.log(localStorage.getItem(STORAGE_KEY));
//   }
//   event.target.reset();
//   localStorage.removeItem(STORAGE_KEY);
// };

// const saveInfo = () => {
//   let savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
//   if (savedMessage) {
//     localValues.email = savedMessage.email;
//     localValues.message = savedMessage.message;
//     refs.email.value = localValues.email;
//     refs.textarea.value = localValues.message;
//   }
// };

// refs.form.addEventListener('submit', onForm);
// refs.email.addEventListener('input', throttle(onEmailInput, 500));
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
// saveInfo();
