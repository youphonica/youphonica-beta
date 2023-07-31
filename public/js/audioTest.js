const form = document.querySelector('.audioForm')
const file = document.querySelector('.audioFile')
const submit = document.querySelector('.submit-thumb')


const data = new FormData(form);

async function post() { await fetch('/audio-upload-test', {  

method: 'POST',
mode: 'cors',
body: data,
})
.then((response) => console.log(response))
.catch((err) => console.log(err));
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    post()
    console.log('file', file)
    console.log('done')
})