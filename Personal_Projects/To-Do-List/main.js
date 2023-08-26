window.addEventListener("load", () => {
    //JSON es un tipo de String y hacemos parsing a un array, porque es un string y no nos sirve así
    //localStorage es como guardarlo en la nube pero en la página para que al cargar no se borre
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.querySelector("#name");
    const newToDoForm = document.querySelector("#new-ToDo-form");

    //Esto es para conseguir solo un elemento
    const username = localStorage.getItem("username") || "";

    nameInput.value = username;

    nameInput.addEventListener("change", e => {
        localStorage.setItem("username", e.target.value);
    })

    newToDoForm.addEventListener("submit", e =>{
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            //Time Stamp mit dem Tag und Uhrzeit
            createAt: new Date().getTime()
        }

        // add new todo to todos array
         todos.push(todo);
         console.log("pushed");
        // sort the todo items by created date
            sorted_todos = todos.sort(function(todo1, todo2) {
                console.log("sorting");
                return todo1.createdAt - todo2.createdAt
            });
    
        // save the sorted_todos on the local storage
        localStorage.setItem('todos', JSON.stringify(sorted_todos));
        console.log("done");

        e.target.reset();

        DisplayTodos();
    })
})

function DisplayTodos() {
    const todolist = document.querySelector("#ToDo-List");

    todolist.innerHTML = "";
    
    todos.sort().forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("ToDo-Item");

        //All das um ein neues Ding zu erschaffen.
        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement("div");
        const actions = document.createElement("div");
        const edit = document.createElement("button");
        const deleteButton = document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done;
        span.classList.add("bubble");

        if (todo.category == "colegio") {
            span.classList.add("colegio");
        }
        else if (todo.category == "deporte") {
            span.classList.add("deporte");
        }
        else if (todo.category == "citas") {
            span.classList.add("citas");
        }
        else if (todo.category == "examen") {
            span.classList.add("examen");
        }
        else if (todo.category == "familia") {
            span.classList.add("familia");
        }
        else {
            span.classList.add("otros");
        }

        content.classList.add("ToDo-Content");
        actions.classList.add("actions");
        edit.classList.add("edit");
        deleteButton.classList.add("delete");

        content.innerHTML = `<input type="text" value = "${todo.content}" readonly>`;
        edit.innerHTML ="Edit";
        deleteButton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todolist.appendChild(todoItem);


        if (todo.done) {
            todoItem.classList.add("done");
        }

        input.addEventListener("click", e => {
            todo.done = e.target.checked;
            localStorage.setItem("todos", JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add("done");
            } else {
                todoItem.classList.remove("done");
            }

            DisplayTodos();
        })

        edit.addEventListener("click", e => {
            const input = content.querySelector("input");
            input.removeAttribute("readonly");
            input.focus();
            input.addEventListener("blur", e => {
                input.setAttribute("readonly", true);
                todo.content = e.target.value;
                localStorage.setItem("todos", JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener("click", e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            DisplayTodos();
        })
    })
}