const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
const clocksWrapper = document.querySelector("#clocks-wrapper")
const toggleScrollingBtn = document.querySelector("#toggle-scrolling-btn")
const body = document.body

const centerActiveClock = () => {
  const now = new Date()
  const currentMin = now.getMinutes()
  const currentHour = (now.getHours() + 24) % 12 || 12
  const currentClock = document.getElementById(
    `hour-${currentHour}-minute-${currentMin}`
  )
  currentClock?.classList.add("active")
  currentClock?.scrollIntoView({
    block: "center",
    inline: "center",
    behavior: "smooth",
  })
}

toggleScrollingBtn?.addEventListener("click", (element) => {
  if (body.className.includes("scrollable")) {
    body.classList.remove("scrollable")
    ;(element.target as HTMLElement).innerText = "Enable scrolling"
  } else {
    body.classList.add("scrollable")
    ;(element.target as HTMLElement).innerText = "Disable scrolling"
  }
})
document.querySelector("#re-center")?.addEventListener("click", () => {
  centerActiveClock()
  if (!isMobile) {
    body.classList.remove("scrollable")
    ;(toggleScrollingBtn as HTMLElement).innerText = "Enable scrolling"
  }
})

const minutes = Array.from({ length: 60 }, (_, i) => i)
const randomizedClockTimes = Array.from({ length: 12 }).reduce<string[]>(
  (acc, _, i) => {
    const hour = i + 1
    return [...acc, ...minutes.map((min) => `${hour}-${min}`)]
  },
  Array.from({ length: 9 }, () => "xx-xx")
)

randomizedClockTimes
  .sort(() => Math.random() - 0.5)
  .forEach((time) => {
    const [hour, min] = time.split("-")
    const clock = document.createElement("div")
    clock.className = "clock-wrapper"
    hour !== "xx" && (clock.id = `hour-${hour}-minute-${min}`)
    const hourDegrees = (Number(hour) / 12) * 360 + (Number(min) / 60) * 30 + 90
    const minutesDegrees = Number(min) * 6 + 90
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
    clocksWrapper?.appendChild(clock)
  })

const activateClockAndCenter = () => {
  const now = new Date()
  const previeusClockTime = new Date()
  previeusClockTime.setMinutes(now.getMinutes() - 1)
  const previeusClockMin = previeusClockTime.getMinutes()
  const previeusClockHour = (previeusClockTime.getHours() + 24) % 12 || 12

  document
    .getElementById(`hour-${previeusClockHour}-minute-${previeusClockMin}`)
    ?.classList.remove("active")
  centerActiveClock()
}

let date = new Date()
let sec = date.getSeconds()
setTimeout(activateClockAndCenter, 100)
setTimeout(() => {
  activateClockAndCenter()
  setInterval(activateClockAndCenter, 60 * 1000)
}, (60 - sec) * 1000)

function setSecond() {
  const now = new Date()

  const seconds = now.getSeconds()
  const secondsDegrees = (seconds / 60) * 360 + 90
  const secondsHand = document.querySelector(".active .second-hand")
  secondsHand &&
    ((
      secondsHand as HTMLElement
    ).style.transform = `rotate(${secondsDegrees}deg)`)
}

setInterval(setSecond, 1000)
setTimeout(setSecond, 100)

if (isMobile) {
  document.body.classList.add("scrollable")
  toggleScrollingBtn?.remove()
}
