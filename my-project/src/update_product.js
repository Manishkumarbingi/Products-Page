
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const close = document.getElementById("close")
close.addEventListener("click", () => {
    window.location.href = `product.html?id=${productId}`
})


//form
const form = document.getElementById('productForm');

const nameInput = document.getElementById('productName');
const priceInput = document.getElementById('productPrice');
const urlInput = document.getElementById('productUrl');
const descInput = document.getElementById('productDescription');

const errorName = document.getElementById('errorName');
const errorPrice = document.getElementById('errorPrice');
const errorUrl = document.getElementById('errorUrl');

const submitMessage = document.getElementById('submitMessage');

const get_product = async () => {
    try {
        const response = await (fetch(`http://localhost:3001/products/${productId}`));
        const product = await response.json();
        if (response.ok) {

            urlInput.value = product['imageUrl'];
            priceInput.value = `${product['price']}`;
            nameInput.value = `${product['name']}`;
            descInput.value = `${product['description']}`;

        } else {
            submitMessage.innerHTML = `Unable to fetch product from server Try again with the correct Product id`

        }
    } catch (error) {
        submitMessage.innerHTML = `Trouble with connection of backend Try again
    ${error}
    `
    }
}
get_product()

form.addEventListener('submit', async function (e) {
    e.preventDefault();


    errorName.textContent = '';
    errorPrice.textContent = '';
    errorUrl.textContent = '';
    submitMessage.textContent = '';
    submitMessage.className = '';

    let isValid = true;

    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const url = urlInput.value.trim();
    const description = descInput.value.trim();

    // Name validation
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        errorName.textContent = 'Product name should contain only letters and spaces.';
        isValid = false;
    }

    // Price validation
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
        errorPrice.textContent = 'Product price should be a positive number.';
        isValid = false;
    }

    // URL validation
    if (url !== '' && !/^https?:\/\/[\w\-\.]+\.\w{2,}(\/\S*)?$/.test(url)) {
        errorUrl.textContent = 'Please enter a valid URL.';
        isValid = false;
    }

    if (!isValid) {
        submitMessage.textContent = 'Please fix the errors above.';
        submitMessage.className = 'text-red-500 text-center text-lg mt-4 font-semibold';

    }
    else {
        const newProduct = {
            name,
            price: priceValue,
            imageUrl: url,
            description
        };

        try {
            const response = await fetch(`http://localhost:3001/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                submitMessage.textContent = 'Product Modified Successfully!';
                submitMessage.className = 'text-green-500 text-center text-lg mt-4 font-semibold';


                setTimeout(() => {
                    submitMessage.textContent = '';
                    submitMessage.className = '';
                    form.reset();
                    window.location.href = `product.html?id=${productId}`;
                }, 1000);

            } else {
                submitMessage.textContent = ' Failed to add product. Please try again.';
                submitMessage.className = 'text-red-500 text-center text-lg mt-4 font-semibold';
            }
        } catch (err) {
            submitMessage.textContent = ' Network error. Please check your connection.';
            submitMessage.className = 'text-red-500 text-center text-lg mt-4 font-semibold';
        }
    }
});


form.addEventListener('reset', function () {
    errorName.textContent = '';
    errorPrice.textContent = '';
    errorUrl.textContent = '';
    submitMessage.textContent = '';
    submitMessage.className = '';
});