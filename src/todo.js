
const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList"),
finishedList = document.querySelector(".js-finished"),
myname_form = document.querySelector(".myname"),
myname = myname_form.querySelector("input"),
name_button = myname_form.querySelector("button"),

name = document.querySelector("h2")


let toDos = [];
const TODOS_LS = 'PENDING';


let finishDos = [];
const finish_LS = 'FINISHED';


function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  })
  toDos = cleanToDos
  saveTodos();
}

function deletefinished(event){
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finishDos.filter(function(finished){
    return finished.id !== parseInt(li.id);
  })
  finishDos = cleanToDos
  saveFinished();
}

function finishtodo(event){
  const btn = event.target;
  const li2 = btn.parentNode;
  const text = li2.querySelector("span").innerText;
  const span = document.createElement("span");
  
  const li = document.createElement('li');
  const delBut = document.createElement('button');
  const back = document.createElement('button');
  back.value = '🔙';
  delBut.value = '❌';
  const newId = finishDos.length + 1;
  span.innerText = text;
  
  li.appendChild(span);
  li.id = newId;
  li.appendChild(delBut);
  li.appendChild(back);
  finishedList.appendChild(li)
  const tofinishObj = {text : text , id : newId};
  
  finishDos.push(tofinishObj);
  deleteToDo(event)
  saveFinished()


}



function backtodo(event){
  const btn = event.target;
  const li2 = btn.parentNode;
  const text = li2.querySelector("span").innerText;
  const span = document.createElement("span");
  
  const li = document.createElement('li');
  const delBut = document.createElement('button');
  const finish = document.createElement('button');

  finish.value = '✅'
  delBut.value = '❌'
  const newId = toDos.length + 1;
  span.innerText = text;
  
  li.appendChild(span);
  li.id = newId;
  li.appendChild(delBut);
  li.appendChild(finish);
  toDoList.appendChild(li)
  const toDoObj = {text : text , id : newId};
  
  toDos.push(toDoObj);
  
  deletefinished(event)
  saveTodos()
  
}






function handle_func(text){
  const li = document.createElement('li')
  const delBut = document.createElement('button')
  const finish = document.createElement('button')
  finish.value = '✅'
  delBut.value = '❌'
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  li.appendChild(span)
  li.id = newId
  li.appendChild(delBut)
  li.appendChild(finish)
  toDoList.appendChild(li)
  const toDoObj = {text : text , id : newId };
  
  toDos.push(toDoObj);
  saveTodos()
}

function handle_func2(text){
    const li = document.createElement('li')
    const delBut = document.createElement('button')
    const finish = document.createElement('button')
    finish.value = '🔙'
    delBut.value = '❌'
    const span = document.createElement("span");
    const newId = finishDos.length + 1;
    span.innerText = text;
    li.appendChild(span)
    li.id = newId
    li.appendChild(delBut)
    li.appendChild(finish)
    finishedList.appendChild(li)
    const toDoObj = {text : text , id : newId };
    
    finishDos.push(toDoObj);
    saveFinished()
  }

function func1(event){
  const btn = event.target;
  if (btn.value==='✅'){
    btn.addEventListener("click", finishtodo(event));
  } else{  
    btn.addEventListener("click", deleteToDo(event));
  }  
}

function func2(event){
  const btn = event.target;
  if (btn.value==='🔙'){
    btn.addEventListener("click", backtodo(event));
  } else{  
    btn.addEventListener("click", deletefinished(event));

  }  
}


function submit_func(event){
  event.preventDefault();
  const current_value = toDoInput.value;
  handle_func(current_value);

}





function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }
  
function saveFinished(){
  localStorage.setItem(finish_LS, JSON.stringify(finishDos));
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS)
  const loadedname = localStorage.getItem('name')
  if(loadedname !==null){
    name.innerText = JSON.parse(loadedname)
  }
  
  if(loadedToDos !==null){
  if(loadedToDos.length){
      const parsedTodos = JSON.parse(loadedToDos);

      parsedTodos.forEach(function(toDo){
        handle_func(toDo.text);
      }); 
  }}
  const loadedfinish = localStorage.getItem(finish_LS)
  if(loadedfinish !==null){
  if(loadedfinish.length){
    const parsedfinished = JSON.parse(loadedfinish);
    parsedfinished.forEach(function(finishied){
        handle_func2(finishied.text);
    }); 
}

}
}

function savemyname(event){
  event.preventDefault();
  name.innerText = myname.value;
  localStorage.setItem('name', JSON.stringify(myname.value));
}


function init(){
  loadToDos();
  toDoForm.addEventListener("submit",submit_func);
  name_button.addEventListener("click",savemyname);
  toDoList.addEventListener("click",func1);
  finishedList.addEventListener("click",func2);
}


init();