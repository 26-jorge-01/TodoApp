// JavaScript source code

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let textDate = document.getElementById("textDate");
let textArea = document.getElementById("textArea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let data = [];


form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();

});

let formValidation = () => {
    if (textInput.value === "") {
        console.log('Failure');
        msg.innerHTML = "El titulo de la tarea no puede ser vacio.";
        //return;
    }
    else {
        console.log('Success');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "modal");
        });
    }
};



let acceptData = () => {
    //data["text            "] = textInput.value;
    //data["date            "] = textDate.value;
    //data["description     "] = textArea.value;
    //createTask();
    data.push({
        text        :  textInput.value , 
        date        :  textDate.value, 
        description: textArea.value,
    });
    localStorage.setItem("data", JSON.stringify(data))
    console.log(data);
    createTask();
};


let createTask = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>
                <span class="options">
                    <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pencil"></i>
                    <i onClick ="deleteTask(this)" class="fa-solid fa-trash"></i>
                </span>
            </div>

        `)
    });
    
    resetForm();

};

let resetForm = () => {
    textInput.value = "";
    textDate.value = "";
    textArea.value = "";
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data))
    console.log(data);
};

let editTask = (e) => {
    let selectTask = e.parentElement.parentElement;
    textInput.value = selectTask.children[0].innerHTML;
    textDate.value = selectTask.children[1].innerHTML;
    textArea.value = selectTask.children[2].innerHTML;

    selectTask.remove();
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask();
    console.log(data)
})();
