// === State ===
const TIMES = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

let state = {
  mode: 'pomodoro',
  timeLeft: TIMES.pomodoro,
  totalTime: TIMES.pomodoro,
  isRunning: false,
  timerId: null,
  completedPomodoros: 0,
  currentSession: 0,
  tasks: [],
};

// === DOM ===
const timerDisplay = document.getElementById('timerDisplay');
const progressCircle = document.getElementById('progressCircle');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const modeBtns = document.querySelectorAll('.mode-btn');
const completedCount = document.getElementById('completedCount');
const currentSessionEl = document.getElementById('currentSession');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const minimizeBtn = document.getElementById('minimizeBtn');
const closeBtn = document.getElementById('closeBtn');

const CIRCUMFERENCE = 2 * Math.PI * 100; // 628.32

// === Helpers ===
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(state.timeLeft);
  const progress = 1 - state.timeLeft / state.totalTime;
  const offset = CIRCUMFERENCE * progress;
  progressCircle.style.strokeDashoffset = offset;
}

function updateModeUI() {
  modeBtns.forEach((btn) => btn.classList.toggle('active', btn.dataset.mode === state.mode));
  const color = state.mode === 'pomodoro' ? '#e74c3c' : '#27ae60';
  progressCircle.style.stroke = color;
  startBtn.style.background = state.isRunning
    ? '#f39c12'
    : color;
  startBtn.style.boxShadow = state.isRunning
    ? '0 4px 15px rgba(243, 156, 18, 0.3)'
    : `0 4px 15px rgba(${state.mode === 'pomodoro' ? '231, 76, 60' : '39, 174, 96'}, 0.25)`;
}

function updateStats() {
  completedCount.textContent = state.completedPomodoros;
  currentSessionEl.textContent = state.currentSession;
}

function updateStartBtn() {
  if (state.isRunning) {
    startBtn.textContent = '⏸ 暂停';
    startBtn.classList.add('running');
  } else {
    startBtn.textContent = state.timeLeft < state.totalTime ? '▶ 继续' : '▶ 开始';
    startBtn.classList.remove('running');
  }
}

// === Timer ===
function tick() {
  state.timeLeft--;
  updateTimerDisplay();

  if (state.timeLeft <= 0) {
    clearInterval(state.timerId);
    state.timerId = null;
    state.isRunning = false;
    onTimerComplete();
  }
}

function onTimerComplete() {
  if (state.mode === 'pomodoro') {
    state.completedPomodoros++;
    state.currentSession++;
    updateStats();

    // Desktop notification
    try {
      window.electronAPI.showNotification({
        title: '🍅 专注完成！',
        body: `已完成 ${state.completedPomodoros} 个番茄，休息一下吧！`,
      });
    } catch (_) {}

    // Auto-switch to break
    if (state.currentSession % 4 === 0) {
      switchMode('longBreak');
    } else {
      switchMode('shortBreak');
    }
    startTimer();
    updateStats();
  } else {
    // Break finished
    try {
      window.electronAPI.showNotification({
        title: '☕ 休息结束',
        body: '该开始新的专注了！',
      });
    } catch (_) {}

    switchMode('pomodoro');
    resetTimer();
  }
  updateStartBtn();
}

function startTimer() {
  if (state.timerId) return;
  state.isRunning = true;
  state.timerId = setInterval(tick, 1000);
  updateStartBtn();
  updateModeUI();
}

function pauseTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  state.isRunning = false;
  updateStartBtn();
  updateModeUI();
}

function resetTimer() {
  pauseTimer();
  state.timeLeft = state.totalTime;
  updateTimerDisplay();
  progressCircle.style.strokeDashoffset = 0;
  updateStartBtn();
  updateModeUI();
}

function switchMode(mode) {
  pauseTimer();
  state.mode = mode;
  state.totalTime = TIMES[mode];
  state.timeLeft = TIMES[mode];
  updateTimerDisplay();
  progressCircle.style.strokeDashoffset = 0;
  updateModeUI();
}

// === Tasks ===
function renderTasks() {
  taskList.innerHTML = '';
  state.tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const check = document.createElement('span');
    check.className = 'task-check' + (task.done ? ' done' : '');
    check.addEventListener('click', () => toggleTask(i));

    const text = document.createElement('span');
    text.className = 'task-text' + (task.done ? ' completed' : '');
    text.textContent = task.text;

    const del = document.createElement('button');
    del.className = 'task-del';
    del.textContent = '✕';
    del.addEventListener('click', () => deleteTask(i));

    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(del);
    taskList.appendChild(li);
  });
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  state.tasks.unshift({ text: trimmed, done: false });
  renderTasks();
}

function toggleTask(index) {
  state.tasks[index].done = !state.tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  state.tasks.splice(index, 1);
  renderTasks();
}

// === Event Listeners ===
startBtn.addEventListener('click', () => {
  if (state.isRunning) pauseTimer();
  else startTimer();
});

resetBtn.addEventListener('click', resetTimer);

modeBtns.forEach((btn) => {
  btn.addEventListener('click', () => switchMode(btn.dataset.mode));
});

addTaskBtn.addEventListener('click', () => {
  addTask(taskInput.value);
  taskInput.value = '';
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

// Title bar
minimizeBtn.addEventListener('click', () => {
  try { window.electronAPI.minimizeWindow(); } catch (_) {}
});
closeBtn.addEventListener('click', () => {
  try { window.electronAPI.closeWindow(); } catch (_) {}
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  if (e.code === 'Space') {
    e.preventDefault();
    startBtn.click();
  }
  if (e.code === 'KeyR') {
    resetBtn.click();
  }
});

// === Init ===
updateTimerDisplay();
updateModeUI();
updateStats();
