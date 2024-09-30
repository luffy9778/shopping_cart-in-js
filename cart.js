const  cartSection = document.getElementById("cartSection");
const  decBtn = document.getElementById("decBtn");
let cart
const getCart=()=>{
  cart=JSON.parse(localStorage.getItem("cart"))||[] 
}
const totalAmount=()=>{
  if(cart.length){
    const tAmount=document.getElementById("tAmount")
  const total=cart.reduce((a,b)=>a+(b.prize*(b.quantity||1)),0)
  if (!tAmount) {
    const element=document.createElement("h3")
    element.id="tAmount"
    element.innerText=`Total Amount:${total}`
    cartSection.appendChild(element)
  }
  else{
    tAmount.innerText=`Total Amount:${total}`
  }}
}
const generateCartItems=()=>{
  getCart()
  cartSection.innerHTML=!cart.length?"<p>Cart is Empty...</p><a href='./home.html'>go to home</a>":cart.map(i=>`<div
          class="card mb-3 mx-auto my-5 bg-light border-0"
          style="max-width: 740px"
        >
          <div class="row g-0 cartItem" id="${i.id}">
            <div class="col-md-4">              
                <img
                  src=${i.image}
                  class="img-fluid rounded-start h-100"
                  alt="..."
                />            
            </div>
            <div class="col-md-8">
              <div class="card-body">               
                <h5 class="card-title">${i.name}</h5>
                <p class="card-text">
                ${i.discription.lenth<15?i.discription.length:(`${i.discription.slice(0,20)}...`)}
                </p>
                <p class="card-text">
                  $${i.prize}
                </p>
                <div>
                  <button class="btn btn-light" id="decBtn" onclick="decrement(${i.id})">-</button><span id="counter${i.id}">${i.quantity?i.quantity:"1"}</span
                  ><button class="btn btn-light"  id="incBtn" onclick="increment(${i.id})">+</button>
  
                </div>
                <button class="btn btn-danger" onclick="removeItem(${i.id})">Remove</button>
              
              </div>
            </div>
          </div>
        </div>`)
        .join('')
        totalAmount()
        
}
generateCartItems()

const increment=(id)=>{
  event.stopPropagation()
  let item=cart.find(i=>i.id==id)
  !item?alert("something  went wrong"):item.quantity?item.quantity+=1:(item.quantity=2)
  updateCount(id)
  localStorage.setItem("cart",JSON.stringify(cart))
  totalAmount()
}

const decrement=(id)=>{
  event.stopPropagation()
  let item=cart.find(i=>i.id==id)
  if (!item) {
   return alert("something  went wrong");
  }else if (!item.quantity) {
    return item.quantity=1
  }
  else if (item.quantity==1) return
  else{
    item.quantity-=1
  }
  updateCount(id)
  localStorage.setItem("cart",JSON.stringify(cart))
  totalAmount()
}

const updateCount=(id)=>{
  const item=cart.find(i=>i.id==id)
  document.getElementById(`counter${id}`).innerText=item.quantity
}

const removeItem=(id)=>{
  event.stopPropagation()
  const newCart=cart.filter(i=>i.id!=id)
  localStorage.setItem("cart",JSON.stringify(newCart))
  generateCartItems()
}

  document.querySelectorAll(".cartItem").forEach((i)=>{
    i.addEventListener("click",()=>{
      window.location.href=`./singleItemPage.html?id=${i.id}`
    })
  })

