// ================= CART =================

function formatCartPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavbarCounts();
}

function calculateTotal(cart) {
    let total = 0;

    cart.forEach(function (item) {
        total += item.price * item.quantity;
    });

    return total;
}

function increaseQuantity(productId) {
    const cart = getCart();

    const item = cart.find(function (product) {
        return product.id === productId;
    });

    if (item) {
        item.quantity++;
    }

    saveCart(cart);
    showCart();
}

function decreaseQuantity(productId) {
    const cart = getCart();

    const item = cart.find(function (product) {
        return product.id === productId;
    });

    if (!item) {
        return;
    }

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(productId);
        return;
    }

    saveCart(cart);
    showCart();
}

function removeFromCart(productId) {
    let cart = getCart();

    cart = cart.filter(function (item) {
        return item.id !== productId;
    });

    saveCart(cart);
    showCart();
    showMessage("cartMessage", "Product removed from cart.", "warning");
}

function showCart() {
    const cartContent = document.getElementById("cartContent");

    if (!cartContent) {
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-cart-x"></i>
                <h3 class="mt-3">Your cart is empty</h3>
                <p class="text-secondary">Add some products to your cart.</p>
                <a href="home.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    let rows = "";

    cart.forEach(function (item) {
        const subtotal = item.price * item.quantity;

        rows += `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <img src="${item.image}" class="cart-image" alt="${item.name}">
                        <div>
                            <strong>${item.name}</strong>
                            <div class="small text-secondary">${item.category}</div>
                        </div>
                    </div>
                </td>

                <td>${formatCartPrice(item.price)}</td>

                <td>
                    <div class="quantity-control">
                        <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQuantity(${item.id})">−</button>
                        <span class="fw-bold">${item.quantity}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </td>

                <td class="fw-bold">${formatCartPrice(subtotal)}</td>

                <td>
                    <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    const total = calculateTotal(cart);

    cartContent.innerHTML = `
        <div class="table-responsive bg-white rounded-4 shadow-sm p-3">
            <table class="table align-middle mb-0">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>

        <div class="row justify-content-end mt-4">
            <div class="col-md-5 col-lg-4">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body">
                        <h4 class="fw-bold">Order Summary</h4>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Items</span>
                            <span>${cart.reduce(function (sum, item) { return sum + item.quantity; }, 0)}</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between fs-5 fw-bold">
                            <span>Total</span>
                            <span>${formatCartPrice(total)}</span>
                        </div>
                        <button class="btn btn-primary w-100 mt-3" onclick="checkoutMessage()">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function checkoutMessage() {
    showMessage("cartMessage", "Checkout is a demo feature. No payment gateway is connected.", "info");
}

document.addEventListener("DOMContentLoaded", function () {
    showCart();
});
