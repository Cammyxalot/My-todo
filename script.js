
// Mes querySelector
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".toggle-select")

// Les event
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteTodo)
filterOption.addEventListener("change", filterTodo)


// Les fonctions 
function addTodo(event){
    // Pour empêcher le rechargement à cause du submit
    event.preventDefault()
    // Création de la div et de son contenue
    const todoContainer = document.createElement("div")
    todoContainer.classList.add("container")
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    const todo = document.createElement("li")

    todo.innerText = todoInput.value
    save(todoInput.value)

    todo.classList.add("todo-item")
    // Bouton pour valider la "todo"
    const completedButton = document.createElement("button")
    completedButton.innerHTML = `<i class="fas fa-check"></i>`
    completedButton.classList.add("complete-Btn")
    
    const trashButton = document.createElement("button")
    trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`
    trashButton.classList.add("trash-Btn")

    todoDiv.appendChild(todo)
    todoContainer.appendChild(todoDiv)
    todoContainer.appendChild(completedButton)
    todoContainer.appendChild(trashButton)
    todoList.appendChild(todoContainer)
    todoInput.value = ""
    
}

function deleteTodo(e){
    const item = e.target
    if (item.classList[0] === "trash-Btn"){
        const todo = item.parentElement
        todo.classList.add("deleted")
        removeTodo(todo)
        todo.addEventListener('transitionend', e => {
            todo.remove();
        })
    }
    if (item.classList[0] === "complete-Btn"){
        const todo = item.parentElement
        todo.classList.toggle("completed")
        todo.children[1].classList.toggle("completed")
    }
    
}

function filterTodo(e){
    // const todos = [...todos.children]
    const todos = Array.prototype.slice.call(todoList.children)
    todos.forEach(function(todo){
        switch (e.target.value){
            case "All":
                todo.style.display = "flex"
                break
            case "Completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                } else{
                    todo.style.display = "none"
                }
                break
            case "Uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                } else{
                    todo.style.display = "none"
                }
                break
        }
    })
}

function save(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

function removeTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf,1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos(){
    let localTodos = localStorage.getItem("todos")
    todos = !localTodos ? [] : JSON.parse(localTodos)
    todos.forEach(function(content) {
        const todoContainer = document.createElement("div")
        todoContainer.classList.add("container")
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
        todo = document.createElement("li")
    
        todo.innerText = content
    
        todo.classList.add("todo-item")
        // Bouton pour valider la "todo"
        const completedButton = document.createElement("button")
        completedButton.innerHTML = `<i class="fas fa-check"></i>`
        completedButton.classList.add("complete-Btn")
        
        const trashButton = document.createElement("button")
        trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`
        trashButton.classList.add("trash-Btn")
    
        todoDiv.appendChild(todo)
        todoContainer.appendChild(todoDiv)
        todoContainer.appendChild(completedButton)
        todoContainer.appendChild(trashButton)
        todoList.appendChild(todoContainer)
    })
}
