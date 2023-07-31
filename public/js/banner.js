const form = document.getElementById('form')
const file = document.getElementById('img-input')
const submit = document.getElementById('submit')
const spinner = document.querySelector('.box')
const label = document.querySelector('.form-label')
const allowedFileTypes = /(\.jpg|\.jpeg|\.png)$/i;


file.addEventListener('change', (e) => {
    const fileName = file.value

if(!allowedFileTypes.exec(fileName)){
    file.classList.add('invalid')
    file.value = ''
    e.preventDefault()
    e.stopPropagation()
}else{
    file.classList.remove('invalid')
    file.classList.add('valid')
}
})


submit.addEventListener("click", (e) => {
    const fileName = file.value
if(!allowedFileTypes.exec(fileName)){
        file.classList.add('invalid')
        file.value = ''
        e.preventDefault()
        e.stopPropagation()
if(fileName == null || undefined){
    file.classList.add('invalid')
    e.preventDefault()
    e.stopPropagation()
}
    }else{
        spinner.classList.remove('none')
        file.classList.add('none')
        submit.classList.add('none')
        label.classList.add('none')
        file.classList.remove('invalid')
        file.classList.add('valid')
    }})