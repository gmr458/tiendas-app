let role = document.querySelector("#role");
if (role.value === "client") {
    console.log(role.value)
    localStorage.setItem("role", "client");
    role.value = "Cliente";
} else {
    localStorage.setItem("role", "store");
    role.value = "Tienda";
}
