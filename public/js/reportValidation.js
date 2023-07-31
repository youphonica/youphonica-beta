const reason = document.querySelector('.reason')
const details = document.querySelector('.details')


const allowedCharsDetails = /^[a-zA-Z0-9 .'"!]{0,350}$/



submit.addEventListener('click', e => {
    const reasonValue = reason.value
    const detailsValue = details.value
    const validDetails = allowedCharsTitle.test(detailsValue)

    
if(validDetails){
    detailsValue.classList.remove('invalid')
    detailsValue.classList.add('valid')
}if (!validDetails){
    detailsValue.classList.add('invalid')  
    detailsValue.innerText = 'must be under 350 characters and no special characters'
    e.preventDefault()
    e.stopPropagation()
}})