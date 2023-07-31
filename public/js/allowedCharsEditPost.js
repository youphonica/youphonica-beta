const title = document.getElementById('title')
const desc = document.getElementById('desc')
const file = document.getElementById('file')
const year = document.getElementById('year')
const month = document.getElementById('month')
const genre = document.getElementById('genre')
const type = document.getElementById('type')
const visibility = document.getElementById('visibility')
const price = document.getElementById('price')
const form = document.getElementById('form')
const submit = document.getElementById('submit')
const spinner = document.querySelector('.box')
const allowedCharsTitle = /^[a-zA-Z0-9 _?&()_.',"!-]{5,60}$/
const allowedCharsDesc = /^[a-zA-Z0-9 &()_.',"!-]{50,350}$/
const years = [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
const genres = ['pop', 'rock', 'metal', 'rap/hip hop', 'jazz', 'instrumental', 'classical', 'funk', 'rnb', 'blues', 'country', 'acoustic', 'swing', 'synthwave']
const priceRegex = /^\d+(.\d{1,2})?$/
const invalidName = document.getElementById('invalid-name')
const invalidDesc = document.getElementById('invalid-desc')



submit.addEventListener('click', e => {
    const concertTitle = title.value
    const description = desc.value
    const pricing = price.value
    const validTitle = allowedCharsTitle.test(concertTitle)
    const validDesc = allowedCharsDesc.test(description)
    const validPrice = priceRegex.test(pricing)

    
if(validTitle){
    title.classList.remove('invalid')
    title.classList.add('valid')
    invalidName.classList.add('none')
}if (!validTitle){
    title.classList.add('invalid')   
    invalidName.classList.remove('hide')
    e.preventDefault()
    e.stopPropagation()
}if(validDesc){
    desc.classList.remove('invalid')
    desc.classList.add('valid')
    invalidDesc.classList.add('hide')
}if (!validDesc){
    desc.classList.add('invalid')
    invalidDesc.classList.remove('hide')  
    e.preventDefault()
    e.stopPropagation()
}if(validPrice){
    price.classList.remove('invalid')
    price.classList.add('valid')
}if (!validPrice){
    price.classList.add('invalid')   
    e.preventDefault()
    e.stopPropagation()
}else{
    
}})