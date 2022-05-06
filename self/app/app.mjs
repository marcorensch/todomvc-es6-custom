const input = document.querySelector('.new-todo')
const list = document.querySelector('.todo-list')
const errorDiv = document.createElement('div')
errorDiv.classList.add('error')

const todos = JSON.parse(localStorage.getItem("todos") || "[]")
for (const todo of todos){
    const li = document.createElement('li')
    li.innerHTML = `<div class="view">
      <input class="toggle" />
      <label>${todo.text}</label>
      <button class="destroy" />
      </div>`
    list.appendChild(li)
    li.querySelector('.destroy').addEventListener('click', () => {
        li.remove()
    })
}

input.addEventListener('keyup', (ev) => {
    if(ev.code === 'Enter'){
        const text = input.value

        if(text.length === 0){
            errorDiv.innerText = "Text darf nicht leer sein!"
            input.parentNode.appendChild(errorDiv)
        }else{
            errorDiv.remove()
            const li = document.createElement('li')
            li.innerHTML = `<div class="view">
      <input class="toggle" />
      <label>${text}</label>
      <button class="destroy" />
      </div>`
            list.appendChild(li)
            todos.push({ text })
            localStorage.setItem("todos", JSON.stringify(todos))

            input.value = ''

            li.querySelector('.destroy').addEventListener('click', () => {
                li.remove()
            })
        }
    }
})
