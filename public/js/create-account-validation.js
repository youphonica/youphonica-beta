const userEmail = document.getElementById('email')
const userUsername = document.getElementById('username')
const pwd = document.getElementById('password')
const reEnterPwd = document.getElementById('passwordConfirm')
const form = document.getElementById('form')
const submit = document.getElementById('submit')
const emailError = document.querySelector('.email')
const usernameError = document.querySelector('.username')
const passwordError = document.querySelector('.password')
const reEnterError = document.querySelector('.re-enter')
const allowedCharsName = /^[a-zA-Z0-9_?]{3,30}$/
const allowedCharsEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
const allowedCharsPwd = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.]{8,50}$/



submit.addEventListener("click", (e) => {
    const email = form.email.value
    const username = form.username.value
    const password = form.password.value
    const reEnter = form.passwordConfirm.value
    const validEmail = allowedCharsEmail.test(email)
    const validName = allowedCharsName.test(username)
    const validPwd = allowedCharsPwd.test(password)
    const validReEnterPwd = allowedCharsPwd.test(reEnter)

if(validEmail){
    userEmail.classList.remove('invalid')
    userEmail.classList.add('valid')
    emailError.textContent = ''
}if(!validEmail){
    e.preventDefault()
    e.stopPropagation()
    userEmail.classList.remove('valid')
    userEmail.classList.add('invalid')
    emailError.textContent = 'invalid email'
}if(validName){
    userUsername.classList.remove('invalid')
    userUsername.classList.add('valid')
    usernameError.textContent = ''
}if(!validName){
    e.preventDefault()
    e.stopPropagation()
    userUsername.classList.remove('valid')
    userUsername.classList.add('invalid') 
    usernameError.textContent = "username can't contain special characters and must be between 3-20 characters" 
}if(validPwd){
    pwd.classList.remove('invalid')
    pwd.classList.add('valid')
    passwordError.textContent = ''
}if(!validPwd){
    e.preventDefault()
    e.stopPropagation()
    pwd.classList.remove('valid')
    pwd.classList.add('invalid')
    passwordError.textContent = 'invalid password'  
}if(validReEnterPwd){
    reEnterPwd.classList.remove('invalid')
    reEnterPwd.classList.add('valid')
}if(!validReEnterPwd){
    e.preventDefault()
    e.stopPropagation()
    reEnterPwd.classList.remove('valid')
}if(pwd.value !== reEnterPwd.value){
    e.preventDefault()
    e.stopPropagation()
    reEnterPwd.classList.remove('valid')
    reEnterPwd.classList.add('invalid')
    pwd.classList.remove('valid')
    pwd.classList.add('invalid')
    passwordError.textContent = 'passwords must match'
    reEnterError.textContent = 'passwords must match'
}if(pwd.value !== reEnterPwd.value){
    e.preventDefault()
    e.stopPropagation()
    reEnterPwd.classList.remove('valid')
    reEnterPwd.classList.add('invalid')
    pwd.classList.remove('valid')
    pwd.classList.add('invalid')
    passwordError.textContent = ''
    reEnterError.textContent = ''
}})


