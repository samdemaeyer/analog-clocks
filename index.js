
const clocksWrapper = document.querySelector('#clocks-wrapper')

const generateClocks = () => {
  const now = new Date()
  const mins = now.getMinutes();
  const randomizedHours = Array.from({ length: 12 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
  const randomizedMinutes = Array.from({ length: 60 }, (_, i) => i).sort(() => Math.random() - 0.5)
  randomizedHours.forEach((hour) => {
    randomizedMinutes.forEach((min) => {
      const clock = document.createElement('div')
      clock.className = 'clock-wrapper'
      clock.id = `hour-${hour}-minute-${min}`
      const hourDegrees = (hour * 30) + 90
      const minutesDegrees = (min * 6) + 90
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
      `
      clocksWrapper.appendChild(clock)
    })
  })
}

generateClocks()

const setDate = () => {
  const now = new Date()
  const previeusClockTime = new Date()
  const currentMin = now.getMinutes();
  const currentHour = (now.getHours() + 24) % 12 || 12;
  previeusClockTime.setMinutes(now.getMinutes() - 1);
  const previeusClockMin = previeusClockTime.getMinutes();
  const previeusClockHour = (previeusClockTime.getHours() + 24) % 12 || 12;
  console.log('now: ', `hour-${currentHour}-minute-${currentMin}`);
  console.log('previeusClockTime: ', `hour-${previeusClockHour}-minute-${previeusClockMin}`);
  const currentClock = document.getElementById(`hour-${currentHour}-minute-${currentMin}`)

  currentClock.classList.add('active')
  document.getElementById(`hour-${previeusClockHour}-minute-${previeusClockMin}`).classList.remove('active')
  currentClock.scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center',
    behavior: 'smooth'
  });
}

let date = new Date();
let sec = date.getSeconds();
setTimeout(setDate, 100)
setTimeout(() => {
  setDate()
  setInterval(setDate, 60 * 1000);
}, (60 - sec) * 1000);



function setSecond() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  document.querySelector('.active .second-hand').style.transform = `rotate(${secondsDegrees}deg)`
}

setInterval(setSecond, 1000);
setTimeout(setSecond, 100)
