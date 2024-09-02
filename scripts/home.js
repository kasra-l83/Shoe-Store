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

const token= getSessionToken();
const xhttp= new XMLHttpRequest();
const sneakerDataContainer= document.getElementById("sneaker-data");
function renderList(pages){
  xhttp.onreadystatechange= function(){
    if(this.readyState=== 4){
      if(this.status=== 200){
        const sneakerData= JSON.parse(this.responseText);
        for(const sneaker of sneakerData.data){
          const div= document.createElement("div");
          div.classList.add("card");
          div.innerHTML= `
          <img src= '${sneaker.imageURL}' class="rounded-3xl size-[182px]">
            <h2 class= "truncate" id= "title">${sneaker.name}</h2>
            <h4>$ ${sneaker.price}.00</h4>
          `
          sneakerDataContainer.appendChild(div);
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
function brands(pages, brand){
  xhttp.onreadystatechange= function(){
    if(this.readyState=== 4){
      if(this.status=== 200){
        const sneakerData= JSON.parse(this.responseText);
        for(const sneaker of sneakerData.data){
          const div= document.createElement("div");
          div.classList.add("card");
          div.innerHTML= `
          <img src= '${sneaker.imageURL}' class="rounded-3xl size-[182px]">
            <h2 class= "truncate" id= "title">${sneaker.name}</h2>
            <h4>$ ${sneaker.price}.00</h4>
          `
          sneakerDataContainer.appendChild(div);
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
  sneakerDataContainer.innerHTML= "";
  brands(1, "NIKE");
})
document.getElementById("addidas").addEventListener("click", () =>{
  sneakerDataContainer.innerHTML= "";
  brands(1, "ADDIDAS");
})
document.getElementById("puma").addEventListener("click", () =>{
  sneakerDataContainer.innerHTML= "";
  brands(1, "PUMA");
})
document.getElementById("asics").addEventListener("click", () =>{
  sneakerDataContainer.innerHTML= "";
  brands(1, "ASICS");
})
document.getElementById("reebok").addEventListener("click", () =>{
  sneakerDataContainer.innerHTML= "";
  brands(1, "REEBOK");
})
document.getElementById("new-balance").addEventListener("click", () =>{
  sneakerDataContainer.innerHTML= "";
  brands(1, "NEW BALANCE");
})
document.getElementById("converse").addEventListener("click", () =>{
  sneakerDataContainer.innerHTML= "";
  brands(1, "CONVERSE");
})