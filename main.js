let tasks = [
    {
        title: "Sport",
        date: "13/32/1999",
        isDone: false,
    },
    {
        title: "Read",
        date: "13/32/1999",
        isDone: true,
    },
    {
        title: "Run",
        date: "13/32/1999",
        isDone: false,
    },
    {
        title: "Shopping",
        date: "13/32/1999",
        isDone: false,
    },
    {
        title: "Dancing",
        date: "13/32/1999",
        isDone: false,
    },
    {
        title: "Watching Tv",
        date: "13/32/1999",
        isDone: false,
    },
    {
        title: "Netflix",
        date: "13/32/1999",
        isDone: true,
    },
]
function getTasksFromStorage() {
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (retrievedTasks === null) {
        tasks = []
    } else {
        tasks = retrievedTasks
    }
}
getTasksFromStorage()

function fillTasksOnThePage() {
    document.getElementById("tasks").innerHTML = "" // so we could dont disply the html element in the js
    let index = 0
    for (task of tasks) {
        let content = `
                <div class="task ${task.isDone ? "done" : ""}">
                            <!--task info-->
                            <div style="width: 70%; padding-left: 12px;">
                            <h2>${task.title}</h2>
                            <div>
                                <span><span class="material-symbols-outlined">
            calendar_month
            </span>${task.date}</span>
                            </div>
                            </div>
                            <!--task info-->
                            <!--task action-->
                            <div style=" width:30%;  display:flex; justify-content: space-between; align-items: center; padding-right: 12px;" >
                            
                                <button onclick="deleteTask(${index})" class="circle" style="background-color:rgb(154, 17, 17);"><span class="material-symbols-outlined">
            delete
            </span></button>

                              ${
                                  task.isDone
                                      ? ` <button onclick="doneOrNot(${index})" 
                                      class="circle" style="background-color:rgb(212, 105, 69);">
                                     <span class="material-symbols-outlined">
cancel
</span></button>`
                                      : `  <button onclick="doneOrNot(${index})" 
                                      class="circle" style="background-color:rgb(106, 173, 125);;">
                                      <span class="material-symbols-outlined">check </span></button>
                                      `
                              }
   
                                <button onclick="updateTask(${index})" class="circle" style="background-color:rgb(124, 98, 156);"><span class="material-symbols-outlined">
            app_registration
            </span></button>
                            </div>
                            <!--task action-->


                        </div>
                
    `
        document.querySelector("#tasks").innerHTML += content
        index++
    }
}
fillTasksOnThePage()
document.getElementById("btn-add").addEventListener("click", () => {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let finalDate = `${day}/${month}/${year} | At ${hours}: ${minutes}`
    let result = prompt("What the Title of the activity?")
    let newObj = {
        title: result,
        date: finalDate,
        isDone: "false",
    }
    if (result) {
        tasks.push(newObj)
    }

    fillTasksOnThePage()
    storageData()
})

function deleteTask(index) {
    // I added onclick event to html task and the value = this function
    let confirmX = confirm(
        `Are you sure you want to delete the activity(${task.title})?`
    )
    console.log(confirmX)
    if (confirmX) {
        tasks.splice(index, 1)
        storageData()
        fillTasksOnThePage()
    }
}
function updateTask(index) {
    let task = tasks[index]
    let newUpdate = prompt(`Please update your data`, task.title)

    if (newUpdate === null) {
        return task.title
    }
    task.title = newUpdate

    fillTasksOnThePage()
    storageData()
}
function doneOrNot(index) {
    let task = tasks[index]
    task.isDone = !task.isDone

    fillTasksOnThePage()
    storageData()
}
// =========== FUNCTION STORAGES ========
function storageData() {
    let tasksToString = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksToString)
}
