let cart = [];

function addToCart(productName, price) {

    let existingProduct = cart.find(
        product => product.name === productName
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}


function displayCart() {

    let cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach(function(product, index) {

        subtotal += product.price * product.quantity;

        cartItems.innerHTML += `
            <div class="d-flex justify-content-between
                        align-items-center border-bottom py-3">

                <div>
                    <h5>${product.name}</h5>

                    <p class="text-muted mb-2">
                        ৳ ${product.price}
                    </p>

                    <button class="btn btn-sm btn-outline-dark"
                            onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span class="mx-2">
                        ${product.quantity}
                    </span>

                    <button class="btn btn-sm btn-outline-dark"
                            onclick="increaseQuantity(${index})">
                        +
                    </button>
                </div>

                <div>
                    <strong>
                        ৳ ${product.price * product.quantity}
                    </strong>

                    <br>

                    <button class="btn btn-sm btn-outline-danger mt-2"
                            onclick="removeFromCart(${index})">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });

    let delivery = subtotal > 0 ? 60 : 0;
    let total = subtotal + delivery;

    document.getElementById("subtotal").innerText =
        "৳ " + subtotal;

    document.getElementById("delivery").innerText =
        "৳ " + delivery;

    document.getElementById("total").innerText =
        "৳ " + total;
        document.getElementById("checkoutTotal").innerText =
    "৳ " + total;
}


function increaseQuantity(index) {

    cart[index].quantity++;

    displayCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    displayCart();
}


function removeFromCart(index) {

    cart.splice(index, 1);

    displayCart();
}

function placeOrder() {

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    let email = document.getElementById("customerEmail").value;
    let address = document.getElementById("customerAddress").value;

    if (name === "" || phone === "" || email === "" || address === "") {
        alert("Please fill in all customer information.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! Thank you for shopping with N.Fashion Store.");
}

function searchProducts() {

    let searchText =
        document.getElementById("searchInput").value.toLowerCase();

    let products =
        document.querySelectorAll("#products .card");

    products.forEach(function(product) {

        let productName =
            product.querySelector("h5").innerText.toLowerCase();

        if (productName.includes(searchText)) {
            product.parentElement.style.display = "";
        } else {
            product.parentElement.style.display = "none";
        }

    });
}

function showPaymentForm() {

    let paymentForm = document.getElementById("paymentForm");

    if (document.getElementById("bkash").checked) {

        paymentForm.innerHTML = `
            <label class="form-label">bKash Number</label>
            <input type="text"
                   class="form-control"
                   placeholder="01XXXXXXXXX">
        `;

    } else if (document.getElementById("nagad").checked) {

        paymentForm.innerHTML = `
            <label class="form-label">Nagad Number</label>
            <input type="text"
                   class="form-control"
                   placeholder="01XXXXXXXXX">
        `;

    } else if (document.getElementById("card").checked) {

        paymentForm.innerHTML = `
            <label class="form-label">Card Number</label>
            <input type="text"
                   class="form-control mb-2"
                   placeholder="XXXX XXXX XXXX XXXX">

            <label class="form-label">Expiry Date</label>
            <input type="text"
                   class="form-control"
                   placeholder="MM/YY">
        `;

    } else {

        paymentForm.innerHTML = "";
    }
}