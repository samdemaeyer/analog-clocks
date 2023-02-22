"use strict";
const clocksWrapper = document.querySelector('#clocks-wrapper');
const generateClocks = () => {
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const randomizedClockTimes = Array.from({ length: 12 }).reduce((acc, curr, i) => {
        const hour = i + 1;
        return [...acc, ...minutes.map((min) => `${hour}-${min}`)];
    }, []);
    randomizedClockTimes
        .sort(() => Math.random() - 0.5)
        .forEach((time) => {
        const [hour, min] = time.split('-');
        const clock = document.createElement('div');
        clock.className = 'clock-wrapper';
        clock.id = `hour-${hour}-minute-${min}`;
        const hourDegrees = (Number(hour) / 12) * 360 + (Number(min) / 60) * 30 + 90;
        const minutesDegrees = Number(min) * 6 + 90;
        clock.innerHTML = `
        <div class="outer-clock-face">
          <div class="marking marking-one"></div>
          <div class="marking marking-two"></div>
          <div class="marking marking-three"></div>
          <div class="marking marking-four"></div>
          <div class="inner-clock-face">
            <div class="hand hour-hand" style="transform: rotate(${hourDegrees}deg)"></div>
            <div class="hand min-hand" style="transform: rotate(${minutesDegrees}deg)"></div>
            <div class="hand second-hand"></div>
          </div>
        </div>
      `;
        clocksWrapper === null || clocksWrapper === void 0 ? void 0 : clocksWrapper.appendChild(clock);
    });
};
generateClocks();
const setDate = () => {
    var _a;
    const now = new Date();
    const previeusClockTime = new Date();
    const currentMin = now.getMinutes();
    const currentHour = (now.getHours() + 24) % 12 || 12;
    previeusClockTime.setMinutes(now.getMinutes() - 1);
    const previeusClockMin = previeusClockTime.getMinutes();
    const previeusClockHour = (previeusClockTime.getHours() + 24) % 12 || 12;
    const currentClock = document.getElementById(`hour-${currentHour}-minute-${currentMin}`);
    currentClock === null || currentClock === void 0 ? void 0 : currentClock.classList.add('active');
    (_a = document.getElementById(`hour-${previeusClockHour}-minute-${previeusClockMin}`)) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
    currentClock === null || currentClock === void 0 ? void 0 : currentClock.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
    });
};
let date = new Date();
let sec = date.getSeconds();
setTimeout(setDate, 100);
setTimeout(() => {
    setDate();
    setInterval(setDate, 60 * 1000);
}, (60 - sec) * 1000);
function setSecond() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    const secondsHand = document.querySelector('.active .second-hand');
    secondsHand && (secondsHand.style.transform = `rotate(${secondsDegrees}deg)`);
}
setInterval(setSecond, 1000);
setTimeout(setSecond, 100);
