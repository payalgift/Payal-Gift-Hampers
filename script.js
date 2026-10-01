const products = [
    {
        id: 1,
        name: "Birthday Hamper",
        price: 699,
        category: "Birthday",
        image: "images/bouquet1.jpg"
    },
    {
        id: 2,
        name: "Gift Hamper Men",
        price: 799,
        category: "Anniversary",
        image: "images/bouquet2.jpg"
    },
    {
        id: 3,
        name: "Pinterest Hamper",
        price: 799,
        category: "Birthday",
        image: "images/bouquet3.jpg"
    },
    {
        id: 4,
        name: "Birthday Bloom Hamper",
        price: 999,
        category: "Birthday",
        image: "images/bouquet4.jpg"
    },
    {
        id: 5,
        name: "Anniversary Hamper",
        price: 1299,
        category: "Anniversary",
        image: "images/bouquet5.jpg"
    },
    {
        id: 6,
        name: "Birthday Hamper ",
        price: 999,
        category: "Birthday",
        image: "images/bouquet6.jpg"
    },
    {
        id: 7,
        name: "Shirt Hamper",
        price: 850,
        category: "Anniversary",
        image: "images/bouquet7.jpg"
    },
    {
        id: 8,
        name: "Annniversary Hamper",
        price: 1099,
        category: "Anniversary",
        image: "images/bouquet8.jpg"
    },
    {
        id: 9,
        name: "Anniversary Hamper",
        price: 1409,
        category: "Anniversary",
        image: "images/bouquet9.jpg"
    },
    {
        id: 10,
        name: " Pinterest Birthday Hamper",
        price: 899,
        category: "Birthday",
        image: "images/bouquet10.jpg"
    },
    {
        id: 11,
        name: "Rose Flower Hamper",
        price: 590,
        category: "Rose",
        image: "images/bouquet11.jpg"
    },
    {
        id: 12,
        name: "Elegant Rose Bouquet",
        price: 1299,
        category: "Rose",
        image: "images/bouquet12.jpg"
    },
    {
        id: 13,
        name: "Rose Orchid Hamper",
        price: 1499,
        category: "Rose",
        image: "images/bouquet13.jpg"
    },
    {
        id: 14,
        name: "Explosion Rose Bouquet",
        price: 799,
        category: "Rose",
        image: "images/bouquet14.jpg"
    },
    {
        id: 15,
        name: "Classic Red Roses",
        price: 899,
        category: "Rose",
        image: "images/bouquet15.jpg"
    },
    {
        id: 16,
        name: "Velvet Premium Hamper",
        price: 1299,
        category: "Rose",
        image: "images/bouquet16.jpg"
    },
    {
        id: 17,
        name: "Pastel Flower Hamper",
        price: 1299,
        category: "Birthday",
        image: "images/bouquet17.jpg"
    },
    {
        id: 18,
        name: "Romantic Love Hamper",
        price: 1199,
        category: "Anniversary",
        image: "images/bouquet18.jpg"
    },
    {
        id: 19,
        name: "Luxury Rose Collection",
        price: 799,
        category: "Rose",
        image: "images/bouquet19.jpg"
    },
    {
        id: 20,
        name: "Grand Celebration Hamper",
        price: 1099,
        category: "Birthday",
        image: "images/bouquet20.jpg"
    }
];

let cart = JSON.parse(localStorage.getItem("payalCart")) || [];

function displayProducts(list) {
    const container = document.getElementById("product-list");
    if (!container) return;
    container.innerHTML = "";

    list.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}"
                     alt="${product.name}"
                     onerror="this.alt='Image not found'">

                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id == id);

    if (!product) return;

    const existingItem = cart.find(item => item.id == id);

    if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity || 1) + 1;
    } else {
        cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
});

localStorage.setItem("payalCart", JSON.stringify(cart));

showCartPopup(product.name);
    }

    saveCart();
    updateCart();

}

function saveCart(){
    localStorage.setItem("payalCart",JSON.stringify(cart));
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const cartCount = document.getElementById("cart-count");

    let total = 0;
    let itemCount = 0;

    if (cartItems) {
        cartItems.innerHTML = "";
    }

    cart.forEach((item, index) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        total += price * quantity;
        itemCount += quantity;

        if (cartItems) {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <p>
                        ${item.name} - ₹${price}
                        × ${quantity}
                    </p>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>
            `;
        }
    });

    if (totalElement) {
        totalElement.innerText = "Total: ₹" + total.toFixed(2);
    }

    if (cartCount) {
        cartCount.innerText = itemCount;
    }

    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);

    saveCart();
    updateCart();
}

function showCart() {
    document.getElementById("cart-section")
        .scrollIntoView({ behavior: "smooth" });
}

function filterCategory(category) {
    if (category === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(
            p => p.category === category ||
                 (category === "Rose" &&
                  p.name.toLowerCase().includes("rose"))
        );

        displayProducts(filtered);
    }
}

// Search products
document.getElementById("search").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchText)
    );

    displayProducts(filtered);
});

// Show products when website opens
displayProducts(products);

function showCartPopup(productName) {
    let popup = document.getElementById("cart-popup");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "cart-popup";
        popup.className = "cart-popup";
        document.body.appendChild(popup);
    }

    popup.innerHTML = `🛒 ${productName} added to cart!`;

    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}