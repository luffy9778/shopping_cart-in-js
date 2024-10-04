const cart=JSON.parse(localStorage.getItem("cart"))||[]
const homeSection = document.getElementById("homeSection");
const alertComponent=document.getElementById("alert")
const input=document.getElementById("search")

// let cart
const getCart=()=>{
  // cart=JSON.parse(localStorage.getItem("cart"))||[]
  if(cart){
    let len=cart.reduce((a,b)=>a+(b.quantity||1),0)
    document.getElementById("cartIcon").innerHTML=`<span class='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>${len==0?"":len}</span>`
  }
}

let search=[]
input.addEventListener("input",()=>{
   search=data.filter(i=>input.value.toLowerCase()==i.name.toLowerCase())
   generateHome()
})
function generateHome(){
  getCart()
  let items=search.length?search:data
homeSection.innerHTML = items.map(
  (i) =>{
    let{id,name,description,image,prize}=i
    return `<div class="col-md-4 col-sm-6 my-md-4 shopItem" id="${id}">
    <div class="card  border-0" style="width: 17rem; ">
      <img class="card-img-top" src=${image} />
      <div class="card-body text-center">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description.length<15?description.length:(`${description.slice(0,20)}...`)}</p>
        <p class="card-text">₹${prize}</p>
        <button class="btn btn-primary" onclick=addToCart(${id})>Add To Cart</button>
      </div>
    </div>
  </div>`}
).join("");}
generateHome()
const  addToCart = (i) =>{
event.stopPropagation()
  const checkCart=cart.find(x=>x.id==i)
  if(!checkCart){
    const item=data.find(a=>a.id==i)
    cart.push(item)
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
document.querySelectorAll(".shopItem").forEach((i)=>{
  i.addEventListener("click",()=>{
    window.location.href=`./singleItemPage.html?id=${i.id}`
  })
})


  


