const Password= document.getElementById("password");
  unhide= document.getElementById("unhide");
  hide= document.getElementById("hide");
unhide.style.display= "block";
hide.style.display= "none";
function togglePass() {
    if (Password.type === "password") {
      Password.type = "text";
      unhide.setAttribute("hidden", true);
      hide.removeAttribute("hidden");
      unhide.style.display= "none";
      hide.style.display= "block";
    } else {
      Password.type = "password";
      unhide.removeAttribute("hidden");
      hide.setAttribute("hidden", true);
      unhide.style.display= "block";
      hide.style.display= "none";
    }
}
const form= document.querySelector(".form");
  inputs= form.querySelectorAll("input");
  Submit= document.getElementById("submit");
function check(){
  let fill= true;
  inputs.forEach(input =>{
    if(input.value.trim()=== ""){
      fill= false;
    }
  })
  Submit.disabled= !fill;
}
check();
inputs.forEach(input =>{
  input.addEventListener("input", check);
})