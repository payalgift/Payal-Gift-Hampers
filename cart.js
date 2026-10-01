let cart = JSON.parse(localStorage.getItem("payalCart")) || [];

// Display all cart products
function displayCart() {

    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty! 🛍️</h2>
                <p>Add some beautiful bouquet hampers.</p>

                <a href="index.html" class="checkout-btn">
                    Continue Shopping
                </a>
            </div>
        `;

    } else {

        cart.forEach((item, index) => {

            let quantity = item.quantity || 1;

            let itemTotal = item.price * quantity;

            subtotal += itemTotal;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <img src="${item.image}"
                         alt="${item.name}"
                         onerror="this.alt='Image not found'">

                    <div class="cart-item-info">

                        <h3>${item.name}</h3>

                        <p>Price: ₹${item.price}</p>

                        <div class="quantity-controls">

                            <button onclick="changeQuantity(${index}, -1)">
                                −
                            </button>

                            <span>${quantity}</span>

                            <button onclick="changeQuantity(${index}, 1)">
                                +
                            </button>

                        </div>

                        <button class="remove-btn"
                                onclick="removeItem(${index})">
                            Remove
                        </button>

                    </div>

                    <h3 class="item-total">
                        ₹${itemTotal}
                    </h3>

                </div>
            `;
        });
    }

    // Update order summary
    document.getElementById("subtotal").innerText =
        "₹" + subtotal;

    let delivery = subtotal === 0 ? 0 : 50;

    document.getElementById("delivery").innerText =
        "₹" + delivery;

    document.getElementById("total").innerText =
        "₹" + (subtotal + delivery);
}


// Increase or decrease quantity
function changeQuantity(index, change) {

    cart[index].quantity = (cart[index].quantity || 1) + change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}


// Remove product from cart
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}


// Save cart in browser
function saveCart() {

    localStorage.setItem(
        "payalCart",
        JSON.stringify(cart)
    );

    displayCart();
}


// Checkout button
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

    } else {

        alert("Your checkout page is coming soon!");
    }
}


// Load cart when page opens
displayCart();