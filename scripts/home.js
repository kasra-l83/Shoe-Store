import { data } from "autoprefixer";
import { getUserInfo } from "../apis/services/user.service";
import { errorHandler } from "../libs/error-handler";
import { getSneakers } from "../apis/services/sneaker.service";
import { getSessionToken } from "../libs/session-manager";
const userName= document.getElementById("username");
async function main(){
  try{
    const response= await getUserInfo();
    userName.innerText= response.username;
  }catch(error){
    errorHandler(error);
  }
}
main();

function getGreetingMessage(){
  const now= new Date();
  const hours= now.getHours();
  let message;
  if(hours>= 6 && hours< 11){
    message= "Good Morning";
  }else if(hours>= 11 && hours< 16) {
    message= "Good Afternoon";
  }else if(hours>= 16 && hours< 21) {
    message= "Good Evening";
  }else{
    message= "Good Night";
  }
  return message;
}
document.getElementById("greeting").textContent= getGreetingMessage() + " 👋";

const Logout= document.getElementById("logout");
Logout.addEventListener("click", () =>{
  localStorage.removeItem(token);
  window.location.href= "/login";
})

const token= getSessionToken();
const xhttp= new XMLHttpRequest();
const sneakerDataContainer= document.getElementById("sneaker-data");
const paginationContainer= document.getElementById("pagination")
function renderList(pages){
  sneakerDataContainer.innerHTML= "";
  paginationContainer.innerHTML= "";
  xhttp.onreadystatechange= function(){
    if(this.readyState=== 4){
      if(this.status=== 200){
        const sneakerData= JSON.parse(this.responseText);
        for(const sneaker of sneakerData.data){
          const div= document.createElement("div");
          div.classList.add("card");
          div.id= `${sneaker.id}`;
          div.innerHTML= `
          <img src= '${sneaker.imageURL}' class="rounded-3xl size-[182px]">
            <h2 class= "truncate" id= "title">${sneaker.name}</h2>
            <h4>$ ${sneaker.price}.00</h4>
          `
          sneakerDataContainer.appendChild(div);
          div.addEventListener("click", () =>{
            console.log(div.id);
            window.location.href= `/item`
          })
        }
        for(let i= 1; i<= sneakerData.totalPages; i++){
          const button= document.createElement("button");
          button.classList.add("button");
          button.innerText= i;
          paginationContainer.appendChild(button);
          button.addEventListener("click", () =>{
            renderList(i);
          })
        }
      }else{
        console.error("error", this.status, this.statusText);
      }
    }
  }
  xhttp.open("GET", `http://localhost:3000/sneaker?page=${pages}&limit=10`, true);
  xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
  xhttp.send();
}
renderList(1);

const brandButtons= document.querySelectorAll(".brand-button");
let selectedButton= brandButtons[0];
selectedButton.classList.add("selected")
document.querySelectorAll(".brand-button").forEach(button =>{
  button.addEventListener("click", () =>{
    if(selectedButton){
      selectedButton.classList.remove("selected");
    }
    button.classList.add("selected");
    selectedButton= button;
    const brand= button.getAttribute("data-brand");
    brands(1,brand);
  })
})

function brands(pages, brand){
  sneakerDataContainer.innerHTML= "";
  paginationContainer.innerHTML= "";
  xhttp.onreadystatechange= function(){
    if(this.readyState=== 4){
      if(this.status=== 200){
        const sneakerData= JSON.parse(this.responseText);
        for(const sneaker of sneakerData.data){
          const div= document.createElement("div");
          div.id= `${sneaker.id}`;
          div.innerHTML= `
          <img src= '${sneaker.imageURL}' class="rounded-3xl size-[182px]">
            <h2 class= "truncate" id= "title">${sneaker.name}</h2>
            <h4>$ ${sneaker.price}.00</h4>
          `
          sneakerDataContainer.appendChild(div);
          div.addEventListener("click", () =>{
            console.log(div.id);
            setTimeout(() =>{
              window.location.href= `/item`
          }, 2000)
          })
        }
        for(let i= 1; i<= sneakerData.totalPages; i++){
          const button= document.createElement("button");
          button.classList.add("button");
          button.innerText= i;
          paginationContainer.appendChild(button);
          button.addEventListener("click", () =>{
            brands(i, brand);
          })
        }
      }else{
        console.error("error", this.status, this.statusText);
      }
    }
  }
  xhttp.open("GET", `http://localhost:3000/sneaker?page=${pages}&limit=10&brands=${brand}`, true);
  xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
  xhttp.send();
}
document.getElementById("all").addEventListener("click", () =>{
  sneakerDataContainer.innerHTML= "";
  renderList(1);
})
const Nike= document.getElementById("nike")
Nike.addEventListener("click", () =>{
  brands(1, "NIKE");
})
document.getElementById("addidas").addEventListener("click", () =>{
  brands(1, "ADDIDAS");
  const dev= document.createElement("div");
  dev.classList.add("empty");
  dev.innerHTML= `
    <img src= "img/empty.png" class= "mb-3">
    <h2 class= "text-xl font-black mb-3">Not Found</h2>
    <p class= " text-center">Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</p>
  `
  sneakerDataContainer.appendChild(dev);
})
document.getElementById("puma").addEventListener("click", () =>{
  brands(1, "PUMA");
})
document.getElementById("asics").addEventListener("click", () =>{
  brands(1, "ASICS");
})
document.getElementById("reebok").addEventListener("click", () =>{
  brands(1, "REEBOK");
})
document.getElementById("new-balance").addEventListener("click", () =>{
  brands(1, "NEW BALANCE");
})
document.getElementById("converse").addEventListener("click", () =>{
  brands(1, "CONVERSE");
})