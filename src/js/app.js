const formInput = document.getElementsByClassName('input-text')[0];
const form = document.getElementById('form');
const allTask = document.getElementById('all-tasks');
const error = document.getElementsByClassName('error')[0];
const errorBut = document.getElementsByClassName('button-err')[0];
const pinnedTask = document.getElementById('pinned-tasks');
const noPin = document.getElementById('no-pinned');
const labelArr = [];

formInput.addEventListener('input', (e) => { // поиск по всем задачам
  e.preventDefault();
  if (formInput.value.length === 0) {
    labelArr.forEach((element) => {
      if (element.isPinned === false) {
        allTask.insertAdjacentElement('beforeend', element.label);
      }
    });
  }
  const findLab = labelArr.filter((el) => {
    if (el.isPinned === false) {
      const value = e.target.value.toLowerCase();
      return el.label.textContent.toLowerCase().indexOf(value) !== -1;
    }
    return 0;
  });
  if (findLab.length) {
    allTask.innerHTML = '';
    findLab.forEach((el) => {
      allTask.insertAdjacentElement('beforeend', el.label);
    });
  } else {
    allTask.innerHTML = '';
  }
});

function pinned() {
  const labelClick = document.querySelectorAll('.typeRadio');

  labelClick.forEach((element) => {
    element.addEventListener('click', (e) => {
      if (element.checked) {
        noPin.style.display = 'none';
        e.target.name = 'pin';
        pinnedTask.insertAdjacentElement('beforeend', element.closest('label'));

        labelArr.forEach((el) => {
          const { label } = el;
          if (label === e.target.closest('label')) {
            el.isPinned = true;// eslint-disable-line no-param-reassign
          }
        });
      } else {
        e.target.name = 'task';
        allTask.insertAdjacentElement('beforeend', element.closest('label'));

        labelArr.forEach((el) => {
          const { label } = el;
          if (label === e.target.closest('label')) {
            el.isPinned = false;// eslint-disable-line no-param-reassign
          }
        });
        if (!document.querySelectorAll('input[name="pin"]').length) {
          noPin.style.display = 'block';
        }
      }
    });
  });
}

form.addEventListener('submit', (e) => { // нажатие на enter
  e.preventDefault();
  if (formInput.value.length === 0 || !formInput.value.trim()) {
    error.style.display = 'block';
    form.reset();// очистка
  } else {
    const element = document.createElement('label');
    element.classList.add('label-all');
    element.innerHTML = `${formInput.value}<input type="checkbox" class="typeRadio" name="task">`;
    allTask.insertAdjacentElement('beforeend', element);
    labelArr.push({ label: element, isPinned: false });
    labelArr.forEach((el) => {
      if (el.isPinned === false) allTask.insertAdjacentElement('beforeend', el.label);
    });
    pinned();
    form.reset();// очистка
  }
});

errorBut.addEventListener('click', (e) => {
  e.preventDefault();
  error.style.display = 'none';
});
