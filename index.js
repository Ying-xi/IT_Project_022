const registersec=document.querySelector('.right-wrapper')
const loginBtn=document.querySelector('.button-login')
const registerBtn=document.querySelector('.button-register')
registerBtn.addEventListener('click',()=>{
    registersec.classList.add('.active')
})
loginBtn.addEventListener('click',()=>{
    registersec.classList.remove('.active')
})