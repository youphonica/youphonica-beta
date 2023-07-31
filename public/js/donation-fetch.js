const pid = new URLSearchParams(window.location.search).get(
    'payment_intent'
  );
  

  console.log(pid)

const redirect_status = new URLSearchParams(window.location.search).get(
    'redirect_status'
  );

console.log(redirect_status)



if(pid == null){
  console.log('no pid')
}else{

const data = { pi: pid, status: redirect_status };

console.log(data)

fetch('https://www.youphonica.com/thanks-for-your-donation', {
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
}
