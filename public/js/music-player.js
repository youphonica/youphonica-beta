var duration = document.querySelector('.total-duration')
var performance = document.querySelector('audio')
var mainPlay = document.querySelector('.main-play-pause')
var playPause = document.querySelector('.play-pause')
var testData = document.querySelector('.testData')
var nowPlaying = document.querySelector('.now-playing')
var loop = document.querySelector('.loop')
const volumeSlider = document.querySelector('#volume-slider')
const volumeIcon = document.querySelector('.volume')



var mainTrack = document.querySelector('.main-track')
var miniAudio = document.querySelector('.mini-audio')
var currentTime = document.querySelector('.current-time')
const totalDuration = document.querySelector('.total-duration')
const timelineCont = document.querySelector('.timeline-cont')
const stage = document.querySelector('.stage')




document.addEventListener("keydown", (e) => {

  switch (e.key.toLocaleLowerCase()){
  case "i": 
  togglePlay()
  break
  case "arrowleft":
  console.log('left')
  mainTrack.currentTime = mainTrack.currentTime - 10
  break
  case "arrowright":
  console.log('right')
  mainTrack.currentTime = mainTrack.currentTime + 10
  break
  }
})


performance.onloadedmetadata = function() {
console.log(performance.duration)
duration.innerText = formattedDuration(performance.duration)

console.log(formattedDuration(performance.duration))
}

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


  mainPlay.addEventListener("click", togglePlay)
  mainTrack.addEventListener("click", togglePlay)
  
  function togglePlay() {
    mainTrack.paused ? mainTrack.play() : mainTrack.pause()
  }
  
  mainTrack.addEventListener("play", () => {
    mainPlay.innerText = 'pause_circle'
  })
  
  mainTrack.addEventListener("pause", () => {
    var watchtime = mainTrack.currentTime
    mainPlay.innerText = 'play_circle'
  })



  
  playPause.addEventListener("click", () => {
    console.log(playPause)
    if(mainTrack.paused){
      mainPlay.innerText = 'pause_circle'
      mainTrack.play()
    }else{
      var watchtime = mainTrack.currentTime
      mainPlay.innerText = 'play_circle'
      mainTrack.pause()
    }
  })


  mainTrack.addEventListener("timeupdate", () => {
    currentTime.innerText = formattedDuration(mainTrack.currentTime)
    const percent = mainTrack.currentTime / mainTrack.duration 
    timelineCont.style.setProperty("--progress", percent)
    var watchtime = parseInt(mainTrack.currentTime)
  })



  function playTrack(url) {
    console.log(url)
    mainTrack.src = url
    mainTrack.play()
    miniAudio.src = url
  }

  function getTrackNum(trackNum){
    console.log(trackNum)
  }


  function getTrackName(trackName){
    console.log(trackName)
    nowPlaying.innerText = `now playing: ${trackName}`
  }
  

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




loop.addEventListener("click", (e) => {
  console.log('looping')
  if(loop.classList.contains('looped')){
    loop.classList.remove('looped')
    loop.classList.add('not-looped')
    mainTrack.removeAttribute('loop', "loop")
  }else{
  loop.classList.add('looped')
  loop.classList.remove('not-looped')
  mainTrack.setAttribute('loop', "loop")
  }
  
})





  // var span = document.getElementsByTagName('span');
  // for (i = 0; i < span.length; i++) {
  //     span[i].addEventListener('click', function () {
  //       alert(span[i].id)
  //     });
  // }



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
    wasPaused = mainTrack.paused
    mainTrack.pause()
  } else {
    mainTrack.currentTime = percent * mainTrack.duration
    if (!wasPaused) mainTrack.play()
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
