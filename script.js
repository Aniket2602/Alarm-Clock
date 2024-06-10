// Get references to DOM elements
const currentTime = document.getElementById("current-time");
const selectElementHours = document.getElementById("hours-container");
const selectElementMinutes = document.getElementById("minutes-container");
const selectElementSeconds = document.getElementById("seconds-container");
const selectElementAmpm = document.getElementById("ampm-container");
const setAlarmButton = document.getElementById("set-alarm-button");
const alarmListElement = document.querySelector(".alarm-list");

// Initialize array to store alarms
let alarmList = [];

// Update current time every second
setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  // Convert 24-hour format to 12-hour format
  if (h > 12) {
    h = h - 12;
    ampm = "PM";
  } else if (h == 12) {
    ampm = "PM";
  } else if (h == 0) {
    h = 12;
  }

  // Add leading zeros to single digit values
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  // Update current time display
  currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

  // Check for alarms
  alarmList.forEach((alarm, index) => {
    if (alarm.time === `${h}:${m}:${s} ${ampm}`) {
      alert("Alarm Ringing........");
      alarmList.splice(index, 1);
      alarm.element.remove();
    }
  }, 1000);
});

// Function to populate dropdowns for setting alarm time
function dropdown(start, end, elementName) {
  for (let i = start; i <= end; i++) {
    i = i < 10 ? "0" + i : i;
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    elementName.appendChild(option);
  }
}

// Populate hour, minute, and second dropdowns
dropdown(1, 12, selectElementHours);
dropdown(0, 59, selectElementMinutes);
dropdown(0, 59, selectElementSeconds);

// Populate AM/PM dropdown
for (let i = 1; i <= 2; i++) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = document.createElement("option");
  option.value = ampm;
  option.textContent = ampm;
  selectElementAmpm.appendChild(option);
}

// Function to add alarm to the list
function addToAlaramList(h, m, s, ampm) {
  const newAlarm = document.createElement("div");
  newAlarm.className = "set-alarm-box";
  newAlarm.innerHTML = `<span>${h}:${m}:${s} ${ampm}</span> <i class="fa-solid fa-trash"></i>`;
  alarmListElement.appendChild(newAlarm);

  // Add alarm to the array
  alarmList.push({ time: `${h}:${m}:${s} ${ampm}`, element: newAlarm });

  // Add event listener to delete alarm
  newAlarm.querySelector(".fa-trash").addEventListener("click", () => {
    alarmListElement.removeChild(newAlarm);
    alarmList = alarmList.filter((alarm) => alarm.element !== newAlarm);
  });
}

// Function to set alarm
function setAlarm() {
  let h = selectElementHours.value,
    m = selectElementMinutes.value,
    s = selectElementSeconds.value,
    ampm = selectElementAmpm.value;

  // Validate selected time
  const setTime = `${h}:${m}:${s} ${ampm}`;
  if (
    setTime.includes("Hours") ||
    setTime.includes("Minutes") ||
    setTime.includes("Seconds") ||
    setTime.includes("AM/PM")
  ) {
    alert("Select Valid Time !");
    return;
  }

  // Add alarm to the list
  addToAlaramList(h, m, s, ampm);

  // Reset dropdowns
  selectElementHours.value = "Hours";
  selectElementMinutes.value = "Minutes";
  selectElementSeconds.value = "Seconds";
  selectElementAmpm.value = "AM/PM";
}

// Event listener for set alarm button
setAlarmButton.addEventListener("click", setAlarm);
