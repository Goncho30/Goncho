// Definimos una clase para las tareas "Task"
var Task = /** @class */ (function () {
    function Task(taskName, encargado) {
        this.id = Date.now(); // el id es timeStamp al momento de crearlo
        this.name = taskName;
        this.encargado = encargado; // Agregamos el encargado a la clase
    }
    return Task;
}());

var tasks = []; // Array de tareas con objetos del tipo Task
var editMode = false; // Indica si estamos editando o no
var editIndex = 0; // Contiene el índice de la tarea que se está editando

// Detectamos si la página ha cargado completamente
document.addEventListener('DOMContentLoaded', paginaCargada);

function paginaCargada() {
    var addButton = document.getElementById("agregarTarea");
    addButton.addEventListener('click', addTask);
}

function addTask() {
    var inputTask = document.getElementById('nuevaTarea');
    var inputEncargado = document.getElementById('encargado'); // Capturamos el encargado
    var taskName = inputTask.value;
    var encargado = inputEncargado.value; // Obtenemos el encargado

    if (taskName !== "" && encargado !== "") {
        var newTask = new Task(taskName, encargado); // Creamos el objeto y le pasamos los valores
        tasks.push(newTask); // Agregamos el objeto al array
        inputTask.value = "";
        inputEncargado.value = ""; // Limpiamos el campo del encargado
        renderList(); // Actualizar la vista (interface)
    } else {
        alert("Debe ingresar una tarea y un encargado >:(");
    }
}

function renderList() {
    var taskTableBody = document.getElementById('listaTareas');
    taskTableBody.innerHTML = ""; // Vaciamos el contenido del tbody

    tasks.forEach(function (task, index) {
        var tr = document.createElement('tr');
        var tdID = document.createElement('td');
        var tdTask = document.createElement('td');
        var tdEncargado = document.createElement('td');
        var tdAction = document.createElement('td');

        tdID.innerHTML = (index + 1).toString();
        tdTask.innerHTML = task.name;
        tdEncargado.innerHTML = task.encargado; // Mostramos el encargado

        // Creamos los 4 iconos
        var editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit'; // Icono del lápiz
        editIcon.setAttribute('data-index', index.toString());
        editIcon.addEventListener('click', editTask);
        editIcon.style.padding = '0 5px';
        editIcon.style.cursor = 'pointer';

        var deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash'; // Icono del tacho
        deleteIcon.setAttribute('data-index', index.toString());
        deleteIcon.addEventListener('click', deleteTask);
        deleteIcon.style.padding = '0 5px';
        deleteIcon.style.cursor = 'pointer';

        var arrowUp = document.createElement('i');
        arrowUp.className = 'fas fa-arrow-up'; // Icono de la flecha arriba
        arrowUp.setAttribute('data-index', index.toString());
        arrowUp.addEventListener('click', moveTaskUp);
        arrowUp.style.padding = '0 5px';
        arrowUp.style.cursor = 'pointer';

        var arrowDown = document.createElement('i');
        arrowDown.className = 'fas fa-arrow-down'; // Icono de la flecha abajo
        arrowDown.setAttribute('data-index', index.toString());
        arrowDown.addEventListener('click', moveTaskDown);
        arrowDown.style.padding = '0 5px';
        arrowDown.style.cursor = 'pointer';

        // Insertamos los 4 iconos (<i>) dentro de la celda tdAction
        tdAction.appendChild(editIcon);
        tdAction.appendChild(deleteIcon);
        tdAction.appendChild(arrowUp);
        tdAction.appendChild(arrowDown);

        // Insertamos las celdas dentro de la fila (<tr>)
        tr.appendChild(tdID);
        tr.appendChild(tdTask);
        tr.appendChild(tdEncargado); // Asegúrate de incluir esta celda
        tr.appendChild(tdAction); // Asegúrate de incluir esta celda también

        // Insertamos la fila en la tabla (tablebody)
        taskTableBody.appendChild(tr);
    }); // fin de foreach
} // fin de renderList()

function editTask() {
    var index = parseInt(this.getAttribute('data-index'));
    var taskToEdit = tasks[index];

    // Capturamos los nuevos valores
    var newTaskName = prompt("Edita la tarea:", taskToEdit.name);
    var newEncargado = prompt("Edita el encargado:", taskToEdit.encargado);

    if (newTaskName !== null && newEncargado !== null) {
        tasks[index].name = newTaskName.trim();
        tasks[index].encargado = newEncargado.trim();
        renderList(); // Actualizar la vista
    }
}

function deleteTask() {
    var index = parseInt(this.getAttribute('data-index'));
    tasks.splice(index, 1); // Eliminar la tarea del array
    renderList(); // Actualizar la vista
}

function moveTaskUp() {
    var index = parseInt(this.getAttribute('data-index'));
    if (index > 0) {
        var temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
        renderList();
    }
}

function moveTaskDown() {
    var index = parseInt(this.getAttribute('data-index'));
    if (index < tasks.length - 1) {
        var temp = tasks[index]; // Guarda la tarea actual en una variable temporal
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;
        renderList();
    }
}
