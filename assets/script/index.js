// ================= SIGNUP FUNCTION =================

function signUpFun(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log(username, email, password);

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Signup successfully");

    window.location.href = "../../index.html";
}


// ================= LOGIN FUNCTION =================

function loginFun(e) {
    e.preventDefault();

    let useremail = document.getElementById("useremail").value;
    let userpass = document.getElementById("userpass").value;

    console.log(userpass, useremail);

    let localstorage_useremail = localStorage.getItem("email");
    let localstorage_userpass = localStorage.getItem("password");

    console.log(
        localstorage_useremail,
        localstorage_userpass
    );

    if (
        useremail === localstorage_useremail &&
        userpass === localstorage_userpass
    ) {
        alert("Login successful");

        window.location.href = "./assets/pages/home.html";
    } 
    else {
        alert("Username or password is invalid");
    }
}


// ================= PRODUCTS DATA =================

let product = [
    {
        id: 1,
        name: "samsung",
        price: 9000,
        Image: "../images/samsung.png"
    },
    {
        id: 2,
        name: "oppo",
        price: 9000,
        Image: "../images/oppo.png"
    },
    {
        id: 3,
        name: "vivo",
        price: 9000,
        Image: "../images/vivo.png"
    }
];


// ================= SHOW PRODUCTS =================

function showData() {

    let data = "";

    product.map((value, index) => {

        data += `
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card">

                    <img 
                        src="${value.Image}" 
                        height="250px" 
                        width="100%" 
                        alt="${value.name}"
                    >

                    <div class="card-body">

                        <h3>Name: ${value.name}</h3>

                        <h3>Price: ${value.price}</h3>

                        <button 
                            class="btn btn-info"
                            onclick="cartFun(${value.id})"
                        >
                            Cart
                        </button>

                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("showPro").innerHTML = data;
}

showData();


// ================= SEARCH FUNCTION =================

function searchFun(event) {

    event.preventDefault();

    let searchData =
        document.getElementById("searchinput").value;

    let outputData = product.filter((v, i) =>
        v.name
            .trim()
            .toLowerCase()
            .includes(searchData.trim().toLowerCase())
    );

    console.log("outputData", outputData);

    showSearchData(outputData);
}


// ================= SHOW SEARCH DATA =================

function showSearchData(outputData) {

    let data = "";

    outputData.map((value, i) => {

        data += `
            <div class="col-lg-4 col-md-6 col-12">

                <div class="card">

                    <img 
                        src="${value.Image}" 
                        height="250px" 
                        width="100%"
                        alt="${value.name}"
                    >

                    <div class="card-body">

                        <h3>Name: ${value.name}</h3>

                        <h3>Price: ${value.price}</h3>

                        <button 
                            class="btn btn-info"
                            onclick="cartFun(${value.id})"
                        >
                            Cart
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    document.getElementById("searchOutPut").innerHTML = data;
}


// ================= CART =================

let cart = [];


// ================= ADD TO CART =================

function cartFun(proId) {

    // Find product
    let cartData = product.find((v) => v.id === proId);

    console.log("cartData", cartData);

    // Check whether product already exists in cart
    let existing = cart.find((v) => v.id === proId);


    if (existing) {

        // Product already exists
        existing.quantity++;

        alert("Quantity increased");

    } 
    else {

        // New product
        cart.push({
            ...cartData,
            quantity: 1
        });

        alert("Data added to cart");
    }

    console.log("cart", cart);

    showCart(cart);
}


// ================= SHOW CART =================

function showCart(cartPro) {

    let data = "";

    cartPro.map((v, i) => {

        data += `
            <tr>

                <td>
                    <img 
                        src="${v.Image}" 
                        height="80px"
                        width="80px"
                        alt="${v.name}"
                    >
                </td>

                <td>
                    ${v.name}
                </td>

                <td>
                    ${v.price}
                </td>

                <td>
                    ${v.quantity}
                </td>

                <td>
                    <button
                        class="btn-close"
                        onclick="removeCart(${v.id})"
                    ></button>
                </td>

            </tr>
        `;
    });

    document.getElementById("showCartData").innerHTML = data;
}


// ================= REMOVE / DECREASE CART =================

function removeCart(proId) {

    let existing = cart.find((v) => v.id === proId);

    // Safety check
    if (!existing) {
        return;
    }


    if (existing.quantity > 1) {

        // Decrease quantity
        existing.quantity--;

        alert("Quantity decreased");

    } 
    else {

        // Remove product completely
        cart = cart.filter((v) => v.id !== proId);

        alert("Data removed");
    }

    console.log("cart", cart);

    showCart(cart);
}

