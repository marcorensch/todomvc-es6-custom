const input = document.querySelector('.new-todo')
const list = document.querySelector('.todo-list')
const errorDiv = document.createElement('div')
errorDiv.classList.add('error')

class View{

    constructor(store) {
        this.store = store
        list.addEventListener('click', (e)=>{
            if(e.target.classList.contains('destroy')){
                const id = Number(e.target.closest('[data-id]').dataset.id)
                console.log(id)
                this.store.remove(id)
                e.target.closest('li').remove()
            }
        })
    }

    createListItem(todo){
        const li = document.createElement('li')
        li.innerHTML = `<div class="view" data-id="${todo.id}">
      <input class="toggle" />
      <label>${todo.text}</label>
      <button class="destroy" />
      </div>`
        return li
    }
}
class Store {
    todos
    constructor() {
        this.todos = this.loadAllToDos()
    }

    loadAllToDos() {
        const todos = JSON.parse(localStorage.getItem("todos") || "[]")
        return todos;
    }

    storeToDos() {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }

    add(todo) {
        todo.id = new Date().getTime()
        this.todos.push(todo)
        this.storeToDos()
        return todo.id
    }

    remove(id) {
        const itemIndex = todos.findIndex(i => i.id === id)
        this.todos.splice(itemIndex, 1)
        this.storeToDos()
    }
}

const store = new Store()
const view = new View(store)
const todos = store.loadAllToDos();

for (const todo of todos){
    const li = view.createListItem(todo)
    list.appendChild(li)
}

input.addEventListener('keyup', (ev) => {
    if(ev.code === 'Enter'){
        const text = input.value
        if(text.length === 0){
            errorDiv.innerText = "Text darf nicht leer sein!"
            input.parentNode.appendChild(errorDiv)
        }else{
            errorDiv.remove()
            const id = store.add({ text })
            const li = view.createListItem({id,text})
            list.appendChild(li)
            input.value = ''
        }
    }
})
