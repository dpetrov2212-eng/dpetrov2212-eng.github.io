// script.js
let habits = JSON.parse(localStorage.getItem('habits')) || [];

const habitList = document.getElementById('habitList');
const habitInput = document.getElementById('habitInput');
const totalDaysSpan = document.getElementById('totalDays');

// Инициализация Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
    document.body.style.backgroundColor = Telegram.WebApp.themeParams.bg_color || '#f0f0f0';
}

// Функция для рендеринга списка привычек
function renderHabits() {
    habitList.innerHTML = '';
    let totalDays = 0;
    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.className = 'habit-item';
        li.innerHTML = `
            <span class="habit-name">${habit.name}</span>
            <span class="streak">Серия: ${habit.streak} дней</span>
            <button class="done-btn" onclick="markDone(${index})">Готово</button>
            <button class="delete-btn" onclick="deleteHabit(${index})">Удалить</button>
        `;
        habitList.appendChild(li);
        totalDays += habit.streak;
    });
    totalDaysSpan.textContent = totalDays;
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Добавление новой привычки
function addHabit() {
    const name = habitInput.value.trim();
    if (name) {
        habits.push({ name, streak: 0, lastDone: null });
        habitInput.value = '';
        renderHabits();
    }
}

// Отметка привычки как выполненной
function markDone(index) {
    const habit = habits[index];
    const today = new Date().toDateString();
    if (habit.lastDone !== today) {
        habit.streak = (new Date() - new Date(habit.lastDone)) / (1000 * 60 * 60 * 24) === 1 ? habit.streak + 1 : 1;
        habit.lastDone = today;
        renderHabits();
    }
}

// Удаление привычки
function deleteHabit(index) {
    habits.splice(index, 1);
    renderHabits();
}

// Инициализация
renderHabits();