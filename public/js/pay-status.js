// Initialize Stripe.js using your publishable key
const stripe = Stripe('pk_test_51KJaaVEnftAKbusCzsOPWLQrcvn1ZfLD2gDDiI5kyCQJ30SWimdUxs2TWS747lLMpS3mcx1M9WDlz1HPviw3r88o00xqfZN90z');

// Retrieve the "payment_intent_client_secret" query parameter appended to
// your return_url by Stripe.js
const clientSecret = new URLSearchParams(window.location.search).get(
  'payment_intent_client_secret'
);

// Retrieve the PaymentIntent
stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
  const message = document.querySelector('#message')

  // Inspect the PaymentIntent `status` to indicate the status of the payment
  // to your customer.
  //
  // Some payment methods will [immediately succeed or fail][0] upon
  // confirmation, while others will first enter a `processing` state.
  //
  // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
  switch (paymentIntent.status) {
    case 'succeeded':
      message.innerText = 'Success! Payment received.';
      console.log('Success! Payment received.')
      break;

    case 'processing':
      message.innerText = "Payment processing. We'll update you when payment is received.";
      console.log("Payment processing. We'll update you when payment is received.")
      break;

    case 'requires_payment_method':
      message.innerText = 'Payment failed. Please try another payment method.';
      console.log('Payment failed. Please try another payment method.')
      // Redirect your user back to your payment page to attempt collecting
      // payment again
      break;

    default:
      message.innerText = 'Something went wrong.';
      break;
  }
});
