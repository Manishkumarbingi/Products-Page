const display = document.getElementById("display");
const image = document.getElementById("image");
const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const update_product = document.getElementById("update");
const delete_product = document.getElementById("delete");


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");




const get_product = async () => {
  try {
    const response = await (fetch(`http://localhost:3001/products/${productId}`));
    const product = await response.json();
    if (response.ok) {

      image.src = product['imageUrl'];
      price.innerHTML = `&#8377;${product['price']}`;
      name.innerHTML = `${product['name']}`;
      description.innerHTML = `${product['description']}`;




      //deleting product

      delete_product.addEventListener('click', async () => {
        const confirm_delete = confirm("Do you want to delete this product permanently?");
        if (confirm_delete) {
          try {
            const delete_resepnse = await fetch(`http://localhost:3001/products/${productId}`, {
              method: 'DELETE',
              Headers: {
                'content-Type': 'application/json'
              }
            });
            if (delete_resepnse.ok) {
              display.innerHTML=`Product deleted succesfully!`
              setTimeout(() => {
                window.location.href=`index.html`;
              }, 1000);
            } else {
              alert(`Unable to delete the product`)
            }
          } catch (error) {
            alert(`Trouble with connection of backend Try again ${error}`)
          }

        } else {
          console.log("Deletion cancelled.");
        }
      });


      //updating the product
      update_product.addEventListener('click',()=>{
        window.location.href=`update_product.html?id=${product['id']}`
      })

    } else {
      display.innerHTML = `Unable to fetch product from server Try again with the correct Product id`

    }
  } catch (error) {
    display.innerHTML = `Trouble with connection of backend Try again
    ${error}
    `
  }


}

get_product()