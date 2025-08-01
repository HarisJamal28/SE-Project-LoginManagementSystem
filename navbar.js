const togglebtn = document.querySelector('.toggle-btn')
const togglebtnicon = document.querySelector('.toggle-btn i')
const dropDownNav = document.querySelector('.dropdown-nav')

togglebtn.onclick = function (){
dropDownNav.classList.toggle('open')
}