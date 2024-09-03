let currentIndex= 1;
function displaySlide(index){
  currentIndex= index;
  let slides= document.getElementsByClassName("slide");
  let dots= document.getElementsByClassName("dot");
  if(currentIndex> slides.length){
    currentIndex = 1;
  }
  if(currentIndex< 1){
    currentIndex = slides.length;
  }
  for(let i= 0; i< slides.length; i++){
    slides[i].style.display= "none";
    dots[i].className= dots[i].className.replace(" active", "");
  }
  slides[currentIndex - 1].style.display= "block";
  dots[currentIndex - 1].className= "dot active";
}
displaySlide(currentIndex);
function changeSlide(index){
  currentIndex+= index;
  displaySlide(currentIndex);
}
function currentSlide(index){
  displaySlide(index);
}
const slideButtons= document.querySelectorAll(".slide-button");
let selectedButton= slideButtons[0];
selectedButton.classList.add("selected")
document.querySelectorAll(".slide-button").forEach(button =>{
  button.addEventListener("click", () =>{
    if(selectedButton){
      selectedButton.classList.remove("selected");
    }
    button.classList.add("selected");
    selectedButton= button;
    const slide= button.getAttribute("data-brand");
  })
})