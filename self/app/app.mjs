import {Store} from "./store.localstorage.mjs";

class View {
    constructor(store) {
        this.store = store
        this.input = document.querySelector('.new-todo')
        this.list = document.querySelector('.todo-list')
        this.errorDiv = document.createElement('div')
        this.errorDiv.classList.add('error')

        this.list.addEventListener('click', (e) => {
            if (e.target.classList.contains('destroy')) {
                const id = Number(e.target.closest('[data-id]').dataset.id)
                console.log(id)
                if (this.onRemoveItem(id)) {
                    e.target.closest('li').remove()
                }
            }
        })

        this.input.addEventListener('keyup', (ev) => {
            if (ev.code === 'Enter') {
                const text = this.input.value
                this.onAddItem(text)
            }
        })
    }

    createListItem(todo) {
        const li = document.createElement('li')
        li.innerHTML = `<div class="view" data-id="${todo.id}">
      <input class="toggle" />
      <label>${todo.text}</label>
      <button class="destroy" />
      </div>`
        return li
    }

    renderTodos(todos) {
        for (const todo of todos) {
            const li = view.createListItem(todo)
            this.list.appendChild(li)
        }
    }

    setOnAddItemCallback(fn) {
        this.onAddItem = fn
    }

    setOnRemoveItemCallback(fn) {
        this.onRemoveItem = fn
    }

    renderError(text) {
        this.errorDiv.innerText = text
        this.input.parentNode.appendChild(this.errorDiv)
    }

    renderItem(item) {
        this.errorDiv.remove()
        const li = this.createListItem(item)
        this.list.appendChild(li)
        this.input.value = ''
    }
}

class Controller {
    constructor(store, view) {
        this.store = store
        this.view = view
        const todos = this.store.loadAllToDos();
        this.view.renderTodos(todos)
        this.view.setOnAddItemCallback((...a)=>{this.onAddItem(...a)})
        this.view.setOnRemoveItemCallback((...a) => this.onRemoveItem(...a))
    }

    onAddItem(text) {
        if (text.length === 0) {
            this.view.renderError("Text darf nicht leer sein!")
        } else {
            const id = this.store.add({text})
            this.view.renderItem({id, text})
        }
    }

    onRemoveItem(id) {
        if (!this.store.remove(id)) {
            this.view.renderError(`Element mit der ID ${id} konnte nicht gelöscht werden`)
            return false
        } else {
            // this.view.renderError(`Element mit der ID ${id} gelöscht!`)
            return true
        }
    }
}

const store = new Store()
const view = new View()
const ctrl = new Controller(store, view)

