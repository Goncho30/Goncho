// Definimos una clase para las tareas "Task"
class Task {
    id: number;
    name: string;
    encargado: string; // Nueva propiedad para el encargado

    constructor(taskName: string, encargado: string) {
        this.id = Date.now(); // El id es un timestamp al momento de crearlo
        this.name = taskName;
        this.encargado = encargado; // Asignamos el encargado
    }
}

let tasks: Task[] = []; // Array de tareas con objetos del tipo Task

// Detectamos si la página ha cargado completamente
document.addEventListener('DOMContentLoaded', paginaCargada);

function paginaCargada() {
    const addButton = document.getElementById("agregarTarea") as HTMLButtonElement;
    addButton.addEventListener('click', addTask);
}

function addTask() {
    const inputTask = document.getElementById('nuevaTarea') as HTMLInputElement;
    const taskName: string = inputTask.value.trim(); // Eliminamos espacios al principio y al final

    const inputEncargado = document.getElementById('encargado') as HTMLInputElement; // Capturamos el valor del encargado
    const encargadoName: string = inputEncargado.value.trim(); // Obtenemos el valor del campo encargado

    if (taskName !== "" && encargadoName !== "") { // Validamos que ambos campos tengan valores
        const newTask = new Task(taskName, encargadoName); // Creamos la nueva tarea
        tasks.push(newTask); // Agregamos la tarea al array
        inputTask.value = ""; // Limpiamos el campo de la tarea
        inputEncargado.value = ""; // Limpiamos el campo de encargado
        renderList(); // Actualizamos la lista de tareas en la interfaz
    } else {
        alert("Debe ingresar una tarea y un encargado");
    }
}

function renderList() {
    const taskTableBody = document.getElementById('listaTareas') as HTMLTableSectionElement;
    taskTableBody.innerHTML = ""; // Vaciamos el contenido del table body

    tasks.forEach((task, index) => {
        const tr = document.createElement('tr');
        const tdID = document.createElement('td');
        const tdTask = document.createElement('td');
        const tdEncargado = document.createElement('td'); // Celda para el encargado
        const tdAction = document.createElement('td');

        tdID.innerHTML = (index + 1).toString();
        tdTask.innerHTML = task.name;
        tdEncargado.innerHTML = task.encargado; // Mostrar el encargado en la tabla

        // Creación de los iconos
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit'; // Icono del lápiz
        editIcon.setAttribute('data-index', index.toString());
        editIcon.addEventListener('click', editTask);
        editIcon.style.padding = '0 5px';
        editIcon.style.cursor = 'pointer';

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash'; // Icono del tacho
        deleteIcon.setAttribute('data-index', index.toString());
        deleteIcon.addEventListener('click', deleteTask);
        deleteIcon.style.padding = '0 5px';
        deleteIcon.style.cursor = 'pointer';

        const arrowUp = document.createElement('i');
        arrowUp.className = 'fas fa-arrow-up'; // Icono de la flecha arriba
        arrowUp.setAttribute('data-index', index.toString());
        arrowUp.addEventListener('click', moveTaskUp);
        arrowUp.style.padding = '0 5px';
        arrowUp.style.cursor = 'pointer';

        const arrowDown = document.createElement('i');
        arrowDown.className = 'fas fa-arrow-down'; // Icono de la flecha abajo
        arrowDown.setAttribute('data-index', index.toString());
        arrowDown.addEventListener('click', moveTaskDown);
        arrowDown.style.padding = '0 5px';
        arrowDown.style.cursor = 'pointer';

        // Insertamos los iconos dentro de la celda tdAction
        tdAction.appendChild(editIcon);
        tdAction.appendChild(deleteIcon);
        tdAction.appendChild(arrowUp);
        tdAction.appendChild(arrowDown);

        // Insertamos las celdas dentro del tr
        tr.appendChild(tdID);
        tr.appendChild(tdTask);
        tr.appendChild(tdEncargado); // Nueva columna para el encargado
        tr.appendChild(tdAction);

        // Insertamos la fila en la tabla
        taskTableBody.appendChild(tr);
    });
}

function editTask() {
    // Implementar la función de edición si es necesario
}

function deleteTask() {
    // Implementar la función de eliminación si es necesario
}

function moveTaskUp() {
    const index = parseInt(this.getAttribute('data-index') as string);
    if (index > 0) {
        let temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
        renderList();
    }
}

function moveTaskDown() {
    const index = parseInt(this.getAttribute('data-index') as string); // Eliminado el paréntesis extra
    if (index < tasks.length - 1) {
        let temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;
        renderList();
    }
}
