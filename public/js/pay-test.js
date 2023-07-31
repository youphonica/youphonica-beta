console.log('working')


const stripe = 'pk_test_51KJaaVEnftAKbusCzsOPWLQrcvn1ZfLD2gDDiI5kyCQJ30SWimdUxs2TWS747lLMpS3mcx1M9WDlz1HPviw3r88o00xqfZN90z'

console.log('stripe key:', stripe)

const options = {
    clientSecret: '{{CLIENT_SECRET}}',
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };
  
  // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
  const elements = stripe.elements(options);
  
  // Create and mount the Payment Element
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

  
  const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
https://example.com/order/123/complete
   await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: '/payment-complete/payment_intent_client_secret',
    },
  });
});
