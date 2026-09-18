// ================= CONTACT FORM =================

function contactFun(event) {
    event.preventDefault();

    const form = document.getElementById("contactForm");

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    showMessage(
        "contactMessage",
        "Thank you! Your message has been submitted successfully.",
        "success"
    );

    form.reset();
    form.classList.remove("was-validated");
}

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", contactFun);
    }
});
