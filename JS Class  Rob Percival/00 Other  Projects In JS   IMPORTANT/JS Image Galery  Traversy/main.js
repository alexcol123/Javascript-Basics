const current = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img')
const opacity = 0.4;

// set 1st image opacity
imgs[0].style.opacity = opacity;

imgs.forEach(img =>
img.addEventListener('click',imgClick));

function imgClick(e){
// Rest the opacity
 imgs.forEach(img =>(img.style.opacity = 1));

// Change current img to src of click img
current.src = e.target.src;

// add fade in class
current.classList.add('fade-in');

// remove fade in class
setTimeout(() => current.classList.remove('fade-in'),550);

// change opacity to opacity var
e.target.style.opacity = opacity;
}
