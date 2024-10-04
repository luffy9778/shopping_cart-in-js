const cart=JSON.parse(localStorage.getItem("cart"))||[]
const urlParams=new URLSearchParams(window.location.search)
const itemId=urlParams.get("id")
const singleItemSection=document.getElementById("singleItemSection")
const item= data.find((i)=>i.id==itemId)
const alertComponent=document.getElementById("alert")


const getCart=()=>{
  // cart=JSON.parse(localStorage.getItem("cart"))
  if(cart.length){
    let len=cart.reduce((a,b)=>a+(b.quantity||1),0)
    document.getElementById("cartIcon").innerHTML=`<span class='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>${len==0?"":len}</span>`
  }
}
getCart()
singleItemSection.innerHTML=(`<div class="card mb-3 mx-auto border-0 bg-light" style="max-width: 940px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${item.image}" class="img-fluid rounded-start h-100" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                  <p class="card-text">₹${item.prize}</p>
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
    alertComponent.innerHTML="<i class='fa-solid fa-circle-check px-2'></i>item add to cart "
    alertComponent.classList.add("success")
    setTimeout(() => {
      alertComponent.classList.remove("success")
    }, 1500);
    localStorage.setItem("cart",JSON.stringify(cart))
    getCart()
    }
    else{
      alertComponent.innerHTML="<i class='fa-solid fa-circle-exclamation px-2'></i>item already in cart"
      alertComponent.classList.add("info")
      setTimeout(() => {
        alertComponent.classList.remove("info")
      }, 1500);
    }
    
}
