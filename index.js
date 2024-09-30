const cart=JSON.parse(localStorage.getItem("cart"))||[]
const homeSection = document.getElementById("homeSection");
const alertComponent=document.getElementById("alert")

homeSection.innerHTML = data.map(
  (i) =>
    `<div class="col-md-4 my-4 shopItem" id="${i.id}">
    <div class="card  border-0" style="width: 17rem; ">
      <img class="card-img-top" src=${i.image} />
      <div class="card-body text-center">
        <h5 class="card-title">${i.name}</h5>
        <p class="card-text">${i.discription.length<15?i.discription.length:(`${i.discription.slice(0,20)}...`)}</p>
        <p class="card-text">${i.prize}</p>
        <button class="btn btn-primary mt-md-3" onclick=addToCart(${i.id})>Add To Cart</button>
      </div>
    </div>
  </div>`
).join("");
const  addToCart = (i) =>{
event.stopPropagation()
  const checkCart=cart.find(x=>x.id==i)
  if(!checkCart){
    const b=data.find(a=>a.id==i)
    cart.push(b)
    // alert("item add to cart")
    alertComponent.innerText="item add to cart"
    alertComponent.classList.add("success")
    setTimeout(() => {
      alertComponent.classList.remove("success")
    }, 1500);
    localStorage.setItem("cart",JSON.stringify(cart))
  }
  else{
    // alert("item already in cart")
    alertComponent.innerText="item already in cart"
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



