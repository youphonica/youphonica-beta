const initialiser = document.querySelector('.add-discount')
const discountForm = document.querySelector('.discount-form')
const codeInput = document.querySelector('.code')
const submitCode = document.querySelector('.disc-sub')
const cancel = document.querySelector('.cancel')



//show and hide the form
initialiser.addEventListener("click", (e) => {
    discountForm.classList.remove('hide')
    initialiser.classList.add('hide')
})


cancel.addEventListener("click", (e) => {
    discountForm.classList.add('hide')
    initialiser.classList.remove('hide')
})


//define the data such as post id and discount code

var postId = new URLSearchParams(window.location.search).get(
    'post'
  );

  console.log('post id id:',postId)

var code = codeInput.value

const data = { code: code};


//send the fetch request and process it on the server side
submitCode.addEventListener("click", (e) => {
fetch(`https://www.youphonica.com/posts/633adf8a3d9c517cd3bf7d01/purchase/${code}`, {
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