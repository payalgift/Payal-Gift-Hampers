// Load cart from browser storage
let cart = JSON.parse(localStorage.getItem("payalCart")) || [];

// Display order summary
function displayCheckout() {

    const container = document.getElementById("checkout-items");

    container.innerHTML = "";

    let subtotal = 0;

    // Combine repeated products
    const grouped = {};

    cart.forEach(item => {

        const id = item.id;

        if (grouped[id]) {
            grouped[id].quantity += item.quantity || 1;
        } else {
            grouped[id] = {
                ...item,
                quantity: item.quantity || 1
            };
        }

    });

    const items = Object.values(grouped);

    if (items.length === 0) {

        container.innerHTML = `
            <p>Your cart is empty.</p>
            <a href="index.html">Shop Now</a>
        `;

    }

    items.forEach(item => {

        const price = Number(item.price) || 0;
const quantity = Number(item.quantity) || 1;

const itemTotal = price * quantity;

        subtotal += itemTotal;

        container.innerHTML += `
            <div class="checkout-product">

                <span class="checkout-product-name">
                    ${item.name} × ${item.quantity}
                </span>

                <strong>₹${itemTotal}</strong>

            </div>
        `;

    });

    // Sample delivery charge
    const delivery = subtotal === 0 ? 0 : 50;

    document.getElementById("checkout-subtotal").innerText =
        "₹" + subtotal;

    document.getElementById("checkout-delivery").innerText =
        "₹" + delivery;

    document.getElementById("checkout-total").innerText =
        "₹" + (subtotal + delivery);
}


// Place demo order
// Place order and send to WhatsApp
document.getElementById("checkout-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        // Check cart
        if (cart.length === 0) {
            alert("Your cart is empty! Please add a bouquet first.");
            return;
        }

        // Get customer details
        const name =
            document.getElementById("customer-name").value.trim();

        const phone =
            document.getElementById("customer-phone").value.trim();

        const address =
            document.getElementById("customer-address").value.trim();

        const pincode =
            document.getElementById("customer-pincode").value.trim();

        const state =
            document.getElementById("customer-state").value.trim();


        // Check all details
        if (!name || !phone || !address || !pincode || !state) {
            alert("Please fill in all delivery details.");
            return;
        }


        // Generate order number
        const orderNumber =
            "PGH" + Date.now().toString().slice(-6);


        // Get total
        const total =
            document.getElementById("checkout-total").innerText;


        // ==========================================
        // CREATE WHATSAPP MESSAGE
        // ==========================================

        let message = `Hello Payal Gift Hamper! 👋

I want to place an order.

Order ID: ${orderNumber}

Customer Name: ${name}
Phone: ${phone}

Delivery Address:
${address}
Pincode: ${pincode}
State: ${state}

Order Details:
`;


        // Add cart products to WhatsApp message
        cart.forEach((item) => {

            const quantity =
                Number(item.quantity) || 1;

            const price =
                Number(item.price) || 0;

            const itemTotal =
                price * quantity;

            message += `
${item.name}
Quantity: ${quantity}
Price: ₹${price}
Subtotal: ₹${itemTotal}
`;
        });


        // Add total
        message += `
-------------------------
${total}
-------------------------

Please confirm my order and delivery details.

Thank you! 😊`;


        // ==========================================
        // YOUR WHATSAPP NUMBER
        // ==========================================

        const whatsappNumber = "918094020534";


        // Create WhatsApp URL
        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        // Open WhatsApp
        window.open(whatsappURL, "_blank");


        // ==========================================
        // SHOW ORDER SUCCESS PAGE
        // ==========================================

        const container =
            document.querySelector(".checkout-page");

        container.innerHTML = `
            <div class="checkout-success">

                <div class="success-header">
                    <a href="index.html" class="brand-logo">
                        Payal Gift Hamper
                    </a>
                </div>

                <h1>Order Placed Successfully! 🎉</h1>

                <h2>Thank you, ${name}!</h2>

                <p>
                    Your order has been placed successfully.
                </p>

                <p>
                    <strong>Order ID:</strong>
                    ${orderNumber}
                </p>

                <p>
                    <strong>Order Total:</strong>
                    ${total}
                </p>

                <p>
                    <strong>Delivery Address:</strong>
                    ${address}, ${pincode}, ${state}
                </p>

                <p>
                    We will contact you soon to confirm your order.
                </p>

                <br>

                <a href="index.html" class="shop-btn">
                    Continue Shopping
                </a>

            </div>
        `;


        // ==========================================
        // CLEAR CART
        // ==========================================

        localStorage.removeItem("payalCart");

    });

    displayCheckout();