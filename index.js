const baseUrl = "https://fakestoreapi.com/products";
const main_container = document.querySelector(".container");
const product_container = document.querySelector(".products-index");
const product_card = document.getElementsByClassName("product-index");
const filter_selection = document.querySelector("select");
const cartIcon = document.getElementById("cart");
// const cartCount = cartIcon.querySelector("span");

let cartItems = [];

function newProducts(product) {
  const image = document.createElement("img");
  image.setAttribute("src", product.image);
  image.classList.add("product_img");

  const image_box = document.createElement("div");
  image_box.setAttribute("class", "img-box");
  image_box.append(image);

  const title = document.createElement("h4");
  title.innerText = product.title;

  const category = document.createElement("span");
  category.innerText = product.category;

  const price = document.createElement("p");
  price.innerHTML = `$<span>${product.price}</span>`;

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  button.setAttribute("class", "add_to_cart");

  const details_box = document.createElement("div");
  details_box.setAttribute("class", "details");
  details_box.append(title, category, price, button);

  const new_product_card = document.createElement("div");
  new_product_card.classList.add("product-index");

  new_product_card.append(image_box, details_box);
  return new_product_card;
}

async function getAllProducts() {
  try {
    let result = await fetch(baseUrl);
    let products = await result.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function mountProducts() {
  let products = await getAllProducts();
  let product_cards = products.map((product) => newProducts(product));
  console.log(product_cards)
  product_container.append(...product_cards);
}
// filter
filter_selection.addEventListener("change", mountFiltered);
async function filterProducts() {
  try {
    const selectedCategory = filter_selection.value;
    if(selectedCategory==="all"){
      const filtered_items = await fetch(
        `https://fakestoreapi.com/products`
      );
      let products = await filtered_items.json();
      console.log(products)
      return products;
    }else{
      const filtered_items = await fetch(
        `https://fakestoreapi.com/products/category/${selectedCategory}`
      );
      let products = await filtered_items.json();
      console.log(products)
      return products;
    }
  } catch (error) {
    return error;
  }
}
//Mount filtered
async function mountFiltered() {
  let products = await filterProducts();
  let product_cards = products.map((product) => newProducts(product));
  product_container.innerHTML=" "
  product_container.append(...product_cards);
}

let products = [];

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    // Iterate over the fetched products and add inCart and set to 0
    products = data.map((product) => ({
      ...product,
      inCart: 0,
    }));

    // console.log(products);
  })
  .catch((error) => console.log(error));

async function addCart() {
  let result = await mountProducts();
  let carts = document.querySelectorAll(".add_to_cart");
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      alert("Product added");
      cartNumbers(products[i]);
      totalCost(products[i]);
    });
  }
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector("#cart span").textContent = productNumbers;
  }
}
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  //   console.log(productNumbers);
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector("#cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector("#cart span").textContent = 1;
  }
  setItems(product);
}
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  // console.log(cartItems);
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.title] == undefined) {
      cartItems = {
        ...cartItems,
        [product.title]: product,
      };
    }
    cartItems[product.title].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.title]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  // console.log("Product price",product.price)
  let cartCost = localStorage.getItem("totalCost");
  console.log("cartCost is", cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}
addCart();
onLoadCartNumbers();

