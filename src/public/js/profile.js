let role = document.querySelector("#role");
if (role.value === "client") {
    localStorage.setItem("role", "client");
    role.value = "Cliente";
} else {
    localStorage.setItem("role", "store");
    role.value = "Tienda";
}

let link = document.querySelector("#navLinkProfile");
link.classList.add("active");
