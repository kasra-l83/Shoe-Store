import { getSessionToken } from "../libs/session-manager";
const id= localStorage.getItem("product-id");
const token= getSessionToken();
const productContainer= document.getElementById("product");
const countDisplay= document.getElementById("count");
const Add= document.getElementById("add");
const Remove= document.getElementById("remove");
let count= 0;
function renderList(aa){
    productContainer.innerHTML= "";
    const xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
      if(this.readyState=== 4){
        if(this.status=== 200){
          const productData= JSON.parse(this.responseText);
          console.log(productData.sizes);
          productContainer.innerHTML=`
          <img src= '${productData.imageURL}' class= "w-full">
            <h1 class="font-bold text-[35px] mt-5 mb-3 truncate w-[85%]">${productData.name}</h1>
            <i style="font-size:30px" class="fa absolute right-6 mt-[-40px]">&#xf08a;</i>
            <span class= "flex justify-around mb-3 w-[75%]">
                <h6 class= "bg-gray-300 inline px-4 py-2 rounded-md">5371 sold<h6>
                <i style="font-size:30px" class="fa mt-1">&#xf123;</i>
                <h6 class= "mt-1">4.3 (5,389 reviews)</h6>
            </span>
            <div class= "py-3 border-y-2">
                <h4 class="font-semibold text-[25px]">Description</h4>
                <p class= "truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti delectus voluptate sunt et quae exercitationem magni, necessitatibus sapiente laudantium odit in quisquam itaque qui ab at possimus minus commodi.</p>
                <div class= "flex justify-between">
                    <div>
                        <h3 class="font-semibold text-[25px]">Size</h3>
                    </div>
                    <div>
                        <h3 class="font-semibold text-[25px]">Color</h3>
                    </div>
                </div>
                <span>
                    <h4 class="font-semibold text-[25px]">Quantity</h4>
                    <button id= "add">+</button>
                    <span id= "count">0</span>
                    <button id= "remove">-</button>
                </span>
            </div>
          `
        }else{
          console.error("error", this.status, this.statusText);
        }
      }
    }
    xhttp.open("GET", `http://localhost:3000/sneaker/item/${aa}`, true);
    xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
    xhttp.send();
}
renderList(id);
Add.addEventListener("click", () =>{
    count++;
    countDisplay.innerText= count;
});
Remove.addEventListener("click", () =>{
    count--;
    countDisplay.innerText= count;
});