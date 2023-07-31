const form = document.getElementById('form')
const artName = document.getElementById('artName')
const artEmail = document.getElementById('artEmail')
const artBio = document.getElementById('bio')
const genre = document.getElementById('genre')
const allowedGenres = ['pop', 'rock', 'metal', 'rap/hip hop', 'jazz', 'instrumental', 'classical', 'funk', 'rnb', 'blues', 'country', 'acoustic', 'swing', 'synthwave']
const submit = document.getElementById('submit')
const allowedCharsName = /^[a-zA-Z0-9_? ]{1,35}$/
const allowedCharsEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
const allowedCharsBio = /^[a-zA-Z0-9_.',"":? ]{50,350}$/
const approvedName = document.querySelectorAll('.valid-name')
const unapprovedName = document.querySelectorAll('.valid-name')
const messageEmail = document.querySelectorAll('.message-email')




submit.addEventListener("click", (e) => {
const name = artName.value
const email = artEmail.value
const bio = artBio.value
const validName = allowedCharsName.test(name)
const validEmail = allowedCharsEmail.test(email)  
const validBio = allowedCharsBio.test(bio)   

if(validName){
    artName.classList.remove('invalid')
    artName.classList.add('valid')
    approvedName.innerText = 'good'
}if(!validName){
    artName.classList.add('invalid')
    unapprovedName.innerText = "can't contain special characters or be longer than 35 characters"
    e.preventDefault()
    e.stopPropagation()
}if(validEmail){
    artEmail.classList.add('valid')
    artEmail.classList.remove('invalid')
    messageEmail.innerText = 'on key'
}if(!validEmail){
    artEmail.classList.remove('valid')
    artEmail.classList.add('invalid')
    artEmail.classList.add('is-invalid')

    messageEmail.innerText = "invalid email"
    e.preventDefault()
    e.stopPropagation()
}
if(validBio){
        artBio.classList.remove('invalid')
        artBio.classList.add('valid')
}if(!validBio){
        artBio.classList.add('invalid')
        e.preventDefault()
        e.stopPropagation()
}})
