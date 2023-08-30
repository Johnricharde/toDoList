// MODEL ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tasks = [];

// VIEW ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tasksTable = document.getElementById('tasksTable');
show();

function show() {
    let html = /*HTML*/`
    <tr>
    <th>Oppgave</th>
    <th>Person</th>
    <th>Frist</th>
    <th></th>
    <th></th>
    <th>Gjort</th>
    </tr>`;
    for (let i = 0; i < tasks.length; i++) {
        html += createHtmlRow(i);
    }
    tasksTable.innerHTML = html;
}

function createHtmlRow(i) {
    const task = tasks[i];
    const checkedHtml = task.isDone ? 'checked="checked"' : '';
    if (!task.editMode)
        return /*HTML*/`
        <tr>
            <td>${task.description}</td>
            <td>${task.person}</td>
            <td>${task.date}</td>
            <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml} /></td>
            <td>
            <button onclick="deleteTask(${i})">Slett</button>
            <button onclick="editTask(${i})">Rediger</button>
            </td>
            <td>${task.done}</td>
            </tr>
        `;
        return /*HTML*/`
        <tr>
        <td><input id="editDescription${i}" type="text" value="${task.description}"/></td>
        <td><input id="editPerson${i}" type="text" value="${task.person}"/></td>
        <td><input id="editDate${i}" type="date" value="${task.date}"/></td>
            <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml} /></td>
            <td>
            <button onclick="updateTask(${i})">Lagre</button>
            </td>
            <td><input id="editDate${i}" type="date" value="${task.date}"/></td>
            </tr>
        `;
    }
    function changeIsDone(checkbox, index) {
        const task = tasks[index];
        tasks[index].isDone = checkbox.checked;
        if (checkbox.checked) {
            task.done = new Date().toLocaleDateString()
        } else {task.done = ""}
        show();
    }
    
    function deleteTask(index) {
        tasks.splice(index, 1);
        show();
    }
                    
    function editTask(index) {
        tasks[index].editMode = true;
        show();
    }
    
    function updateTask(index) {
        task = tasks[index];
        const idDescription = `editDescription${index}`;
        const idPerson = `editPerson${index}`;
        const idDate = `editDate${index}`;
        
        const inputTagDescription = document.getElementById(idDescription);
        const inputTagPerson = document.getElementById(idPerson);
        const inputTagDate = document.getElementById(idDate);
        
        task.description = inputTagDescription.value;
        task.person = inputTagPerson.value;
        task.date = inputTagDate.value;
        task.editMode = false;
    show();
}



// CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////////
var taskDescriptionInput = document.getElementById('taskDescription');
var taskPersonInput = document.getElementById('taskPerson');
var taskDateInput = document.getElementById('taskDate');

function addTask() {
    tasks.push({
        description: taskDescriptionInput.value,
        person: taskPersonInput.value,
        date: new Date(taskDateInput.value).toLocaleDateString(),
        isDone: false,
        done: "",
    })
    taskDescriptionInput.value = '';
    taskPersonInput.value = '';
    taskDateInput.value = '';
    show();
}
