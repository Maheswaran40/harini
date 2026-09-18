// ================= HOME / PRODUCTS =================

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some(function (item) {
        return item.id === productId;
    });
}

function createProductCard(product) {
    const wished = isInWishlist(product.id);

    return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card product-card h-100">
                <img
                    src="${product.image}"
                    class="product-image"
                    alt="${product.name}"
                >

                <div class="card-body d-flex flex-column">
                    <span class="badge text-bg-light border align-self-start mb-2">
                        ${product.category}
                    </span>

                    <h5 class="card-title">${product.name}</h5>

                    <p class="card-text text-secondary product-description">
                        ${product.description}
                    </p>

                    <div class="price mb-3">${formatPrice(product.price)}</div>

                    <div class="mt-auto d-flex gap-2">
                        <button
                            class="btn btn-primary flex-grow-1"
                            onclick="addToCart(${product.id})"
                        >
                            <i class="bi bi-cart-plus"></i> Cart
                        </button>

                        <button
                            class="btn btn-outline-danger wishlist-btn ${wished ? "active" : ""}"
                            onclick="addToWishlist(${product.id})"
                            title="Wishlist"
                        >
                            <i class="bi ${wished ? "bi-heart-fill" : "bi-heart"}"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showProducts(productData) {
    const productList = document.getElementById("productList");

    if (!productList) {
        return;
    }

    if (productData.length === 0) {
        productList.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="bi bi-search"></i>
                    <h3 class="mt-3">No products found</h3>
                    <p class="text-secondary">Try another product name, category or description.</p>
                </div>
            </div>
        `;
        return;
    }

    let data = "";

    productData.forEach(function (product) {
        data += createProductCard(product);
    });

    productList.innerHTML = data;
}

function searchFun(event) {
    event.preventDefault();

    const searchInput = document.getElementById("searchInput");
    const searchData = searchInput.value.trim().toLowerCase();

    const outputData = products.filter(function (product) {
        return (
            product.name.toLowerCase().includes(searchData) ||
            product.category.toLowerCase().includes(searchData) ||
            product.description.toLowerCase().includes(searchData)
        );
    });

    showProducts(outputData);
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    showProducts(products);
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(function (item) {
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
        showMessage("productMessage", `${product.name} quantity increased.`, "info");
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1
        });

        showMessage("productMessage", `${product.name} added to cart.`, "success");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavbarCounts();
}

function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const existing = wishlist.find(function (item) {
        return item.id === productId;
    });

    if (existing) {
        wishlist = wishlist.filter(function (item) {
            return item.id !== productId;
        });

        showMessage("productMessage", `${product.name} removed from wishlist.`, "warning");
    } else {
        wishlist.push(product);
        showMessage("productMessage", `${product.name} added to wishlist.`, "success");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateNavbarCounts();
    showProducts(getCurrentProducts());
}

function getCurrentProducts() {
    const searchData = document.getElementById("searchInput").value.trim().toLowerCase();

    if (!searchData) {
        return products;
    }

    return products.filter(function (product) {
        return (
            product.name.toLowerCase().includes(searchData) ||
            product.category.toLowerCase().includes(searchData) ||
            product.description.toLowerCase().includes(searchData)
        );
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("productList")) {
        showProducts(products);

        document.getElementById("searchForm").addEventListener("submit", searchFun);
        document.getElementById("clearSearch").addEventListener("click", clearSearch);
    }
});
