

var watchtime = new URLSearchParams(window.location.search).get(
    't'
  );

console.log(watchtime)


//save time
var currentTime = document.querySelector('.current-time')
const remember = document.querySelector('.remember')
var performance = document.querySelector('video')
const notifier = document.querySelector('.notifier')


function showMessage(){
  remember.classList.add('hide')
  notifier.classList.remove('hide')
}

function showButton(){
  remember.classList.remove('hide')
  notifier.classList.add('hide')
}

remember.addEventListener("click", (e) => {
    const time = parseInt(performance.currentTime)
    console.log('time saved at:', parseInt(performance.currentTime))

    const data = { timeReached: time};

fetch('https://www.youphonica.com/save-time', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  setTimeout(showMessage, 1000)
  setTimeout(showButton, 3000)
})


