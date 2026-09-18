// ================= WISHLIST =================

function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateNavbarCounts();
}

function addWishlistProductToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = getWishlist();

    const product = wishlist.find(function (item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const existing = cart.find(function (item) {
        return item.id === productId;
    });

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavbarCounts();
    showMessage("wishlistMessage", `${product.name} added to cart.`, "success");
}

function removeFromWishlist(productId) {
    let wishlist = getWishlist();

    wishlist = wishlist.filter(function (item) {
        return item.id !== productId;
    });

    saveWishlist(wishlist);
    showWishlist();
    showMessage("wishlistMessage", "Product removed from wishlist.", "warning");
}

function showWishlist() {
    const wishlistContent = document.getElementById("wishlistContent");

    if (!wishlistContent) {
        return;
    }

    const wishlist = getWishlist();

    if (wishlist.length === 0) {
        wishlistContent.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="bi bi-heart"></i>
                    <h3 class="mt-3">Your wishlist is empty</h3>
                    <p class="text-secondary">Save products you like here.</p>
                    <a href="home.html" class="btn btn-primary">Explore Products</a>
                </div>
            </div>
        `;
        return;
    }

    let data = "";

    wishlist.forEach(function (product) {
        data += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="product-image" alt="${product.name}">

                    <div class="card-body d-flex flex-column">
                        <span class="badge text-bg-light border align-self-start mb-2">
                            ${product.category}
                        </span>

                        <h5>${product.name}</h5>
                        <p class="text-secondary small">${product.description}</p>
                        <div class="price mb-3">₹${product.price.toLocaleString("en-IN")}</div>

                        <div class="mt-auto d-flex gap-2">
                            <button class="btn btn-primary flex-grow-1" onclick="addWishlistProductToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> Add to Cart
                            </button>

                            <button class="btn btn-outline-danger" onclick="removeFromWishlist(${product.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    wishlistContent.innerHTML = data;
}

document.addEventListener("DOMContentLoaded", function () {
    showWishlist();
});
