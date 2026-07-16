console.log("Study OS Loaded!");

// ==========================
// GREETING + DATE + CLOCK
// ==========================

function updateDashboard(){

    const now = new Date();

    const hour = now.getHours();

    const greeting = document.getElementById("greeting");
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");

    if(hour < 12){

        greeting.innerHTML =
        "☀️ Good Morning, Abdullah";

    }

    else if(hour < 18){

        greeting.innerHTML =
        "🌤️ Good Afternoon, Abdullah";

    }

    else{

        greeting.innerHTML =
        "🌙 Good Evening, Abdullah";

    }

    clock.textContent =
    now.toLocaleTimeString();

    date.textContent =
    now.toDateString();

}

setInterval(updateDashboard,1000);

updateDashboard();


// ==========================
// DAILY MOTIVATION
// ==========================

const quotes = [

"📖 Success is the sum of small efforts repeated every day.",

"🎯 Learn something new every day.",

"🏆 Small progress is still progress.",

"📚 Education is the key to the future.",

"⭐ Dream big. Study hard.",

"💡 Every expert was once a beginner.",

"🚀 Believe in yourself and keep learning.",

"📝 Practice makes progress.",

"🌟 Great things take time.",

"📘 Today is another chance to learn."

];

const quoteText =
document.querySelector(".quote-box p");

function randomQuote(){

    const random =
    Math.floor(Math.random()*quotes.length);

    quoteText.textContent =
    quotes[random];

}

randomQuote();


// ==========================
// PAGE TITLE ANIMATION
// ==========================

const titles = [

"📚 Study OS",

"📝 Stay Focused",

"🎯 Keep Learning",

"⭐ Study Smart"

];

let titleIndex = 0;

setInterval(function(){

    document.title = titles[titleIndex];

    titleIndex++;

    if(titleIndex >= titles.length){

        titleIndex = 0;

    }

},3000);


// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll("a").forEach(link=>{

    link.addEventListener("click",function(e){

        const target =
        document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});
// ==========================
// HOMEWORK MANAGER
// ==========================

const homeworkInput = document.getElementById("homeworkInput");
const subjectSelect = document.getElementById("subjectSelect");
const prioritySelect = document.getElementById("prioritySelect");
const addHomework = document.getElementById("addHomework");

const homeworkList = document.getElementById("homeworkList");
const homeworkBar = document.getElementById("homeworkBar");
const homeworkProgress = document.getElementById("homeworkProgress");

if(
    homeworkInput &&
    subjectSelect &&
    prioritySelect &&
    addHomework &&
    homeworkList
){

    let homeworks =
    JSON.parse(localStorage.getItem("studyHomework")) || [];

    function saveHomework(){

        localStorage.setItem(
            "studyHomework",
            JSON.stringify(homeworks)
        );

    }

    function renderHomework(){

        homeworkList.innerHTML="";

        let completed=0;

        homeworks.forEach((item,index)=>{

            if(item.done){

                completed++;

            }

            let priorityClass="low";

            if(item.priority.includes("Medium")){

                priorityClass="medium";

            }

            if(item.priority.includes("High")){

                priorityClass="high";

            }

            const li=document.createElement("li");

            li.innerHTML=`

                <div class="homework-left">

                    <input
                    type="checkbox"
                    class="hwCheck"
                    data-index="${index}"
                    ${item.done?"checked":""}>

                    <span class="${item.done?"done":""}">
                        ${item.task}
                    </span>

                    <span class="subject-tag">
                        ${item.subject}
                    </span>

                    <span class="priority ${priorityClass}">
                        ${item.priority}
                    </span>

                </div>

                <button
                class="deleteHomework"
                data-index="${index}">
                🗑️
                </button>

            `;

            homeworkList.appendChild(li);

        });

        const total=homeworks.length;

        const percent=
        total===0
        ?0
        :Math.round((completed/total)*100);

        homeworkBar.style.width=
        percent+"%";

        homeworkProgress.textContent=
        percent+"% Completed ("+
        completed+"/"+total+")";

        saveHomework();

        document
        .querySelectorAll(".hwCheck")
        .forEach(box=>{

            box.onchange=function(){

                homeworks[this.dataset.index].done=
                this.checked;

                renderHomework();

            };

        });

        document
        .querySelectorAll(".deleteHomework")
        .forEach(btn=>{

            btn.onclick=function(){

                homeworks.splice(
                    this.dataset.index,
                    1
                );

                renderHomework();

            };

        });

    }

    function addNewHomework(){

        if(homeworkInput.value.trim()=="") return;

        homeworks.push({

            task:homeworkInput.value,

            subject:subjectSelect.value,

            priority:prioritySelect.value,

            done:false

        });

        homeworkInput.value="";

        renderHomework();

    }

    addHomework.onclick=addNewHomework;

    homeworkInput.addEventListener("keypress",function(e){

        if(e.key==="Enter"){

            addNewHomework();

        }

    });

    renderHomework();

}
// ==========================
// CLASS ROUTINE
// ==========================

const routineDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];

const saveRoutineBtn = document.getElementById("saveRoutine");

// Load Saved Routine

function loadRoutine(){

    routineDays.forEach(day=>{

        const textarea = document.getElementById(day);

        if(textarea){

            textarea.value =
            localStorage.getItem("routine_"+day) || "";

        }

    });

}

// Save Routine

function saveRoutine(){

    routineDays.forEach(day=>{

        const textarea = document.getElementById(day);

        if(textarea){

            localStorage.setItem(
                "routine_"+day,
                textarea.value
            );

        }

    });

    saveRoutineBtn.textContent = "✅ Routine Saved!";

    setTimeout(function(){

        saveRoutineBtn.textContent =
        "💾 Save Routine";

    },2000);

}

// Button

if(saveRoutineBtn){

    saveRoutineBtn.onclick = saveRoutine;

}

// Auto Save While Typing

routineDays.forEach(day=>{

    const textarea = document.getElementById(day);

    if(textarea){

        textarea.addEventListener("input",function(){

            localStorage.setItem(
                "routine_"+day,
                textarea.value
            );

        });

    }

});

// Highlight Today's Day

const today = new Date().getDay();

/*
0 = Sunday
1 = Monday
2 = Tuesday
3 = Wednesday
4 = Thursday
5 = Friday
6 = Saturday
*/

const todayNames = [

    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"

];

const todayBox = document
.getElementById(todayNames[today]);

if(todayBox){

    todayBox.parentElement.classList.add("today-day");

}

// Load Data

loadRoutine();

// Smart Notes System

let notes = JSON.parse(localStorage.getItem("smartNotes")) || [];

function saveNote() {
    let title = document.getElementById("noteTitle").value;
    let text = document.getElementById("noteText").value;

    if (title === "" || text === "") {
        alert("Please write a title and note!");
        return;
    }

    let note = {
        title: title,
        text: text,
        date: new Date().toLocaleDateString()
    };

    notes.push(note);

    localStorage.setItem("smartNotes", JSON.stringify(notes));

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";

    displayNotes();
}


// Display Notes
function displayNotes() {
    let notesList = document.getElementById("notesList");

    notesList.innerHTML = "";

    notes.forEach((note, index) => {

        notesList.innerHTML += `
        <div class="note-card">
            <h3>📝 ${note.title}</h3>
            <p>${note.text}</p>
            <small>Created: ${note.date}</small>
            <br><br>
            <button onclick="deleteNote(${index})">
                Delete
            </button>
        </div>
        `;
    });
}


// Delete Notes
function deleteNote(index) {
    notes.splice(index, 1);

    localStorage.setItem("smartNotes", JSON.stringify(notes));

    displayNotes();
}


// Load Notes When Page Opens
displayNotes();
// Smart Study Planner

let studyTasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


// Add Task
function addStudyTask() {

    let subject = document.getElementById("studySubject").value;
    let task = document.getElementById("studyTask").value;
    let time = document.getElementById("studyTime").value;


    if(subject === "" || task === "") {
        alert("Please enter subject and task!");
        return;
    }


    let newTask = {
        subject: subject,
        task: task,
        time: time,
        completed: false
    };


    studyTasks.push(newTask);

    localStorage.setItem("studyTasks", JSON.stringify(studyTasks));


    document.getElementById("studySubject").value = "";
    document.getElementById("studyTask").value = "";
    document.getElementById("studyTime").value = "";


    displayStudyTasks();

}


// Display Tasks
function displayStudyTasks(){

    let list = document.getElementById("taskList");

    list.innerHTML = "";


    studyTasks.forEach((item,index)=>{

        list.innerHTML += `

        <div class="study-task ${item.completed ? "completed" : ""}">

            <div>
                <h3>📚 ${item.subject}</h3>
                <p>${item.task}</p>
                <small>🕒 ${item.time}</small>
            </div>


            <div>

            <button onclick="completeTask(${index})">
                ✅
            </button>

            <button onclick="deleteStudyTask(${index})">
                🗑️
            </button>

            </div>

        </div>

        `;

    });


    updateProgress();

}



// Complete Task

function completeTask(index){

    studyTasks[index].completed = !studyTasks[index].completed;

    localStorage.setItem("studyTasks", JSON.stringify(studyTasks));

    displayStudyTasks();

}



// Delete Task

function deleteStudyTask(index){

    studyTasks.splice(index,1);

    localStorage.setItem("studyTasks", JSON.stringify(studyTasks));

    displayStudyTasks();

}



// Progress Bar

function updateProgress(){

    let total = studyTasks.length;

    let completed = studyTasks.filter(
        task => task.completed
    ).length;


    let percent = 0;


    if(total > 0){
        percent = Math.round((completed / total) * 100);
    }


    document.getElementById("progressFill").style.width = percent + "%";

    document.getElementById("progressText").innerHTML =
    percent + "% Completed";

}



// Load Tasks

displayStudyTasks();
/* Digital Textbook Library */

// Textbook links
const textbooks = {
    English: "https://www.ebook.gov.bd/",
    Mathematics: "https://www.ebook.gov.bd/",
    Science: "https://www.ebook.gov.bd/",
    "Bangladesh & Global Studies": "https://www.ebook.gov.bd/",
    ICT: "https://www.ebook.gov.bd/"
};


// Open Book Function

function openBook(subject){

    if(textbooks[subject]){

        window.open(textbooks[subject], "_blank");

    }

    else{

        alert("Book link not available!");

    }

}


// Add button actions automatically

let bookButtons = document.querySelectorAll(".book-card button");


bookButtons.forEach((button)=>{

    let subject = button.parentElement.querySelector("h3").innerText;


    button.onclick = function(){

        openBook(subject);

    };

});
/* Smart Study Timer */

let timeLeft = 25 * 60;
let timer;
let isRunning = false;
let sessions = Number(localStorage.getItem("studySessions")) || 0;


// Update Timer Display

function updateTimer(){

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timerDisplay").innerHTML =
        `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

}


// Start Timer

function startTimer(){

    if(isRunning) return;

    isRunning = true;

    timer = setInterval(()=>{

        timeLeft--;

        updateTimer();


        if(timeLeft <= 0){

            clearInterval(timer);

            isRunning = false;

            sessions++;

            localStorage.setItem("studySessions", sessions);

            document.getElementById("sessionCount").innerHTML = sessions;

            alert("🎉 Study session completed!");

            resetTimer();

        }


    },1000);

}



// Pause Timer

function pauseTimer(){

    clearInterval(timer);

    isRunning = false;

}



// Reset Timer

function resetTimer(){

    clearInterval(timer);

    isRunning = false;

    timeLeft = 25 * 60;

    updateTimer();

}



// Load Sessions

document.getElementById("sessionCount").innerHTML = sessions;

updateTimer();
/* Study Progress Dashboard */


function updateStudyProgress(){

    // Get completed tasks from Study Planner

    let completed = studyTasks.filter(
        task => task.completed
    ).length;


    let total = studyTasks.length;


    // Update completed tasks number

    document.getElementById("completedTasks").innerHTML = completed;



    // Calculate Study Score

    let score = 0;


    if(total > 0){

        score = Math.round(
            (completed / total) * 100
        );

    }


    document.getElementById("studyScore").innerHTML =
        score + "%";

}



// Update when page loads

updateStudyProgress();



// Refresh progress when tasks change

let oldAddTask = addStudyTask;

addStudyTask = function(){

    oldAddTask();

    updateStudyProgress();

};


let oldCompleteTask = completeTask;

completeTask = function(index){

    oldCompleteTask(index);

    updateStudyProgress();

};


let oldDeleteTask = deleteStudyTask;

deleteStudyTask = function(index){

    oldDeleteTask(index);

    updateStudyProgress();

};
/* Exam Tracker */

let exams = JSON.parse(localStorage.getItem("exams")) || [];


// Add Exam

function addExam(){

    let subject = document.getElementById("examSubject").value;
    let date = document.getElementById("examDate").value;
    let status = document.getElementById("examStatus").value;


    if(subject === "" || date === ""){

        alert("Please enter subject and exam date!");

        return;

    }


    let exam = {

        subject: subject,
        date: date,
        status: status

    };


    exams.push(exam);


    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );


    document.getElementById("examSubject").value = "";
    document.getElementById("examDate").value = "";


    displayExams();

}



// Display Exams

function displayExams(){

    let list = document.getElementById("examList");

    list.innerHTML = "";


    exams.forEach((exam,index)=>{


        let today = new Date();

        let examDay = new Date(exam.date);


        let difference = Math.ceil(
            (examDay - today) /
            (1000 * 60 * 60 * 24)
        );


        list.innerHTML += `

        <div class="exam-card">

            <h3>📚 ${exam.subject}</h3>

            <p>📅 Date: ${exam.date}</p>

            <p class="exam-status">
                Status: ${exam.status}
            </p>

            <p>
                ⏳ ${difference > 0 ? difference + " days left" : "Exam day reached"}
            </p>


            <button onclick="deleteExam(${index})">
                🗑️ Delete
            </button>

        </div>

        `;

    });

}



// Delete Exam

function deleteExam(index){

    exams.splice(index,1);

    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );


    displayExams();

}



// Load Exams

displayExams();
/* Assignment Manager */

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];


// Add Assignment

function addAssignment(){

    let subject = document.getElementById("assignmentSubject").value;
    let task = document.getElementById("assignmentTask").value;
    let date = document.getElementById("assignmentDate").value;


    if(subject === "" || task === ""){

        alert("Please enter subject and assignment!");

        return;

    }


    let assignment = {

        subject: subject,
        task: task,
        date: date,
        completed: false

    };


    assignments.push(assignment);


    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );


    document.getElementById("assignmentSubject").value = "";
    document.getElementById("assignmentTask").value = "";
    document.getElementById("assignmentDate").value = "";


    displayAssignments();

}



// Display Assignments

function displayAssignments(){

    let list = document.getElementById("assignmentList");

    list.innerHTML = "";


    assignments.forEach((item,index)=>{


        list.innerHTML += `

        <div class="assignment-card ${item.completed ? "completed" : ""}">


            <h3>📚 ${item.subject}</h3>


            <p>📝 ${item.task}</p>


            <p>📅 Due: ${item.date}</p>



            <button class="complete-btn" onclick="completeAssignment(${index})">

                ✅ Complete

            </button>


            <button class="delete-btn" onclick="deleteAssignment(${index})">

                🗑️ Delete

            </button>


        </div>

        `;


    });


}



// Complete Assignment

function completeAssignment(index){

    assignments[index].completed =
        !assignments[index].completed;


    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );


    displayAssignments();

}



// Delete Assignment

function deleteAssignment(index){

    assignments.splice(index,1);


    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );


    displayAssignments();

}



// Load Assignments

displayAssignments();

/* School Bag Checker */

let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];


// Add Item

function addBagItem(){

    let item = document.getElementById("bagItem").value;


    if(item === ""){

        alert("Please enter an item!");

        return;

    }


    bagItems.push({

        name: item,
        checked: false

    });


    localStorage.setItem(
        "bagItems",
        JSON.stringify(bagItems)
    );


    document.getElementById("bagItem").value = "";


    displayBagItems();

}



// Display Items

function displayBagItems(){

    let list = document.getElementById("bagList");

    list.innerHTML = "";


    bagItems.forEach((item,index)=>{


        list.innerHTML += `

        <div class="bag-item ${item.checked ? "checked" : ""}">


            <div>

            <input 
            type="checkbox"
            ${item.checked ? "checked" : ""}
            onclick="checkBagItem(${index})">

            ${item.name}

            </div>



            <button onclick="deleteBagItem(${index})">

            🗑️

            </button>


        </div>

        `;


    });


    updateBagProgress();

}



// Check Item

function checkBagItem(index){

    bagItems[index].checked =
        !bagItems[index].checked;


    localStorage.setItem(
        "bagItems",
        JSON.stringify(bagItems)
    );


    displayBagItems();

}



// Delete Item

function deleteBagItem(index){

    bagItems.splice(index,1);


    localStorage.setItem(
        "bagItems",
        JSON.stringify(bagItems)
    );


    displayBagItems();

}



// Update Progress

function updateBagProgress(){

    let total = bagItems.length;

    let checked = bagItems.filter(
        item => item.checked
    ).length;


    let percent = 0;


    if(total > 0){

        percent = Math.round(
            (checked / total) * 100
        );

    }


    document.getElementById("bagProgressFill").style.width =
        percent + "%";


    document.getElementById("bagProgressText").innerHTML =
        percent + "% Packed";

}



// Load Items

displayBagItems();
/* Study Notifications Center */

let notifications = JSON.parse(localStorage.getItem("notifications")) || [];


// Add Notification

function addNotification(){

    let text = document.getElementById("notificationText").value;


    if(text === ""){

        alert("Please enter a reminder!");

        return;

    }


    notifications.push({

        text: text,
        read: false,
        date: new Date().toLocaleDateString()

    });


    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );


    document.getElementById("notificationText").value = "";


    displayNotifications();

}



// Display Notifications

function displayNotifications(){

    let list = document.getElementById("notificationList");

    list.innerHTML = "";


    notifications.forEach((item,index)=>{


        list.innerHTML += `

        <div class="notification-card ${item.read ? "read" : ""}">


            <div>

                🔔 ${item.text}

                <br>

                <small>
                ${item.date}
                </small>

            </div>



            <div>


                <button class="read-btn"
                onclick="readNotification(${index})">

                ✓

                </button>



                <button class="delete-btn"
                onclick="deleteNotification(${index})">

                🗑️

                </button>


            </div>


        </div>

        `;


    });


}



// Mark as Read

function readNotification(index){

    notifications[index].read =
        !notifications[index].read;


    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );


    displayNotifications();

}



// Delete Notification

function deleteNotification(index){

    notifications.splice(index,1);


    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );


    displayNotifications();

}



// Load Notifications

displayNotifications();

/* Student Profile & Achievement Center */


let studentData = JSON.parse(localStorage.getItem("studentData")) || {

    name: "Abdullah",
    class: 5,
    points: 0

};



// Update Profile Display

function updateStudentProfile(){

    document.getElementById("studentName").innerHTML =
        studentData.name;


    document.getElementById("studentClass").innerHTML =
        studentData.class;


    document.getElementById("studentPoints").innerHTML =
        studentData.points;



    let level = "Beginner";


    if(studentData.points >= 100){

        level = "Learner";

    }


    if(studentData.points >= 250){

        level = "Explorer";

    }


    if(studentData.points >= 500){

        level = "Study Master";

    }


    document.getElementById("studentLevel").innerHTML =
        level;

}



// Add Points Function

function addStudyPoints(amount){

    studentData.points += amount;


    localStorage.setItem(
        "studentData",
        JSON.stringify(studentData)
    );


    updateStudentProfile();

}



// Example achievements points

function assignmentCompleted(){

    addStudyPoints(10);

}


function examPrepared(){

    addStudyPoints(20);

}


function studySessionCompleted(){

    addStudyPoints(5);

}



// Load Profile

updateStudentProfile();

/* Unit Converter */


function convertUnit(){

    let value = Number(
        document.getElementById("convertValue").value
    );


    let type = document.getElementById("unitType").value;

    let result = "";


    if(value === ""){

        alert("Enter a value!");

        return;

    }


    switch(type){


        case "km":

            result = value * 1000 + " meters";

            break;



        case "m":

            result = value * 100 + " centimeters";

            break;



        case "kg":

            result = value * 1000 + " grams";

            break;



        case "l":

            result = value * 1000 + " milliliters";

            break;


    }


    document.getElementById("conversionResult").innerHTML =
        "✅ Result: " + result;

}




/* Real Calendar */


function createCalendar(){

    let calendar = document.getElementById("calendarGrid");

    let monthTitle = document.getElementById("calendarMonth");


    let date = new Date();


    let year = date.getFullYear();

    let month = date.getMonth();


    let monthName = date.toLocaleString(
        "default",
        {
            month:"long"
        }
    );


    monthTitle.innerHTML =
        monthName + " " + year;



    calendar.innerHTML = "";



    let days = [

        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"

    ];



    days.forEach(day=>{

        calendar.innerHTML +=
        `<div class="day-name">${day}</div>`;

    });



    let firstDay = new Date(
        year,
        month,
        1
    ).getDay();



    let totalDays = new Date(
        year,
        month + 1,
        0
    ).getDate();



    for(let i=0;i<firstDay;i++){

        calendar.innerHTML += "<div></div>";

    }



    for(let day=1;day<=totalDays;day++){


        let todayClass = "";


        if(
            day === date.getDate()
        ){

            todayClass="today";

        }



        calendar.innerHTML +=

        `<div class="${todayClass}">
            ${day}
        </div>`;


    }

}



createCalendar();
// ==========================
// CALCULATOR
// ==========================

const calcDisplay =
document.getElementById("calcDisplay");

function appendValue(value){

    calcDisplay.value += value;

}

function clearCalc(){

    calcDisplay.value = "";

}

function backspace(){

    calcDisplay.value =
    calcDisplay.value.slice(0,-1);

}

function calculate(){

    try{

        calcDisplay.value =
        eval(calcDisplay.value);

    }

    catch{

        calcDisplay.value =
        "Error";

    }

}
// ==========================
// UNIT CONVERTER
// ==========================

const converterType=document.getElementById("converterType");
const fromUnit=document.getElementById("fromUnit");
const toUnit=document.getElementById("toUnit");
const converterValue=document.getElementById("converterValue");
const converterResult=document.getElementById("converterResult");
const convertBtn=document.getElementById("convertBtn");

const units={

length:["cm","m","km"],

weight:["g","kg"],

temperature:["C","F"],

time:["seconds","minutes","hours"]

};

function loadUnits(){

    const type=converterType.value;

    fromUnit.innerHTML="";
    toUnit.innerHTML="";

    units[type].forEach(unit=>{

        fromUnit.innerHTML+=
        `<option>${unit}</option>`;

        toUnit.innerHTML+=
        `<option>${unit}</option>`;

    });

}

converterType.onchange=loadUnits;

loadUnits();

convertBtn.onclick=function(){

    let value=Number(converterValue.value);

    let result=value;

    const from=fromUnit.value;
    const to=toUnit.value;

    if(converterType.value==="length"){

        const map={cm:1,m:100,km:100000};

        result=value*map[from]/map[to];

    }

    else if(converterType.value==="weight"){

        const map={g:1,kg:1000};

        result=value*map[from]/map[to];

    }

    else if(converterType.value==="time"){

        const map={seconds:1,minutes:60,hours:3600};

        result=value*map[from]/map[to];

    }

    else if(converterType.value==="temperature"){

        if(from==="C" && to==="F")

            result=(value*9/5)+32;

        else if(from==="F" && to==="C")

            result=(value-32)*5/9;

    }

    converterResult.textContent=

    `Result: ${result.toFixed(2)} ${to}`;

};
// ==========================
// PERCENTAGE CALCULATOR
// ==========================

const percentType =
document.getElementById("percentType");

const percentNum1 =
document.getElementById("percentNum1");

const percentNum2 =
document.getElementById("percentNum2");

const calculatePercent =
document.getElementById("calculatePercent");

const percentAnswer =
document.getElementById("percentAnswer");

calculatePercent.onclick = function(){

    const a = Number(percentNum1.value);
    const b = Number(percentNum2.value);

    let result = 0;

    switch(percentType.value){

        case "of":

            result = (a/100)*b;

            percentAnswer.textContent =
            `${a}% of ${b} = ${result.toFixed(2)}`;

        break;

        case "is":

            result = (a/b)*100;

            percentAnswer.textContent =
            `${a} is ${result.toFixed(2)}% of ${b}`;

        break;

        case "increase":

            result = ((b-a)/a)*100;

            percentAnswer.textContent =
            `Increase = ${result.toFixed(2)}%`;

        break;

        case "marks":

            result = (a/b)*100;

            percentAnswer.textContent =
            `Marks = ${result.toFixed(2)}%`;

        break;

    }

};
// ==========================
// AGE CALCULATOR
// ==========================

const birthDate = document.getElementById("birthDate");
const calculateAge = document.getElementById("calculateAge");

const ageYears = document.getElementById("ageYears");
const ageMonths = document.getElementById("ageMonths");
const ageDays = document.getElementById("ageDays");

if(calculateAge){

    calculateAge.onclick = function(){

        if(!birthDate.value){

            alert("Please select your birth date.");

            return;

        }

        const birth = new Date(birthDate.value);
        const today = new Date();

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if(days < 0){

            months--;

            const previousMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );

            days += previousMonth.getDate();

        }

        if(months < 0){

            years--;
            months += 12;

        }

        ageYears.textContent = "🎂 Years: " + years;
        ageMonths.textContent = "📅 Months: " + months;
        ageDays.textContent = "☀️ Days: " + days;

    };

}
// ==========================
// WORD COUNTER
// ==========================

const wordInput=document.getElementById("wordInput");

const wordCount=document.getElementById("wordCount");
const charCount=document.getElementById("charCount");
const charNoSpace=document.getElementById("charNoSpace");
const sentenceCount=document.getElementById("sentenceCount");
const paragraphCount=document.getElementById("paragraphCount");
const readingTime=document.getElementById("readingTime");

if(wordInput){

function updateCounter(){

    const text=wordInput.value;

    const words=text.trim()===""
    ?0
    :text.trim().split(/\s+/).length;

    const chars=text.length;

    const noSpaces=text.replace(/\s/g,"").length;

    const sentences=text.trim()===""
    ?0
    :text.split(/[.!?]+/).filter(s=>s.trim()!=="").length;

    const paragraphs=text.trim()===""
    ?0
    :text.split(/\n+/).filter(p=>p.trim()!=="").length;

    const minutes=Math.max(1,Math.ceil(words/200));

    wordCount.textContent=words;
    charCount.textContent=chars;
    charNoSpace.textContent=noSpaces;
    sentenceCount.textContent=sentences;
    paragraphCount.textContent=paragraphs;
    readingTime.textContent=minutes+" min";

}

wordInput.addEventListener("input",updateCounter);

updateCounter();

document.getElementById("uppercaseBtn").onclick=function(){

    wordInput.value=wordInput.value.toUpperCase();
    updateCounter();

};

document.getElementById("lowercaseBtn").onclick=function(){

    wordInput.value=wordInput.value.toLowerCase();
    updateCounter();

};

document.getElementById("titlecaseBtn").onclick=function(){

    wordInput.value=wordInput.value.replace(
        /\w\S*/g,
        txt=>txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()
    );

    updateCounter();

};

document.getElementById("copyTextBtn").onclick=function(){

    navigator.clipboard.writeText(wordInput.value);

    alert("Text copied!");

};

document.getElementById("clearTextBtn").onclick=function(){

    if(confirm("Clear all text?")){

        wordInput.value="";
        updateCounter();

    }

};

}
// ==========================
// GEOMETRY CALCULATOR
// ==========================

const shapeSelect=document.getElementById("shapeSelect");
const geometryInputs=document.getElementById("geometryInputs");

const geometryArea=document.getElementById("geometryArea");
const geometryPerimeter=document.getElementById("geometryPerimeter");

function loadGeometryInputs(){

    let html="";

    switch(shapeSelect.value){

        case "square":

            html=`
            <input type="number"
            id="side"
            placeholder="Side Length">
            `;
        break;

        case "rectangle":

            html=`
            <input type="number"
            id="length"
            placeholder="Length">

            <input type="number"
            id="width"
            placeholder="Width">
            `;
        break;

        case "circle":

            html=`
            <input type="number"
            id="radius"
            placeholder="Radius">
            `;
        break;

        case "triangle":

            html=`
            <input type="number"
            id="base"
            placeholder="Base">

            <input type="number"
            id="height"
            placeholder="Height">

            <input type="number"
            id="side1"
            placeholder="Side 1">

            <input type="number"
            id="side2"
            placeholder="Side 2">
            `;
        break;

    }

    geometryInputs.innerHTML=html;

}

shapeSelect.onchange=loadGeometryInputs;

loadGeometryInputs();

document.getElementById("calculateGeometry").onclick=function(){

    let area=0;
    let perimeter=0;

    switch(shapeSelect.value){

        case "square":

            const side=Number(document.getElementById("side").value);

            area=side*side;
            perimeter=4*side;

        break;

        case "rectangle":

            const length=Number(document.getElementById("length").value);
            const width=Number(document.getElementById("width").value);

            area=length*width;
            perimeter=2*(length+width);

        break;

        case "circle":

            const radius=Number(document.getElementById("radius").value);

            area=Math.PI*radius*radius;
            perimeter=2*Math.PI*radius;

        break;

        case "triangle":

            const base=Number(document.getElementById("base").value);
            const height=Number(document.getElementById("height").value);
            const side1=Number(document.getElementById("side1").value);
            const side2=Number(document.getElementById("side2").value);

            area=(base*height)/2;
            perimeter=base+side1+side2;

        break;

    }

    geometryArea.textContent=
    "📐 Area: "+area.toFixed(2);

    geometryPerimeter.textContent=
    "📏 Perimeter: "+perimeter.toFixed(2);

};
// ==========================
// GRADE CALCULATOR
// ==========================

const calculateGrade=document.getElementById("calculateGrade");

calculateGrade.onclick=function(){

    const marks=[

        Number(document.getElementById("englishMark").value),
        Number(document.getElementById("mathMark").value),
        Number(document.getElementById("scienceMark").value),
        Number(document.getElementById("bgsMark").value),
        Number(document.getElementById("islamMark").value),
        Number(document.getElementById("ictMark").value)

    ];

    if(marks.some(mark=>isNaN(mark)||mark<0||mark>100)){

        alert("Please enter marks between 0 and 100 for every subject.");

        return;

    }

    const total=marks.reduce((sum,mark)=>sum+mark,0);

    const average=total/marks.length;

    const highest=Math.max(...marks);

    const lowest=Math.min(...marks);

    let grade="";

    if(average>=80){

        grade="🟢 A+";

    }

    else if(average>=70){

        grade="🔵 A";

    }

    else if(average>=60){

        grade="🟣 A-";

    }

    else if(average>=50){

        grade="🟡 B";

    }

    else if(average>=40){

        grade="🟠 C";

    }

    else{

        grade="🔴 F";

    }

    document.getElementById("averageResult").textContent=
    "Average: "+average.toFixed(2)+"%";

    document.getElementById("highestMark").textContent=
    "Highest Mark: "+highest;

    document.getElementById("lowestMark").textContent=
    "Lowest Mark: "+lowest;

    document.getElementById("finalGrade").textContent=
    "Final Grade: "+grade;

};
//==========================
// DICTIONARY
//==========================

const dictionaryInput=document.getElementById("dictionaryInput");
const searchWord=document.getElementById("searchWord");

const wordTitle=document.getElementById("wordTitle");
const phonetic=document.getElementById("phonetic");
const partOfSpeech=document.getElementById("partOfSpeech");
const definition=document.getElementById("definition");
const example=document.getElementById("example");

const playAudio=document.getElementById("playAudio");

let audioURL="";

if(searchWord){

searchWord.onclick=async function(){

    const word=dictionaryInput.value.trim();

    if(word==="") return;

    try{

        const response=await fetch(

        "https://api.dictionaryapi.dev/api/v2/entries/en/"+word

        );

        const data=await response.json();

        const item=data[0];

        wordTitle.textContent=item.word;

        phonetic.textContent=item.phonetic || "No pronunciation";

        partOfSpeech.textContent=item.meanings[0].partOfSpeech;

        definition.textContent=item.meanings[0].definitions[0].definition;

        example.textContent=

        item.meanings[0].definitions[0].example ||

        "No example available.";

        audioURL="";

        if(item.phonetics){

            for(let p of item.phonetics){

                if(p.audio){

                    audioURL=p.audio;

                    break;

                }

            }

        }

    }

    catch{

        wordTitle.textContent="Word Not Found";

        phonetic.textContent="";

        partOfSpeech.textContent="";

        definition.textContent="Please check the spelling.";

        example.textContent="";

    }

};

playAudio.onclick=function(){

    if(audioURL){

        new Audio(audioURL).play();

    }

    else{

        alert("Pronunciation not available.");

    }

};

}
function completeMission() {
    let tasks = document.querySelectorAll(".mission-task input");
    let completed = 0;

    tasks.forEach(task => {
        if(task.checked){
            completed++;
        }
    });

    if(completed === tasks.length){
        document.getElementById("missionReward").innerHTML =
        "🎉 Mission Complete! +50 XP 🏆";
    }
    else{
        document.getElementById("missionReward").innerHTML =
        "⭐ Complete all tasks to earn the reward!";
    }
}
