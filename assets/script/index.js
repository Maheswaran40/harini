function signUpFun(e) {
    e.preventDefault()
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    console.log(username, email, password);

    alert("signup successfully")

    localStorage.setItem("username", username)
    localStorage.setItem("email", email)
    localStorage.setItem("password", password)


    window.location.href = "../../index.html"

}




// login function start

function loginFun(e) {
    e.preventDefault()
    let useremail = document.getElementById("useremail").value
    let userpass = document.getElementById("userpass").value
    console.log(userpass, useremail);

    let localstorage_useremail = localStorage.getItem("email")
    let localstorage_userpass = localStorage.getItem("password")
    console.log(localstorage_useremail, localstorage_userpass);


    if (useremail == localstorage_useremail && userpass == localstorage_userpass) {
        alert("login successfull")
        window.location.href = "./assets/pages/home.html"
    }
    else {
        alert("username or password is invalid")
    }


}

// login function end



// products data

let product = [
    { id: 1, name: "samsung", pirce: 9000, Image: "../images/samsung.png" },
    { id: 2, name: "oppo", pirce: 9000, Image: "../images/oppo.png" },
    { id: 3, name: "vivo", pirce: 9000, Image: "../images/vivo.png" },
]


// show data

function showData() {
    let data = ""
    product.map((value, index) => (
        data += `
        <div class="col-lg-4 col-md-6 col-12">
            <div class="card">
                <img src="${value.Image}" height="250px" width="100%" alt="">
                <div class="card-body">
                    <h3>name:${value.name}</h3>
                    <h3>price:${value.pirce}</h3>
                </div>
            </div>
            </div>
        
        `
    ))

    document.getElementById("showPro").innerHTML = data
}
showData() 