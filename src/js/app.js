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
  const findLab = labelArr.filter((el) => {
    const value = e.target.value.toLowerCase();
    return el.textContent.toLowerCase().indexOf(value) !== -1;
  });
  if (findLab.length) {
    findLab.forEach((el) => {
      allTask.innerHTML = '';
      allTask.insertAdjacentElement('beforeend', el);
    });
  } else {
    allTask.innerHTML = '';
  }

  if (formInput.value.length === 0) {
    labelArr.forEach((element) => {
      allTask.insertAdjacentElement('beforeend', element);
    });
  }
});

function pinned() {
  const labelClick = document.querySelectorAll('input[name="task"]');

  labelClick.forEach((element) => {
    element.addEventListener('click', (e) => {
      if (element.checked) {
        noPin.style.display = 'none';
        e.target.name = 'pin';
        pinnedTask.insertAdjacentElement('beforeend', element.closest('label'));

        if (labelArr.indexOf(element.closest('label')) !== -1) {
          labelArr.splice(labelArr.indexOf(element.closest('label')), 1);
        }
      } else {
        e.target.name = 'task';
        allTask.insertAdjacentElement('beforeend', element.closest('label'));
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
    labelArr.push(element);
    labelArr.forEach((el) => {
      allTask.insertAdjacentElement('beforeend', el);
    });
    pinned();
    form.reset();// очистка
  }
});

errorBut.addEventListener('click', (e) => {
  e.preventDefault();
  error.style.display = 'none';
});
