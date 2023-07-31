const form = document.getElementById('form')
const submit = document.getElementById('submit-cs')
const fullname = document.getElementById('name')
const artistEmail = document.getElementById('email')
const agree_tos = document.getElementById('tos')
const invalidName = document.getElementById('invalid-name')
const invalidEmail = document.getElementById('invalid-email')
const tosFeedback = document.getElementById('tos-feedback')


const nameRegex = /^[a-zA-Z0-9-' ]{1,150}$/
const allowedCharsEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/


form.addEventListener("submit", (e) => {
    const name = fullname.value
    const email = artistEmail.value
    const tos = agree_tos.value
    const validName = nameRegex.test(name)
    const validEmail = allowedCharsEmail.test(email)
    console.log('name', name, 'email', email, 'tos', tos)
    if(validName){
        fullname.classList.remove('invalid')
        fullname.classList.add('valid')
        invalidName.classList.add('hide')
    }
    if(!validName){
        e.preventDefault()
        e.stopPropagation()
        fullname.classList.remove('valid')
        fullname.classList.add('invalid')
        invalidName.classList.remove('hide')
    }
    if(validEmail){
        artistEmail.classList.remove('invalid')
        artistEmail.classList.add('valid')
        invalidEmail.classList.add('hide')
    }
    if(!validEmail){
        e.preventDefault()
        e.stopPropagation()
        artistEmail.classList.remove('valid')
        artistEmail.classList.add('invalid')
        invalidEmail.classList.remove('hide')
    }if(tos == null || undefined){
        e.preventDefault()
        e.stopPropagation()
        tosFeedback.classList.remove('hide')
    }if(tos == "on"){
        tosFeedback.classList.add('hide')
    }
})