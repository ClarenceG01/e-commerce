function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  console.log(cartItems);
  if (cartItems && productContainer) {
    // console.log("run");
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class="product">
          <div class="left">
            <img class="product-image" src=${item.image}>
            <p>${item.title}</p>
          </div>
          <div class="right">
            <div class="add-count">
              <i id="plus-count" class="fa-solid fa-circle-plus" style="color: #ff702a"></i>
              <p>${item.inCart}</p>
              <i id="minus-count" class="fa-solid fa-circle-minus" style="color: #ff702a"></i>
            </div>
            <span class="span-price"><b>Price:</b> $ <span class="amount">${item.price*item.inCart}</span></span>
          </div>      
        </div>    
        `
      // let total_price=0;
      // let one_product_price=item.price*item.inCart
      // total_price+=one_product_price
      // console.log(total_price);
      const price=document.querySelector(".amount").innerText
      amount=Number(price)
      console.log(amount);
    });

  } else {
    // console.log("not");
  }
}
displayCart();
// enable adding elements in checkout
// const plus=document.querySelectorAll('#plus-count');
// console.log(plus);
// plus.addEventListener("click",()=>{
//   let cartItems = localStorage.getItem("productsInCart");
//   console.log(cartItems);
// })

// enable decrease elements on checkout

// tota price