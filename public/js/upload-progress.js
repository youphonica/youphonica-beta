// const xhr = new XMLHttpRequest();
// xhr.upload.onprogress = (event) => {
//   if (event.lengthComputable) {
//     const progress = event.loaded / event.total * 100;
//     console.log('Upload progress:', progress);
//     updateProgress(progress);
//   }
// };

// const form = document.querySelector('form');
// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const fileInput = document.querySelector('input[type="file"]');
// const file = fileInput.files[0];

// const formData = new FormData();
// formData.append('file', file);

// xhr.open('POST', '/upload/test-upload/637cc103b682e46d3a0a23f9');
// xhr.send(formData);
// });



// const linkBtn = document.querySelector('.link-button')

// function updateProgress(progress) {
// const progressElement = document.querySelector('.progress');
// progressElement.style.width = progress;
// var roundedProgress = Math.round(progress)
// progressElement.innerText = `${roundedProgress}% uploaded incomplete`;
// if(progress === 100){
//     progressElement.innerText = `${roundedProgress}% uploaded done`;
//     linkBtn.classList.remove('hide')
// }
// }

// const socket = io();
// socket.on('uploadProgress', ({ progress }) => {
// console.log('Upload progress:', progress);
// updateProgress(progress);
// });