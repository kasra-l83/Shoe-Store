import { getSessionToken } from "../libs/session-manager";
const id= localStorage.getItem("product-id");
const token= getSessionToken();
const productContainer= document.getElementById("product");
const countDisplay= document.getElementById("count");
const Add= document.getElementById("add");
const Remove= document.getElementById("remove");
let count= 0;
function renderList(id){
  productContainer.innerHTML= "";
  const xhttp= new XMLHttpRequest();
  xhttp.onreadystatechange= function(){
    if(this.readyState=== 4){
      if(this.status=== 200){
        const productData= JSON.parse(this.responseText);
        console.log(productData);
        const colors= productData.colors.split("|");
        const sizes= productData.sizes.split("|");
        console.log(colors);
        console.log(sizes);
        productContainer.innerHTML=`
          <img src= '${productData.imageURL}' class= "w-full">
          <h1 class="font-bold text-[35px] mt-5 mb-3 truncate w-[85%]">${productData.name}</h1>
          <i style="font-size:30px" class="fa absolute right-6 mt-[-52px]">&#xf08a;</i>
          <span class= "flex justify-around mb-3 w-[70%]">
            <h6 class= "bg-gray-300 inline px-1 rounded-md">5,371 sold<h6>
            <i style="font-size:20px" class="fa mt-1">&#xf123;</i>
            <h6 class= "mt-1">4.3 (5,389 reviews)</h6>
          </span>
          <div class= "py-3 border-y-2">
            <h4 class="font-semibold text-[25px]">Description</h4>
            <p class= "line-clamp-2 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti delectus voluptate sunt et quae exercitationem magni, necessitatibus sapiente laudantium odit in quisquam itaque qui ab at possimus minus commodi.</p>
            <div>
              <div class= "flex justify-between w-[60%] mb-5">
                <h3 class="font-semibold text-[25px]">Size</h3>
                <h3 class="font-semibold text-[25px]">Color</h3>
              </div>
                <div class= "flex w-full justify-between">
                  <div id= "size-list" class= "flex mr-12"></div>
                  <div id= "color-list" class= "flex justify-between overflow-x-auto snap-x"></div>
                </div>
            </div>
          </div>
          <div class= "flex justify-between absolute top-[850px]">
            <div class= "mr-5">
              <p class="text-gray-500">Total price</p>
              <h3 id= "price" class="text-3xl font-semibold mt-1">$${productData.price}.00</h3>
            </div>
            <div>
              <i style="font-size:16px" class="fa text-white absolute left-40 top-5">&#xf290;</i>
              <button class="text-lg bg-black text-white px-20 py-4 rounded-full">Add to Cart</button>
            </div>
          </div>
          `
          const sizeList= document.getElementById("size-list");
          sizes.forEach(size =>{
            const button= document.createElement("button");
            button.classList.add("size-button");
            button.textContent= size;
            button.style.border= "solid 1px black";
            button.style.width= "40px";
            button.style.height= "40px";
            button.style.borderRadius= "50%";
            button.style.marginRight= "5px"
            sizeList.appendChild(button);
          })
          const colorList= document.getElementById("color-list");
          colors.forEach(color =>{
            const button= document.createElement("button");
            button.style.border= "solid 1px black";
            button.style.width= "40px";
            button.style.height= "40px";
            button.style.borderRadius= "50%";
            button.style.backgroundColor= color;
            button.style.marginRight= "5px"
            colorList.appendChild(button);
          })
          const sizeButton= document.querySelectorAll(".size-button");
          let selectedButton= null;
          sizeButton.forEach(button =>{
            button.addEventListener("click", () =>{
              if(selectedButton){
                selectedButton.classList.remove("selected");
              }
              button.classList.add("selected");
              selectedButton= button;
            })
          })
        }else{
          console.error("error", this.status, this.statusText);
        }
      }
    }
    xhttp.open("GET", `http://localhost:3000/sneaker/item/${id}`, true);
    xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
    xhttp.send();
}
renderList(id);
const Count= document.getElementById("count");
let variable= 0
document.getElementById("add").addEventListener("click", () =>{
  variable++;
  Count.innerText= variable;
})
document.getElementById("remove").addEventListener("click", () =>{
  if(variable> 0){
    variable--;
    Count.innerText= variable;
  }
})