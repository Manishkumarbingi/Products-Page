
let products;
const products_display = document.getElementById("products_display");
const new_product = document.getElementById("new_product");
const get_products = async () => {
  try {
    const response = await (fetch("http://localhost:3001/products"));
    const data = await response.json();
    products = data;
    if (response.ok) {
      console.log("Product fetching succesful")
    } else {
      console.log("Unable to fetch products from server Try again")
    }
  } catch (error) {
    console.log("Trouble with connection of backend Try again")
    console.log(error)
  }
  

}

get_products().then(() => {

  products.forEach(product => {
    let element = document.createElement("div");
    element.className = " card rounded-4xl m-5 p-5 flex flex-col justify-center items-center border-b-white border-2";
    element.innerHTML = `
    <img class="h-80 md:h-70 lg:h-60 xl:h-50 rounded-2xl" src="${product['imageUrl']}">
      <p class="name p-2 text-4xl lg:text-3xl text-orange-400">${product['name']}</p>
      <p class="price p-2 text-green-400 text-3xl lg:text-2xl lg:p-1 ">&#8377; ${product['price']}</p>
      <p class="description w-full  text-2xl truncate overflow-hidden whitespace-nowrap">${product['description']}</p>
    `
    products_display.appendChild(element);
  });
});



