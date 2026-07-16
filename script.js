








// ==========================
// HERO CLOCK & GREETING
// ==========================

function updateHero(){

    const now = new Date();

    const hours = now.getHours();

    const greeting = document.getElementById("greeting");

    const clock = document.getElementById("clock");

    const date = document.getElementById("date");

    if(greeting){

        if(hours < 12){

            greeting.innerHTML = "☀️ Good Morning, Abdullah";

        }

        else if(hours < 18){

            greeting.innerHTML = "🌤️ Good Afternoon, Abdullah";

        }

        else{

            greeting.innerHTML = "🌙 Good Evening, Abdullah";

        }

    }

    if(clock){

        clock.textContent = now.toLocaleTimeString();

    }

    if(date){

        date.textContent = now.toDateString();

    }

}

setInterval(updateHero,1000);

updateHero();

// ==========================
// WATER TRACKER
// ==========================

const GOAL = 8;

let water = Number(localStorage.getItem("water")) || 0;

const count = document.getElementById("waterCount");
const percent = document.getElementById("waterPercent");
const fill = document.getElementById("progressFill");
const addWater = document.getElementById("addWater");
const removeWater = document.getElementById("removeWater");

if (count && percent && fill && addWater && removeWater) {

    function updateWater() {

        const progress = (water / GOAL) * 100;

        count.textContent = `${water} / ${GOAL}`;

        percent.textContent = `${Math.round(progress)}%`;

        fill.style.width = progress + "%";

        localStorage.setItem("water", water);

    }

    addWater.addEventListener("click", function () {

        if (water < GOAL) {

            water++;

            updateWater();

        }

    });

    removeWater.addEventListener("click", function () {

        if (water > 0) {

            water--;

            updateWater();

        }

    });

    updateWater();

}
// ==========================
// SLEEP TRACKER
// ==========================

const bedTime = document.getElementById("bedTime");
const wakeTime = document.getElementById("wakeTime");
const calculateSleep = document.getElementById("calculateSleep");
const sleepResult = document.getElementById("sleepResult");
const sleepQuality = document.getElementById("sleepQuality");

if (
    bedTime &&
    wakeTime &&
    calculateSleep &&
    sleepResult &&
    sleepQuality
) {

    // Load saved values
    bedTime.value = localStorage.getItem("bedTime") || "";
    wakeTime.value = localStorage.getItem("wakeTime") || "";

    calculateSleep.addEventListener("click", function () {

        if (!bedTime.value || !wakeTime.value) {

            alert("Please enter both times.");

            return;

        }

        localStorage.setItem("bedTime", bedTime.value);
        localStorage.setItem("wakeTime", wakeTime.value);

        let start = new Date("2000-01-01 " + bedTime.value);
        let end = new Date("2000-01-01 " + wakeTime.value);

        if (end < start) {

            end.setDate(end.getDate() + 1);

        }

        const diff = end - start;

        const hours = Math.floor(diff / 1000 / 60 / 60);

        const minutes = Math.floor((diff / 1000 / 60) % 60);

        sleepResult.textContent =
            `Sleep: ${hours}h ${minutes}m`;

        if (hours >= 8) {

            sleepQuality.textContent = "🌟 Excellent";

        }

        else if (hours >= 7) {

            sleepQuality.textContent = "😊 Good";

        }

        else if (hours >= 6) {

            sleepQuality.textContent = "😐 Fair";

        }

        else {

            sleepQuality.textContent = "😴 Poor";

        }

    });

}
// ==========================
// MOOD TRACKER
// ==========================

const moodButtons = document.querySelectorAll(".mood-btn");
const selectedMood = document.getElementById("selectedMood");

if (moodButtons.length > 0 && selectedMood) {

    const savedMood = localStorage.getItem("mood");

    if (savedMood) {

        selectedMood.textContent = "Today's Mood: " + savedMood;

        moodButtons.forEach(button => {

            if (button.dataset.mood === savedMood) {

                button.classList.add("active");

            }

        });

    }

    moodButtons.forEach(button => {

        button.addEventListener("click", function () {

            moodButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            this.classList.add("active");

            const mood = this.dataset.mood;

            selectedMood.textContent = "Today's Mood: " + mood;

            localStorage.setItem("mood", mood);

        });

    });

}
// ==========================
// STEP TRACKER
// ==========================

const STEP_GOAL = 10000;

let steps = Number(localStorage.getItem("steps")) || 0;

const stepCount = document.getElementById("stepCount");
const stepProgress = document.getElementById("stepProgress");
const stepPercent = document.getElementById("stepPercent");

const add100 = document.getElementById("add100");
const remove100 = document.getElementById("remove100");
const resetSteps = document.getElementById("resetSteps");

if(stepCount && stepProgress && stepPercent){

    function updateSteps(){

        stepCount.textContent = steps.toLocaleString();

        const progress = Math.min((steps / STEP_GOAL) * 100, 100);

        stepProgress.style.width = progress + "%";

        stepPercent.textContent =
            Math.round(progress) + "% of 10,000";

        localStorage.setItem("steps", steps);

    }

    add100.onclick = function(){

        steps += 100;

        updateSteps();

    };

    remove100.onclick = function(){

        if(steps >= 100){

            steps -= 100;

            updateSteps();

        }

    };

    resetSteps.onclick = function(){

        steps = 0;

        updateSteps();

    };

    updateSteps();

}
// ==========================
// HEALTHY EATING
// ==========================

const mealIds = [
    "breakfast",
    "lunch",
    "dinner",
    "snacks"
];

let fruit = Number(localStorage.getItem("fruit")) || 0;
let veg = Number(localStorage.getItem("veg")) || 0;
let protein = Number(localStorage.getItem("protein")) || 0;

function updateFood(){

    document.getElementById("fruitCount").textContent = fruit;
    document.getElementById("vegCount").textContent = veg;
    document.getElementById("proteinCount").textContent = protein;

    localStorage.setItem("fruit",fruit);
    localStorage.setItem("veg",veg);
    localStorage.setItem("protein",protein);

    let score = 0;

    mealIds.forEach(id=>{

        const box=document.getElementById(id);

        if(box.checked){

            score+=10;

        }

    });

    score += fruit*5;
    score += veg*5;
    score += protein*5;

    if(score>100) score=100;

    document.getElementById("nutritionScore").textContent=score+"%";

    document.getElementById("nutritionBar").style.width=score+"%";

}

["fruit","veg","protein"].forEach(type=>{

    document.getElementById(type+"Plus").onclick=function(){

        if(type==="fruit") fruit++;
        if(type==="veg") veg++;
        if(type==="protein") protein++;

        updateFood();

    };

    document.getElementById(type+"Minus").onclick=function(){

        if(type==="fruit" && fruit>0) fruit--;
        if(type==="veg" && veg>0) veg--;
        if(type==="protein" && protein>0) protein--;

        updateFood();

    };

});

mealIds.forEach(id=>{

    const box=document.getElementById(id);

    box.checked = localStorage.getItem(id) === "true";

    box.onchange=function(){

        localStorage.setItem(id,box.checked);

        updateFood();

    };

});

updateFood();
// ==========================
// EXERCISE LOG
// ==========================

const GOAL_MINUTES = 60;

const exerciseType = document.getElementById("exerciseType");
const exerciseMinutes = document.getElementById("exerciseMinutes");
const saveExercise = document.getElementById("saveExercise");
const exerciseList = document.getElementById("exerciseList");
const exerciseTotal = document.getElementById("exerciseTotal");
const exerciseProgress = document.getElementById("exerciseProgress");

if(
    exerciseType &&
    exerciseMinutes &&
    saveExercise &&
    exerciseList &&
    exerciseTotal &&
    exerciseProgress
){

    let exercises =
        JSON.parse(localStorage.getItem("exerciseLog")) || [];

    function renderExercises(){

        exerciseList.innerHTML = "";

        let total = 0;

        exercises.forEach((exercise,index)=>{

            total += exercise.minutes;

            const li = document.createElement("li");

            li.innerHTML = `
                <span>${exercise.type} - ${exercise.minutes} min</span>
                <button class="deleteExercise" data-index="${index}">
                    🗑️
                </button>
            `;

            exerciseList.appendChild(li);

        });

        const progress =
            Math.min((total/GOAL_MINUTES)*100,100);

        exerciseProgress.style.width =
            progress + "%";

        exerciseTotal.textContent =
            `Total Today: ${total} / ${GOAL_MINUTES} Minutes`;

        localStorage.setItem(
            "exerciseLog",
            JSON.stringify(exercises)
        );

        document.querySelectorAll(".deleteExercise")
        .forEach(button=>{

            button.onclick=function(){

                exercises.splice(this.dataset.index,1);

                renderExercises();

            };

        });

    }

    saveExercise.onclick=function(){

        const minutes =
            parseInt(exerciseMinutes.value);

        if(!minutes || minutes<=0){

            alert("Enter valid minutes.");

            return;

        }

        exercises.push({

            type:exerciseType.value,

            minutes:minutes

        });

        exerciseMinutes.value="";

        renderExercises();

    };

    renderExercises();

}
// ==========================
// BMI CALCULATOR
// ==========================

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiButton = document.getElementById("calculateBMI");
const bmiValue = document.getElementById("bmiValue");
const bmiStatus = document.getElementById("bmiStatus");

if (
    heightInput &&
    weightInput &&
    bmiButton &&
    bmiValue &&
    bmiStatus
) {

    // Load saved values
    heightInput.value = localStorage.getItem("height") || "";
    weightInput.value = localStorage.getItem("weight") || "";

    bmiButton.addEventListener("click", function () {

        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (!height || !weight) {

            alert("Please enter both height and weight.");

            return;

        }

        localStorage.setItem("height", height);
        localStorage.setItem("weight", weight);

        const bmi = weight / ((height / 100) * (height / 100));

        bmiValue.textContent = bmi.toFixed(1);

        if (bmi < 18.5) {

            bmiStatus.textContent = "🟡 Underweight";

        }

        else if (bmi < 25) {

            bmiStatus.textContent = "🟢 Healthy Weight";

        }

        else if (bmi < 30) {

            bmiStatus.textContent = "🟠 Overweight";

        }

        else {

            bmiStatus.textContent = "🔴 Obesity";

        }

    });

}
// ==========================
// HABIT TRACKER
// ==========================

const habitInput = document.getElementById("habitText");
const addHabit = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");
const habitProgress = document.getElementById("habitProgress");
const habitPercent = document.getElementById("habitPercent");

if (habitInput && addHabit && habitList) {

    let habits =
        JSON.parse(localStorage.getItem("habits")) || [];

    function saveHabits() {

        localStorage.setItem(
            "habits",
            JSON.stringify(habits)
        );

    }

    function renderHabits() {

        habitList.innerHTML = "";

        let completed = 0;

        habits.forEach((habit, index) => {

            if (habit.done) {

                completed++;

            }

            const li = document.createElement("li");

            li.innerHTML = `

                <div class="habit-left">

                    <input
                        type="checkbox"
                        ${habit.done ? "checked" : ""}
                        data-index="${index}"
                        class="habitCheck">

                    <span>${habit.name}</span>

                </div>

                <button
                    class="deleteHabit"
                    data-index="${index}">
                    Delete
                </button>

            `;

            habitList.appendChild(li);

        });

        const percent =
            habits.length === 0
                ? 0
                : Math.round((completed / habits.length) * 100);

        habitProgress.style.width =
            percent + "%";

        habitPercent.textContent =
            percent + "% Completed";

        saveHabits();

        document
            .querySelectorAll(".habitCheck")
            .forEach(box => {

                box.onchange = function () {

                    habits[this.dataset.index].done =
                        this.checked;

                    renderHabits();

                };

            });

        document
            .querySelectorAll(".deleteHabit")
            .forEach(btn => {

                btn.onclick = function () {

                    habits.splice(
                        this.dataset.index,
                        1
                    );

                    renderHabits();

                };

            });

    }

    addHabit.onclick = function () {

        if (habitInput.value.trim() == "") return;

        habits.push({

            name: habitInput.value,

            done: false

        });

        habitInput.value = "";

        renderHabits();

    };

    renderHabits();

}
// ==========================
// WEEKLY HABIT TRACKER
// ==========================

const habitChecks = document.querySelectorAll(".habit-check");
const habitBar = document.getElementById("habitBar");
const weeklyhabitPercent = document.getElementById("habitPercent");

if(habitChecks.length > 0){

    // Load saved data
    habitChecks.forEach((check,index)=>{

        const saved =
        localStorage.getItem("habitCheck"+index);

        if(saved==="true"){

            check.checked=true;

        }

    });

    function updateHabits(){

        let completed = 0;

        habitChecks.forEach((check,index)=>{

            if(check.checked){

                completed++;

            }

            localStorage.setItem(
                "habitCheck"+index,
                check.checked
            );

        });

        const total = habitChecks.length;

        const percent =
        Math.round((completed / total) * 100);

        habitBar.style.width =
        percent + "%";

        habitPercent.textContent =
        "Weekly Progress: " +
        percent + "% (" +
        completed + "/" +
        total + ")";

    }

    habitChecks.forEach(check=>{

        check.addEventListener(
            "change",
            updateHabits
        );

    });

    updateHabits();

}
// ==========================
// SHOPPING LIST
// ==========================

const shoppingInput = document.getElementById("shoppingInput");
const addItemBtn = document.getElementById("addItemBtn");
const shoppingList = document.getElementById("shoppingList");
const shoppingBar = document.getElementById("shoppingBar");
const shoppingProgress = document.getElementById("shoppingProgress");

if (
    shoppingInput &&
    addItemBtn &&
    shoppingList &&
    shoppingBar &&
    shoppingProgress
) {

    let shoppingItems =
        JSON.parse(localStorage.getItem("shoppingItems")) || [];

    function saveShopping() {

        localStorage.setItem(
            "shoppingItems",
            JSON.stringify(shoppingItems)
        );

    }

    function renderShopping() {

        shoppingList.innerHTML = "";

        let bought = 0;

        shoppingItems.forEach((item, index) => {

            if (item.done) bought++;

            const li = document.createElement("li");

            li.innerHTML = `

                <div class="shopping-left">

                    <input
                        type="checkbox"
                        class="shoppingCheck"
                        data-index="${index}"
                        ${item.done ? "checked" : ""}
                    >

                    <span class="${item.done ? "done" : ""}">
                        ${item.name}
                    </span>

                </div>

                <button
                    class="deleteItem"
                    data-index="${index}">
                    🗑️
                </button>

            `;

            shoppingList.appendChild(li);

        });

        const total = shoppingItems.length;

        const percent =
            total === 0
            ? 0
            : Math.round((bought / total) * 100);

        shoppingBar.style.width = percent + "%";

        shoppingProgress.textContent =
            percent + "% Purchased (" +
            bought + "/" +
            total + ")";

        saveShopping();

        document.querySelectorAll(".shoppingCheck")
        .forEach(box => {

            box.onchange = function () {

                shoppingItems[this.dataset.index].done =
                    this.checked;

                renderShopping();

            };

        });

        document.querySelectorAll(".deleteItem")
        .forEach(button => {

            button.onclick = function () {

                shoppingItems.splice(
                    this.dataset.index,
                    1
                );

                renderShopping();

            };

        });

    }

    function addShoppingItem() {

        const text = shoppingInput.value.trim();

        if (text === "") return;

        shoppingItems.push({

            name: text,

            done: false

        });

        shoppingInput.value = "";

        renderShopping();

    }

    addItemBtn.onclick = addShoppingItem;

    shoppingInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            addShoppingItem();

        }

    });

    renderShopping();

}
/* Real Prayer Times */


async function loadPrayerTimes(){

    try {

        // Bangladesh coordinates (Dhaka area)
        let latitude = 23.8103;
        let longitude = 90.4125;


        let response = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );


        let data = await response.json();


        let timings = data.data.timings;


        document.getElementById("prayerLocation").innerHTML =
            "📍 Dhaka, Bangladesh";


        document.getElementById("fajr").innerHTML =
            timings.Fajr;


        document.getElementById("dhuhr").innerHTML =
            timings.Dhuhr;


        document.getElementById("asr").innerHTML =
            timings.Asr;


        document.getElementById("maghrib").innerHTML =
            timings.Maghrib;


        document.getElementById("isha").innerHTML =
            timings.Isha;


    }


    catch(error){

        document.getElementById("prayerLocation").innerHTML =
            "⚠️ Unable to load prayer times";

        console.log(error);

    }

}



// Load automatically

loadPrayerTimes();
// ==========================
// DIGITAL TASBIH
// ==========================

const tasbihCount = document.getElementById("tasbihCount");
const tasbihPlus = document.getElementById("tasbihPlus");
const tasbihMinus = document.getElementById("tasbihMinus");
const tasbihReset = document.getElementById("tasbihReset");

if(tasbihCount && tasbihPlus && tasbihMinus && tasbihReset){

    let tasbih = Number(localStorage.getItem("tasbihCount")) || 0;

    function updateTasbih(){

        tasbihCount.textContent = tasbih;

        localStorage.setItem("tasbihCount", tasbih);

        // Small Animation

        tasbihCount.style.transform = "scale(1.1)";

        setTimeout(function(){

            tasbihCount.style.transform = "scale(1)";

        },150);

    }

    // Increase

    tasbihPlus.onclick = function(){

        tasbih++;

        updateTasbih();

    };

    // Decrease

    tasbihMinus.onclick = function(){

        if(tasbih > 0){

            tasbih--;

            updateTasbih();

        }

    };

    // Reset

    tasbihReset.onclick = function(){

        if(confirm("Reset the Tasbih counter?")){

            tasbih = 0;

            updateTasbih();

        }

    };

    updateTasbih();

}
// ==========================
// DAILY GOOD DEEDS
// ==========================

const deeds = document.querySelectorAll(".deed");

const deedFill = document.getElementById("deedFill");

const deedPercent = document.getElementById("deedPercent");

if(deeds.length){

    // Load saved data

    deeds.forEach((box,index)=>{

        box.checked =
        localStorage.getItem("deed"+index) === "true";

    });

    function updateDeeds(){

        let completed = 0;

        deeds.forEach((box,index)=>{

            if(box.checked){

                completed++;

            }

            localStorage.setItem(
                "deed"+index,
                box.checked
            );

        });

        const percent =
        Math.round((completed/deeds.length)*100);

        deedFill.style.width =
        percent + "%";

        deedPercent.textContent =
        percent + "% Completed";

        if(percent===100){

            deedPercent.textContent =
            "🌟 MashaAllah! All Daily Deeds Completed!";

        }

    }

    deeds.forEach(box=>{

        box.addEventListener("change",updateDeeds);

    });

    updateDeeds();

}
// ==========================
// DAILY QURAN
// ==========================

const arabicAyah = document.getElementById("arabicAyah");
const englishAyah = document.getElementById("englishAyah");
const surahName = document.getElementById("surahName");

const newAyah = document.getElementById("newAyah");
const copyAyah = document.getElementById("copyAyah");

async function loadAyah(){

    try{

        const ayah =
        Math.floor(Math.random()*6236)+1;

        const response =
        await fetch(
        `https://api.alquran.cloud/v1/ayah/${ayah}/editions/quran-uthmani,en.asad`
        );

        const data =
        await response.json();

        const arabic =
        data.data[0];

        const english =
        data.data[1];

        arabicAyah.textContent =
        arabic.text;

        englishAyah.textContent =
        english.text;

        surahName.textContent =
        arabic.surah.englishName +
        " • Ayah " +
        arabic.numberInSurah;

    }

    catch(error){

        arabicAyah.textContent =
        "Unable to load verse.";

        englishAyah.textContent =
        "";

        surahName.textContent =
        "";

    }

}

if(newAyah){

    newAyah.onclick =
    loadAyah;

}

if(copyAyah){

    copyAyah.onclick=function(){

        navigator.clipboard.writeText(

            arabicAyah.textContent +

            "\n\n" +

            englishAyah.textContent +

            "\n\n" +

            surahName.textContent

        );

        alert("Verse copied!");

    };

}

loadAyah();
// ==========================
// DAILY DUA
// ==========================

const duas = [

{
title:"Before Eating",

arabic:"بِسْمِ اللَّهِ",

transliteration:"Bismillah",

meaning:"In the name of Allah."
},

{
title:"After Eating",

arabic:"الْحَمْدُ لِلَّهِ",

transliteration:"Alhamdulillah",

meaning:"All praise is due to Allah."
},

{
title:"Before Sleeping",

arabic:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",

transliteration:"Bismika Allahumma amootu wa ahyaa.",

meaning:"O Allah, in Your name I die and I live."
},

{
title:"When Waking Up",

arabic:"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا",

transliteration:"Alhamdulillahil-ladhi ahyana.",

meaning:"All praise is for Allah who gave us life after causing us to die."
},

{
title:"Seeking Forgiveness",

arabic:"أَسْتَغْفِرُ اللَّهَ",

transliteration:"Astaghfirullah",

meaning:"I seek forgiveness from Allah."
}

];

const duaTitle = document.getElementById("duaTitle");
const duaArabic = document.getElementById("duaArabic");
const duaTransliteration = document.getElementById("duaTransliteration");
const duaMeaning = document.getElementById("duaMeaning");

const newDua = document.getElementById("newDua");
const copyDua = document.getElementById("copyDua");

function loadDua(){

    const random =
    Math.floor(Math.random()*duas.length);

    const dua = duas[random];

    duaTitle.textContent = dua.title;

    duaArabic.textContent = dua.arabic;

    duaTransliteration.textContent =
    dua.transliteration;

    duaMeaning.textContent =
    dua.meaning;

}

if(newDua){

    newDua.onclick = loadDua;

}

if(copyDua){

    copyDua.onclick = function(){

        navigator.clipboard.writeText(

            duaArabic.textContent +

            "\n\n" +

            duaTransliteration.textContent +

            "\n\n" +

            duaMeaning.textContent

        );

        alert("Dua copied!");

    };

}

loadDua();
// ==========================
// DAILY HADITH
// ==========================

const hadiths = [

{
reference:"Sahih al-Bukhari 5027",

text:"The best among you are those who learn the Qur'an and teach it."
},

{
reference:"Sahih Muslim 2699",

text:"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise."
},

{
reference:"Sahih al-Bukhari 6136",

text:"A smile for your brother is charity."
},

{
reference:"Sahih Muslim 223",

text:"Cleanliness is half of faith."
},

{
reference:"Sahih al-Bukhari 6018",

text:"He who believes in Allah and the Last Day should speak good or remain silent."
},

{
reference:"Sahih Muslim 2553",

text:"Allah is kind and loves kindness in all matters."
}

];

const hadithReference =
document.getElementById("hadithReference");

const hadithText =
document.getElementById("hadithText");

const newHadith =
document.getElementById("newHadith");

const copyHadith =
document.getElementById("copyHadith");

function loadHadith(){

    const random =
    Math.floor(Math.random()*hadiths.length);

    hadithReference.textContent =
    hadiths[random].reference;

    hadithText.textContent =
    hadiths[random].text;

}

if(newHadith){

    newHadith.onclick = loadHadith;

}

if(copyHadith){

    copyHadith.onclick = function(){

        navigator.clipboard.writeText(

            hadithText.textContent +

            "\n\n" +

            hadithReference.textContent

        );

        alert("Hadith copied!");

    };

}

loadHadith();
// ==========================
// LIFE GOALS
// ==========================

const goalInput = document.getElementById("goalInput");
const addGoal = document.getElementById("addGoal");
const goalList = document.getElementById("goalList");

if(goalInput && addGoal && goalList){

    let goals =
    JSON.parse(localStorage.getItem("lifeGoals")) || [];

    function saveGoals(){

        localStorage.setItem(
            "lifeGoals",
            JSON.stringify(goals)
        );

    }

    function renderGoals(){

        goalList.innerHTML = "";

        goals.forEach((goal,index)=>{

            const card = document.createElement("div");

            card.className = "goal";

            card.innerHTML = `

                <h3>${goal.name}</h3>

                <div class="goal-progress">

                    <div class="goal-fill"
                    style="width:${goal.progress}%">

                    </div>

                </div>

                <div class="goal-percent">

                    ${goal.progress}% ${
                        goal.progress===100
                        ? "🏆 Completed!"
                        : ""
                    }

                </div>

                <div class="goal-buttons">

                    <button class="plus">

                        ➕

                    </button>

                    <button class="minus">

                        ➖

                    </button>

                    <button class="delete">

                        🗑️

                    </button>

                </div>

            `;

            // Increase

            card.querySelector(".plus").onclick = function(){

                if(goal.progress < 100){

                    goal.progress += 10;

                    if(goal.progress > 100){

                        goal.progress = 100;

                    }

                    saveGoals();

                    renderGoals();

                }

            };

            // Decrease

            card.querySelector(".minus").onclick = function(){

                if(goal.progress > 0){

                    goal.progress -= 10;

                    if(goal.progress < 0){

                        goal.progress = 0;

                    }

                    saveGoals();

                    renderGoals();

                }

            };

            // Delete

            card.querySelector(".delete").onclick = function(){

                if(confirm("Delete this goal?")){

                    goals.splice(index,1);

                    saveGoals();

                    renderGoals();

                }

            };

            goalList.appendChild(card);

        });

    }

    function createGoal(){

        const text = goalInput.value.trim();

        if(text==="") return;

        goals.push({

            name:text,

            progress:0

        });

        goalInput.value="";

        saveGoals();

        renderGoals();

    }

    addGoal.onclick = createGoal;

    goalInput.addEventListener("keypress",function(e){

        if(e.key==="Enter"){

            createGoal();

        }

    });

    renderGoals();

}
// ==========================
// PERSONAL JOURNAL
// ==========================

const journalTitle = document.getElementById("journalTitle");
const journalText = document.getElementById("journalText");
const saveJournal = document.getElementById("saveJournal");
const journalList = document.getElementById("journalList");

if(journalTitle && journalText && saveJournal && journalList){

    let journals =
    JSON.parse(localStorage.getItem("lifeJournal")) || [];

    function saveJournalData(){

        localStorage.setItem(
            "lifeJournal",
            JSON.stringify(journals)
        );

    }

    function renderJournals(){

        journalList.innerHTML = "";

        if(journals.length===0){

            journalList.innerHTML = `
            <p style="text-align:center;color:#64748b;">
            No journal entries yet.
            </p>
            `;

            return;

        }

        journals.forEach((entry,index)=>{

            const card =
            document.createElement("div");

            card.className = "journal-item";

            card.innerHTML = `

                <h3>${entry.title}</h3>

                <div class="journal-date">

                    📅 ${entry.date}

                </div>

                <div class="journal-content">

                    ${entry.text}

                </div>

                <button class="delete-journal">

                    🗑️ Delete

                </button>

            `;

            card.querySelector(".delete-journal").onclick=function(){

                if(confirm("Delete this journal entry?")){

                    journals.splice(index,1);

                    saveJournalData();

                    renderJournals();

                }

            };

            journalList.appendChild(card);

        });

    }

    function addJournal(){

        const title =
        journalTitle.value.trim();

        const text =
        journalText.value.trim();

        if(title==="" || text===""){

            alert("Please enter both a title and journal text.");

            return;

        }

        const now = new Date();

        journals.unshift({

            title:title,

            text:text,

            date:now.toLocaleString()

        });

        journalTitle.value="";

        journalText.value="";

        saveJournalData();

        renderJournals();

    }

    saveJournal.onclick = addJournal;

    renderJournals();

}
// ==========================
// PLANT GROWTH TRACKER
// ==========================

const plantName=document.getElementById("plantName");
const plantDate=document.getElementById("plantDate");
const savePlant=document.getElementById("savePlant");

const displayPlant=document.getElementById("displayPlant");
const plantDays=document.getElementById("plantDays");
const plantStage=document.getElementById("plantStage");
const plantFill=document.getElementById("plantFill");

const waterPlant=document.getElementById("waterPlant");
const sunPlant=document.getElementById("sunPlant");

const plantNotes=document.getElementById("plantNotes");
const savePlantNotes=document.getElementById("savePlantNotes");

if(savePlant){

function updatePlant(){

    const data=
    JSON.parse(localStorage.getItem("plantData"));

    if(!data) return;

    displayPlant.textContent="🪴 "+data.name;

    const start=new Date(data.date);

    const today=new Date();

    const diff=Math.floor(
    (today-start)/(1000*60*60*24));

    plantDays.textContent=
    "🌱 Days Growing: "+diff;

    let stage="";
    let progress=0;

    if(diff<=7){

        stage="🌰 Seed";
        progress=10;

    }

    else if(diff<=20){

        stage="🌱 Sprout";
        progress=25;

    }

    else if(diff<=45){

        stage="🌿 Seedling";
        progress=45;

    }

    else if(diff<=90){

        stage="🌳 Young Plant";
        progress=65;

    }

    else if(diff<=180){

        stage="🌴 Growing Plant";
        progress=85;

    }

    else{

        stage="🌺 Mature Plant";
        progress=100;

    }

    plantStage.textContent=
    "Stage: "+stage;

    plantFill.style.width=
    progress+"%";

    waterPlant.checked=
    data.water;

    sunPlant.checked=
    data.sun;

    plantNotes.value=
    data.notes;

}

savePlant.onclick=function(){

    const data={

        name:plantName.value,

        date:plantDate.value,

        water:false,

        sun:false,

        notes:""

    };

    localStorage.setItem(
    "plantData",
    JSON.stringify(data));

    updatePlant();

};

waterPlant.onchange=function(){

    const data=
    JSON.parse(localStorage.getItem("plantData"));

    data.water=this.checked;

    localStorage.setItem(
    "plantData",
    JSON.stringify(data));

};

sunPlant.onchange=function(){

    const data=
    JSON.parse(localStorage.getItem("plantData"));

    data.sun=this.checked;

    localStorage.setItem(
    "plantData",
    JSON.stringify(data));

};

savePlantNotes.onclick=function(){

    const data=
    JSON.parse(localStorage.getItem("plantData"));

    data.notes=plantNotes.value;

    localStorage.setItem(
    "plantData",
    JSON.stringify(data));

    alert("Plant notes saved!");

};

updatePlant();

}
// ==========================
// DAILY QUOTE
// ==========================

const quotes = [

{
text:"Success is the sum of small efforts repeated day after day.",
author:"Robert Collier"
},

{
text:"The future depends on what you do today.",
author:"Mahatma Gandhi"
},

{
text:"Believe you can and you're halfway there.",
author:"Theodore Roosevelt"
},

{
text:"Do something today that your future self will thank you for.",
author:"Sean Patrick Flanery"
},

{
text:"Learning never exhausts the mind.",
author:"Leonardo da Vinci"
},

{
text:"Dream big. Start small. Act now.",
author:"Robin Sharma"
},

{
text:"Small progress is still progress.",
author:"Unknown"
},

{
text:"Success doesn't come from what you do occasionally. It comes from what you do consistently.",
author:"Marie Forleo"
}

];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuote = document.getElementById("newQuote");
const copyQuote = document.getElementById("copyQuote");

function loadQuote(){

    const random =
    Math.floor(Math.random()*quotes.length);

    quoteText.textContent =
    `"${quotes[random].text}"`;

    quoteAuthor.textContent =
    "— " + quotes[random].author;

}

if(newQuote){

    newQuote.onclick = loadQuote;

}

if(copyQuote){

    copyQuote.onclick = function(){

        navigator.clipboard.writeText(

            quoteText.textContent +
            "\n" +
            quoteAuthor.textContent

        );

        alert("Quote copied!");

    };

}

loadQuote();
// ==========================
// EVENT PLANNER
// ==========================

const eventName=document.getElementById("eventName");
const eventDate=document.getElementById("eventDate");
const addEvent=document.getElementById("addEvent");
const eventList=document.getElementById("eventList");

if(eventName && eventDate && addEvent && eventList){

let events=
JSON.parse(localStorage.getItem("lifeEvents")) || [];

function saveEvents(){

    localStorage.setItem(
    "lifeEvents",
    JSON.stringify(events));

}

function renderEvents(){

    eventList.innerHTML="";

    events.sort((a,b)=>
    new Date(a.date)-new Date(b.date));

    events.forEach((event,index)=>{

        const today=new Date();

        const target=new Date(event.date);

        today.setHours(0,0,0,0);
        target.setHours(0,0,0,0);

        const diff=Math.ceil(
        (target-today)/(1000*60*60*24));

        let countdown="";

        if(diff>1){

            countdown=`⏳ ${diff} days left`;

        }

        else if(diff===1){

            countdown="📅 Tomorrow";

        }

        else if(diff===0){

            countdown="🎉 Today!";

        }

        else{

            countdown="✔ Event Finished";

        }

        const card=document.createElement("div");

        card.className="event-item";

        card.innerHTML=`

        <h3>${event.name}</h3>

        <div class="event-date">

        📅 ${event.date}

        </div>

        <div class="event-countdown">

        ${countdown}

        </div>

        <button class="delete-event">

        🗑 Delete

        </button>

        `;

        card.querySelector(".delete-event").onclick=function(){

            events.splice(index,1);

            saveEvents();

            renderEvents();

        };

        eventList.appendChild(card);

    });

}

addEvent.onclick=function(){

    if(
        eventName.value.trim()==="" ||
        eventDate.value===""){

        alert("Please fill in all fields.");

        return;

    }

    events.push({

        name:eventName.value,

        date:eventDate.value

    });

    eventName.value="";
    eventDate.value="";

    saveEvents();

    renderEvents();

};

renderEvents();

}
// ==========================
// WEATHER DASHBOARD
// ==========================

const weatherLocation=document.getElementById("weatherLocation");
const temperature=document.getElementById("temperature");
const weatherCondition=document.getElementById("weatherCondition");
const humidity=document.getElementById("humidity");
const wind=document.getElementById("wind");
const cloud=document.getElementById("cloud");
const rain=document.getElementById("rain");
const refreshWeather=document.getElementById("refreshWeather");

const weatherCodes={
0:"☀️ Clear Sky",
1:"🌤 Mainly Clear",
2:"⛅ Partly Cloudy",
3:"☁️ Cloudy",
45:"🌫 Fog",
48:"🌫 Fog",
51:"🌦 Drizzle",
53:"🌦 Drizzle",
55:"🌦 Heavy Drizzle",
61:"🌧 Rain",
63:"🌧 Moderate Rain",
65:"🌧 Heavy Rain",
71:"🌨 Snow",
80:"🌦 Rain Showers",
95:"⛈ Thunderstorm"
};

async function loadWeather(){

    if(!navigator.geolocation){

        weatherLocation.textContent="Location not supported.";
        return;

    }

    navigator.geolocation.getCurrentPosition(async(pos)=>{

        const lat=pos.coords.latitude;
        const lon=pos.coords.longitude;

        weatherLocation.textContent=
        `📍 ${lat.toFixed(2)}, ${lon.toFixed(2)}`;

        const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,rain,cloud_cover`;

        const response=await fetch(url);

        const data=await response.json();

        const current=data.current;

        temperature.textContent=
        current.temperature_2m+"°C";

        humidity.textContent=
        current.relative_humidity_2m+"%";

        wind.textContent=
        current.wind_speed_10m+" km/h";

        cloud.textContent=
        current.cloud_cover+"%";

        rain.textContent=
        current.rain+" mm";

        weatherCondition.textContent=
        weatherCodes[current.weather_code] || "Weather";

    },()=>{

        weatherLocation.textContent=
        "Location permission denied.";

    });

}

if(refreshWeather){

    refreshWeather.onclick=loadWeather;

}

loadWeather();
//==========================
// DAILY ROUTINE
//==========================

const morningTasks =
document.querySelectorAll(".morning-task");

const nightTasks =
document.querySelectorAll(".night-task");

const morningProgress =
document.getElementById("morningProgress");

const nightProgress =
document.getElementById("nightProgress");

const morningText =
document.getElementById("morningText");

const nightText =
document.getElementById("nightText");

//--------------------------

function updateRoutine(){

    let morningDone = 0;

    morningTasks.forEach((task,index)=>{

        task.checked =
        localStorage.getItem("morning"+index) === "true";

        if(task.checked) morningDone++;

    });

    let morningPercent =
    (morningDone/morningTasks.length)*100;

    morningProgress.style.width =
    morningPercent+"%";

    morningText.textContent =
    `${morningDone} / ${morningTasks.length} Completed`;

    //--------------------------

    let nightDone = 0;

    nightTasks.forEach((task,index)=>{

        task.checked =
        localStorage.getItem("night"+index) === "true";

        if(task.checked) nightDone++;

    });

    let nightPercent =
    (nightDone/nightTasks.length)*100;

    nightProgress.style.width =
    nightPercent+"%";

    nightText.textContent =
    `${nightDone} / ${nightTasks.length} Completed`;

    //--------------------------

    if(morningDone===morningTasks.length){

        morningProgress.style.background =
        "#22c55e";

    }

    else{

        morningProgress.style.background =
        "linear-gradient(90deg,#2563eb,#16a34a)";

    }

    if(nightDone===nightTasks.length){

        nightProgress.style.background =
        "#22c55e";

    }

    else{

        nightProgress.style.background =
        "linear-gradient(90deg,#7c3aed,#ec4899)";

    }

    //--------------------------

    if(
        morningDone===morningTasks.length &&
        nightDone===nightTasks.length
    ){

        setTimeout(()=>{

            alert("🎉 Amazing! You completed your entire daily routine!");

        },300);

    }

}

//--------------------------

morningTasks.forEach((task,index)=>{

    task.addEventListener("change",()=>{

        localStorage.setItem(
            "morning"+index,
            task.checked
        );

        updateRoutine();

    });

});

//--------------------------

nightTasks.forEach((task,index)=>{

    task.addEventListener("change",()=>{

        localStorage.setItem(
            "night"+index,
            task.checked
        );

        updateRoutine();

    });

});

//--------------------------

updateRoutine();
//==========================
// BREATHING EXERCISE
//==========================

const breathingCircle =
document.getElementById("breathingCircle");

const breathingText =
document.getElementById("breathingText");

const startBreathing =
document.getElementById("startBreathing");

const stopBreathing =
document.getElementById("stopBreathing");

let breathingInterval;

function startExercise(){

    let step=0;

    breathingInterval=setInterval(()=>{

        if(step===0){

            breathingText.textContent="Breathe In";

            breathingCircle.classList.add("breathe-in");
            breathingCircle.classList.remove("breathe-out");

        }

        else if(step===1){

            breathingText.textContent="Hold";

        }

        else if(step===2){

            breathingText.textContent="Breathe Out";

            breathingCircle.classList.remove("breathe-in");
            breathingCircle.classList.add("breathe-out");

        }

        step++;

        if(step>2){

            step=0;

        }

    },4000);

}

startBreathing.onclick=function(){

    clearInterval(breathingInterval);

    startExercise();

}

stopBreathing.onclick=function(){

    clearInterval(breathingInterval);

    breathingCircle.classList.remove("breathe-in");
    breathingCircle.classList.remove("breathe-out");

    breathingText.textContent="Ready";

}


