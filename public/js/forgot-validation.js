const userEmail = document.getElementById('email')
const form = document.getElementById('form')
const submit = document.getElementById('submit')
const allowedCharsEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/



submit.addEventListener("click", (e) => {
    const email = form.email.value
    const validEmail = allowedCharsEmail.test(email)
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
    }})