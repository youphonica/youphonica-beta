  const input = document.querySelector('.img-input')
  const invalid = document.getElementById('invalid')
  const valid = document.getElementById('valid')
  
  function validateUpload() {
  
console.log(input.value)

      const fileName = input.value
  
      //allowed file types
  
      const allowedFileTypes =    /(\.jpg|\.jpeg|\.png)$/i;
  
      if (!allowedFileTypes.exec(fileName)) {
                    invalid.innerText = "invalid file type!"
                    valid.innerText = ""
                    input.value = '';
              }else{
                    invalid.innerText = ""
                    preview.readAsDataURL(input.files[0]);
                }
            }
        
  function hidePrompt() {
      invalid.innerText = ""
      valid.innerText = ""
  }

  input.addEventListener('change', e => {
      return validateUpload() 
  })