const further_feedback = document.querySelector('.further-feedback-text')
const likliness = document.querySelector('.likliness')
const feedback_warning = document.querySelector('.further-feedback')
const submit = document.querySelector('.submit')

const allowedCharsFeedback = /^[a-zA-Z0-9 &()_.',"!-]{10,350}$/

submit.addEventListener("click", (e) => {

    var rating = 0
    const one = document.querySelector('.star-1')
    const two = document.querySelector('.star-2')
    const three = document.querySelector('.star-3')
    const four = document.querySelector('.star-4')
    const five = document.querySelector('.star-5')

    if(one.classList.contains('glow') && !two.classList.contains('glow')){
        console.log('1 star is glowing')
        var rating = 1
    }
    if(two.classList.contains('glow') && !three.classList.contains('glow')){
        console.log('2 stars are glowing')
        var rating = 2
    }
    if(three.classList.contains('glow') && !four.classList.contains('glow')){
        console.log('3 stars are glowing')
        var rating = 3
    }
    if(four.classList.contains('glow') && !five.classList.contains('glow')){
        console.log('4 stars are glowing')
        var rating = 4
    }
    if(five.classList.contains('glow')){
        console.log('5 stars are glowing')
        var rating = 5
    }
    if(!one.classList.contains('glow')){
        console.log('no stars are glowing :(')
        feedback_warning.innerText = 'must select at least one star'
        e.preventDefault()
        e.stopPropagation()
    }



    const feedback = further_feedback.value
    const probability = likliness.value

    const validFeedback = allowedCharsFeedback.test(feedback)

    if(validFeedback){
        further_feedback.classList.remove('invalid')
        further_feedback.classList.add('valid')
    }if (!validFeedback){
        further_feedback.classList.add('invalid')  
        feedback_warning.innerText = 'must be between 10 and 350 characters and cannot contain special characters'
        e.preventDefault()
        e.stopPropagation()
}

const data = { rating: rating, likliness: probability, further_feedback: feedback };

fetch('https://www.youphonica.com/send-feedback', {
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
})