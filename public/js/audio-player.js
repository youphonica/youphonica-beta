const fullScreen = document.querySelector('.full-screen')
const closeFullScreen = document.querySelector('.close-full-screen')
const playPause = document.querySelector('.play-pause')
const fullScreenDiv = document.querySelector('.full')
const closeFullScreenDiv = document.querySelector('.close')
const forward = document.querySelector('.forward')
const rewind = document.querySelector('.rewind')
const volumeSlider = document.querySelector('#volume-slider')
const volumeIcon = document.querySelector('.volume')
const currentTime = document.querySelector('.current-time')
const totalDuration = document.querySelector('.total-duration')
const timelineCont = document.querySelector('.timeline-cont')
const stage = document.querySelector('.stage')
const performance = document.querySelector('.audio')
const audio = document.getElementsByTagName("audio")[0];



//key shortcuts
document.addEventListener("keydown", (e) => {

    switch (e.key.toLocaleLowerCase()){
    case "f":
    if (document.fullscreenElement == null) {
          stage.requestFullscreen()
          fullScreen.innerText = 'close_fullscreen'
        } else {
          document.exitFullscreen()
          fullScreen.innerText = 'fullscreen'
        }
    break

    case "i": 
    togglePlay()
    break
    case "arrowleft":
    console.log('left')
    performance.currentTime = performance.currentTime - 10
    break
    case "arrowright":
    console.log('right')
    performance.currentTime = performance.currentTime + 10
    break
    }
})



//screen sizes
fullScreen.addEventListener("click", () => {
        if (document.fullscreenElement == null) {
          stage.requestFullscreen()
          fullScreen.innerText = 'close_fullscreen'
        } else {
          document.exitFullscreen()
          fullScreen.innerText = 'fullscreen'
        }
        console.log(performance.currentTime)
      })




//play and pause
      playPause.addEventListener("click", togglePlay)
      performance.addEventListener("click", togglePlay)
      
      function togglePlay() {
        performance.paused ? performance.play() : performance.pause()
      }
      
      performance.addEventListener("play", () => {
        playPause.innerText = 'pause_circle'
      })
      
      performance.addEventListener("pause", () => {
        playPause.innerText = 'play_circle'
      })











//fast foward and rewind
    forward.addEventListener('click', () => {
    performance.currentTime = performance.currentTime + 10
    })

    rewind.addEventListener('click', () => {
        performance.currentTime = performance.currentTime + 10
        })





//volume
volumeSlider.addEventListener("change", () => {
  console.log(volumeSlider.value)
  performance.volume = volumeSlider.value
  if(performance.volume === 0){
      volumeIcon.innerText = 'volume_off'
      console.log('mute')
  }
  if(performance.volume > 0 && performance.volume < 0.5){
    volumeIcon.innerText = 'volume_down'
    console.log('mute')
}
if(performance.volume > 0.5){
  volumeIcon.innerText = 'volume_up'
  console.log('mute')
}
})

















//duration

performance.addEventListener("timeupdate", () => {
  currentTime.innerText = formattedDuration(performance.currentTime)
  const percent = audio.currentTime / audio.duration
  timelineCont.style.setProperty("--progress", percent)
})

performance.addEventListener("loadeddata", () => {
  totalDuration.innerText = formattedDuration(performance.duration)
})


const minutesFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
})


function formattedDuration(time){
  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)
  if (hours === 0) {
    return `${minutes}:${minutesFormatter.format(seconds)}`
  } else {
    return `${hours}:${minutesFormatter.format(
      minutes
    )}:${minutesFormatter.format(seconds)}`
  }
}
















//timeline
timelineCont.addEventListener("mousemove", timelineUpdate)
timelineCont.addEventListener("mousedown", toggleScrubbing)
document.addEventListener("mouseup", e => {
  if(scrubbing) toggleScrubbing(e)
})

document.addEventListener("mousemove", e => {
  if (scrubbing) timelineUpdate(e)
})

let scrubbing = false
let wasPaused
function toggleScrubbing(e){
  const rect = timelineCont.getBoundingClientRect()
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) /
  rect.width
  scrubbing = (e.buttons & 1)
  stage.classList.toggle("scrubbing", scrubbing)
  if (scrubbing) {
    wasPaused = performance.paused
    performance.pause()
  } else {
    performance.currentTime = percent * performance.duration
    if (!wasPaused) performance.play()
}
timelineUpdate(e)
}





function timelineUpdate(e) {
  const rect = timelineCont.getBoundingClientRect()
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) /
  rect.width
  timelineCont.style.setProperty("--preview", percent)

  if(scrubbing){
    e.preventDefault()
    timelineCont.style.setProperty("--progress", percent)
  }
}
