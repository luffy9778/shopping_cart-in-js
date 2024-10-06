const cartSection = document.getElementById("cartSection");
const decBtn = document.getElementById("decBtn");
const input = document.getElementById("search");

let cart;
let search = [];

const getCart = () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
};

const totalAmount = () => {
  const amountSection = document.getElementById("amount");
  if (cart.length) {
    const tAmount = document.getElementById("tAmount");
    const total = cart.reduce((a, b) => a + b.prize * (b.quantity || 1), 0);
    if (!tAmount) {
      const element = document.createElement("h3");
      element.id = "tAmount";
      element.innerText = `Total Amount:${total}`;
      const checkout = document.createElement("button");
      checkout.id = "checkout";
      checkout.classList.add("btn","btn-info","text-white")
      // checkout.classList.add("btn-info")
      checkout.innerText = "checkout";
      checkout.onclick = checkoutFn;
      amountSection.appendChild(element);
      amountSection.appendChild(checkout);
    } else {
      tAmount.innerText = `Total Amount:${total}`;
    }
  } else {
    amountSection.innerHTML = "";
  }
};

async function checkoutFn() {
  // alert("payment successfull")
  await showAlert("payment successfull", "success");
  window.location.href = "./orderPage.html";
  cart = [];
  localStorage.removeItem("cart");
}

input.addEventListener("input", () => {
  search = cart.filter(
    (i) => input.value.toLowerCase() == i.name.toLowerCase()
  );
  generateCartItems();
});

const generateCartItems = () => {
  getCart();
  let items = search.length ? search : cart;
  totalAmount();
  cartSection.innerHTML = !cart.length
    ? "<div class='d-flex justify-content-center align-items-center w-100 vh-100 '><p><h3>Cart is Empty...</h3><a href='./home.html'>go to home</a></p></div>"
    : items
        .map(
          (i) => `<div
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
                ${
                  i.description.length < 15
                    ? i.description
                    : `${i.description.slice(0, 20)}...`
                }
                </p>
                <p class="card-text">
                  ₹${i.prize}
                </p>
                <div>
                  <button class="btn btn-light" id="decBtn" onclick="decrement(${
                    i.id
                  })">-</button><span id="counter${i.id}">${
            i.quantity ? i.quantity : "1"
          }</span
                  ><button class="btn btn-light"  id="incBtn" onclick="increment(${
                    i.id
                  })">+</button>
                </div>
                <button class="btn btn-danger" onclick="removeItem(${
                  i.id
                })">Remove</button>
              </div>
            </div>
          </div>
        </div>`
        )
        .join("");
};
generateCartItems();

const increment = (id) => {
  event.stopPropagation();
  let item = cart.find((i) => i.id == id);
  !item
    ? alert("something  went wrong")
    : item.quantity
    ? (item.quantity += 1)
    : (item.quantity = 2);
  updateCount(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  totalAmount();
};

const decrement = (id) => {
  event.stopPropagation();
  let item = cart.find((i) => i.id == id);
  if (!item) {
    return alert("something  went wrong");
  } else if (!item.quantity) {
    return (item.quantity = 1);
  } else if (item.quantity == 1) return;
  else {
    item.quantity -= 1;
  }
  updateCount(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  totalAmount();
};

const updateCount = (id) => {
  const item = cart.find((i) => i.id == id);
  document.getElementById(`counter${id}`).innerText = item.quantity;
};

const removeItem = (id) => {
  event.stopPropagation();
  const newCart = cart.filter((i) => i.id != id);
  localStorage.setItem("cart", JSON.stringify(newCart));
  generateCartItems();
};

const showAlert = (msg, status) => {
  return new Promise((res, rej) => {
    const alertBox = document.getElementById("alert");
    alertBox.innerHTML = `${msg}<button id="alertColsebtn">Ok</button>`;
    alertBox.classList.add(status);
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    function closeAlert() {
      alertBox.classList.remove(status);
      alertBox.innerHTML = "";
      overlay.style.display = "none";
      res();
    }
    const alertColsebtn = document.getElementById("alertColsebtn");
    alertBox.addEventListener("click", closeAlert);
  });
};
document.querySelectorAll(".cartItem").forEach((i) => {
  i.addEventListener("click", () => {
    window.location.href = `./singleItemPage.html?id=${i.id}`;
  });
});
