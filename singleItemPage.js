const cart=JSON.parse(localStorage.getItem("cart"))||[]
const urlParams=new URLSearchParams(window.location.search)
const itemId=urlParams.get("id")
const singleItemSection=document.getElementById("singleItemSection")
const item= data.find((i)=>i.id==itemId)
singleItemSection.innerHTML=(`<div class="card mb-3 mx-auto border-0 bg-light" style="max-width: 940px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${item.image}" class="img-fluid rounded-start h-100" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.discription}</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  <button class="btn btn-primary" onclick=addToCart(${item.id})>Add To Cart</button>
                </div>
              </div>
            </div>
          </div>`)

const  addToCart = (i) =>{
    const checkCart=cart.find(x=>x.id==i)
    if(!checkCart){
    const b=data.find(a=>a.id==i)
    cart.push(b)
    alert("item add to cart")
    localStorage.setItem("cart",JSON.stringify(cart))
    }
    else{
    alert("item already in cart")
    }
}
