const url = "http://127.0.0.1:3000/";
const allUsers = ['John Doe', 'Jane Doe', 'Jim Dow']; //all authorised users
let allTasks = [];
let currTask;
let editMode = false;

function loadData() {
  console.log('Load data');

  fetch(url, { method: 'GET' })
    .then(res => { return res.json(); })
    .then(data => {
      allTasks = data;
      // console.log(allTasks);
      displayData();
    })
    .catch(err => { console.error(err); })
}

function displayData() {
  document.getElementById('taskListBtn').innerHTML = '';

  allTasks.map(task => {
    let taskBtn = document.createElement('a');
    taskBtn.setAttribute('id', task._id);
    taskBtn.setAttribute('onclick', 'onSelect(this.id)');
    taskBtn.setAttribute('class', 'list-group-item');
    taskBtn.innerHTML = task.task;

    document.getElementById('taskListBtn').appendChild(taskBtn);
  })
}

function onSelect(id) {
  if (localStorage.getItem('name') !== allTasks.find(x => x._id === id).name) {
    const alert = document.getElementById("alert");

    alert.innerText = "This task does not belong to you";
    alert.style.display = "block";
    return;
  }

  console.log('Selected a task');

  currTask = id;
  document.getElementById('taskInput').value = allTasks.find(x => x._id === id).task;
  document.getElementById('addBtn').innerHTML = 'Edit';
  editMode = true;
}

function onLogin() {
  const nameInput = document.getElementById('name'); //get name form input
  const name = nameInput.value;
  
  if (allUsers.includes(name)) {
    // console.log('SUCCESS!!!');
    localStorage.setItem('name', name);
    window.location.replace("./task-list.html");
  } else {
    // console.log('FAIL');
    const alert = document.getElementById("alert");

    alert.style.display = "block";
    nameInput.style.border = "solid red";
  }
}

function onAdd() {
  let task = document.getElementById("taskInput").value;
  const name = localStorage.getItem('name');

  if (task === '') { return; }
  if (name === null) {
    const alert = document.getElementById("alert");

    alert.style.display = "block";
    setTimeout(() => {
      window.location.replace("./index.html");
    }, 2000);
    return;
  }

  let data = { 'name': name, 'task': task };

  if (editMode) {
    fetch(url + currTask, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => { return res.json(); })
      .then(data => {
        loadData();
        editMode = false;
        console.log('Success');
      })
      .catch(err => { console.error(err); })
  } else {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => { return res.json(); })
      .then(data => {
        loadData();
        console.log('Success');
      })
      .catch(err => { console.error(err); })
  }

  // console.log('Added new task');
}

function onRemove() {
  fetch(url + currTask, { method: 'DELETE' })
    .then(res => { console.log(res); })
    .then(() => {
      currTask = '';
      loadData();
    })
    .catch(err => { console.log(err); })

  console.log('Removed selected task');
}