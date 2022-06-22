const todos = [];
const RENDER_EVENT = 'render-todo';
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function generateId() {
  return +new Date();
}

function generateTodoObject(id, title, author, year,  isCompleted) {
    return {
      id,
      title,
      author,
      year,
      isCompleted
    };
  }
  
  function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
  }
  
  function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
    return -1;
  }
  
// cek local storage
  function isStorageExist() {
    if (typeof (Storage) === undefined) {
      alert('Browser tidak mendukung local storage');
      return false;
    }
    return true;
  }

function saveData() {
    if (isStorageExist()) {
      const parsed  = JSON.stringify(todos);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }


function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
  
    if (data !== null) {
      for (const todo of data) {
        todos.push(todo);
      }
    }
  
    document.dispatchEvent(new Event(RENDER_EVENT));
  }


  function makeTodo(todoObject) {

    const {id, title,author, year, isCompleted} = todoObject;
    const textTitle = document.createElement('p');
    textTitle.innerText = title;
    textTitle.style.fontSize = '14px';
    textTitle.style.fontWeight = '800';

    const penulis = document.createElement('p');
    penulis.innerText = author;
    penulis.style.fontSize = '12px';

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = year;
    textTimestamp.style.fontSize = '12px';
 
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle,penulis, textTimestamp);
  
    const center = document.createElement('div');
    center.classList.add('item');
    center.classList.add('d-flex');
    center.classList.add('h-100');
    center.classList.add('align-items-center');
    center.classList.add('justify-content-end');

    const container = document.createElement('div');
    container.classList.add('d-flex');
    // container.classList.add('border');
    container.classList.add('bg_abu');
    container.style.padding = '10px';
    container.style.marginTop = '5px';

    container.append(textContainer,center);
    container.setAttribute('id', `todo-${id}`);
  
    // sudah terbaca
    if (isCompleted) {
  
      const undoButton = document.createElement('button');
      undoButton.classList.add('undo-button');
      undoButton.classList.add('icon');
      undoButton.classList.add('bg-transparent');
      undoButton.classList.add('glyphicon');
      undoButton.addEventListener('click', function () {
        undoTaskFromCompleted(id);
      });
  
      const trashButton = document.createElement('button');
      trashButton.classList.add('trash-button');
      trashButton.classList.add('icon');
      trashButton.classList.add('bg-transparent');
      trashButton.addEventListener('click', function () {
        removeTaskFromCompleted(id);
      });
  
      container.append(undoButton, trashButton);
    } 
    
    // belum terbaca
    else {
      const checkButton = document.createElement('button');
      checkButton.classList.add('check-button');
      checkButton.classList.add('icon');
      checkButton.classList.add('bg-transparent');
      checkButton.addEventListener('click', function () {
        addTaskToCompleted(id);
      });
      const trashButton = document.createElement('button');
      trashButton.classList.add('trash-button');
      trashButton.classList.add('icon');
      trashButton.classList.add('bg-transparent');
      trashButton.addEventListener('click', function () {
        removeTaskFromCompleted(id);
      });
      container.append(checkButton, trashButton);
    }
  
    return container;
  }
  
  function addTodo() {
    const textTodo = document.getElementById('judul').value;
    const timestamp = document.getElementById('tanggal').value;
    const penulis = document.getElementById('penulis').value;
    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo,penulis, timestamp, false);
    todos.push(todoObject);
  
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
  
  function addTaskToCompleted(todoId ) {
    const todoTarget = findTodo(todoId);
  
    if (todoTarget == null) return;
  
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
  
  function removeTaskFromCompleted(todoId ) {
    const todoTarget = findTodoIndex(todoId);
  
    if (todoTarget === -1) return;
  
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
  
  function undoTaskFromCompleted(todoId ) {
  
    const todoTarget = findTodo(todoId);
    if (todoTarget == null) return;
  
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
  
  document.addEventListener('DOMContentLoaded', function () {
  
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTodo();
    });
  
    if (isStorageExist()) {
      loadDataFromStorage();
    }
  });
  
  document.addEventListener(SAVED_EVENT, () => {
    // alert('Data Terupdate');
    console.log('Data berhasil di simpan.');
  });
  
  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById('todos');
    const listCompleted = document.getElementById('completed-todos');
  
    uncompletedTODOList.innerHTML = '';
    listCompleted.innerHTML = '';
  
    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if (todoItem.isCompleted) {
        listCompleted.append(todoElement);
      } else {
        uncompletedTODOList.append(todoElement);
      }
    }
  });