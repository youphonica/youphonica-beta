
const pwd = document.getElementById('password')
const reEnterPwd = document.getElementById('passwordConfirm')
const form = document.getElementById('form')
const submit = document.getElementById('submit')
const passwordError = document.querySelector('.password')
const reEnterError = document.querySelector('.re-enter')
const allowedCharsPwd = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.]{8,50}$/



submit.addEventListener("click", (e) => {
    const password = form.password.value
    const reEnter = form.passwordConfirm.value
    const validPwd = allowedCharsPwd.test(password)
    const validReEnterPwd = allowedCharsPwd.test(reEnter)

if(validPwd){
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


