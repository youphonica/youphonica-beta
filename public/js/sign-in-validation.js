const userEmail = document.getElementById('email')
const pwd = document.getElementById('password')
const form = document.getElementById('form')
const submit = document.getElementById('submit')
const allowedCharsEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
const allowedCharsPwd = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.]{3,50}$/



form.addEventListener("submit", (e) => {
    const email = userEmail.value
    const password = pwd.value
    const validEmail = allowedCharsEmail.test(email)
    const validPwd = allowedCharsPwd.test(password)
if(validEmail){
    userEmail.classList.remove('invalid')
    userEmail.classList.add('valid') 
}if(!validEmail){
    e.preventDefault()
    e.stopPropagation()
    userEmail.classList.remove('valid')
    userEmail.classList.add('invalid')
}if(validPwd){
    pwd.classList.remove('invalid')
    pwd.classList.add('valid') 
}if(!validPwd){
    e.preventDefault()
    e.stopPropagation()
    pwd.classList.remove('valid')
    pwd.classList.add('invalid')  
}})


