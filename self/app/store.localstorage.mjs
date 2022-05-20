export class Store {
    #todos

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
        let lengthBefore = this.todos.length
        const itemIndex = this.todos.findIndex(i => i.id === id)
        this.todos.splice(itemIndex, 1)
        this.storeToDos()
        return this.todos.length < lengthBefore
    }
}
