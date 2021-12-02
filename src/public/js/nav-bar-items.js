if (localStorage.getItem("role") === "client") {
    if (document.querySelector("#navItemCreateProduct")) {
        document.querySelector("#navItemCreateProduct").remove();
    }
    if (document.querySelector("#navItemShowMyProducts")) {
        document.querySelector("#navItemShowMyProducts").remove();
    }
    if (document.querySelector("#navItemShowOrders")) {
        document.querySelector("#navItemShowOrders").remove();
    }
} else {
    if (document.querySelector("#navItemShowStores")) {
        document.querySelector("#navItemShowStores").remove();
    }
    if (document.querySelector("#navItemViewMySales")) {
        document.querySelector("#navItemViewMySales").remove();
    }
}
