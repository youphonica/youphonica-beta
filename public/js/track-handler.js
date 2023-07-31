const addTrack = document.querySelector('.add_track')

var track_form_1 = document.querySelector('.track_1_form')
var track_form_2 = document.querySelector('.track_2_form')
var track_form_3 = document.querySelector('.track_3_form')
var track_form_4 = document.querySelector('.track_4_form')
var track_form_5 = document.querySelector('.track_5_form')


const track_name_1 = document.querySelector('.track_name_1')
const track_name_2 = document.querySelector('.track_name_2')
const track_name_3 = document.querySelector('.track_name_3')
const track_name_4 = document.querySelector('.track_name_4')
const track_name_5 = document.querySelector('.track_name_5')


const track_file_1 = document.querySelector('.track_file_1')
const track_file_2 = document.querySelector('.track_file_2')
const track_file_3 = document.querySelector('.track_file_3')
const track_file_4 = document.querySelector('.track_file_4')
const track_file_5 = document.querySelector('.track_file_5')


const track_remove_1 = document.querySelector('.track_1_remove')
const track_remove_2 = document.querySelector('.track_2_remove')
const track_remove_3 = document.querySelector('.track_3_remove')
const track_remove_4 = document.querySelector('.track_4_remove')
const track_remove_5 = document.querySelector('.track_5_remove')








addTrack.addEventListener("click", (e) => {
    e.preventDefault()
    console.log('clicked add track')
    if(track_form_2.classList.contains('hide')){
        track_form_2.classList.remove('hide')
        track_form_2.classList.add('visible')
        track_remove_2.classList.remove('hide')
    }else if(track_form_2.classList.contains('visible') && track_form_3.classList.contains('hide')){
        track_form_3.classList.remove('hide')
        track_form_3.classList.add('visible')
        track_remove_2.classList.add('hide')
        track_remove_3.classList.remove('hide')
    }else if(track_form_3.classList.contains('visible') && track_form_4.classList.contains('hide')){
        track_form_4.classList.remove('hide')
        track_form_4.classList.add('visible')
        track_remove_3.classList.add('hide')
        track_remove_4.classList.remove('hide')
    }else if(track_form_4.classList.contains('visible') && track_form_5.classList.contains('hide')){
        track_form_5.classList.remove('hide')
        track_form_5.classList.add('visible')
        track_remove_4.classList.add('hide')
        track_remove_5.classList.remove('hide')
    }
})



track_remove_2.addEventListener("click", (e) => {
    if(track_form_2.classList.contains('visible') && track_form_3.classList.contains('hide')){
    track_form_2.classList.add('hide')
    track_form_2.classList.remove('visible')
    track_name_2.value = ""
    track_file_2.value = ""
    }else{
        //nothings
    }
})






track_remove_3.addEventListener("click", (e) => {
    if(track_form_3.classList.contains('visible') && track_form_4.classList.contains('hide')){
    track_form_3.classList.add('hide')
    track_form_3.classList.remove('visible')
    track_remove_2.classList.remove('hide')
    track_name_3.value = ""
    track_file_3.value = ""
    }else{
        //nothings
    }
})


track_remove_4.addEventListener("click", (e) => {
    if(track_form_4.classList.contains('visible') && track_form_5.classList.contains('hide')){
    track_form_4.classList.add('hide')
    track_form_4.classList.remove('visible')
    track_remove_3.classList.remove('hide')
    track_name_4.value = ""
    track_file_4.value = ""
    }else{
        //nothings
    }
})

track_remove_5.addEventListener("click", (e) => {
    if(track_form_5.classList.contains('visible')){
    track_form_5.classList.add('hide')
    track_form_5.classList.remove('visible')
    track_remove_4.classList.remove('hide')
    track_name_5.value = ""
    track_file_5.value = ""
    }else{
        //nothings
    }
})