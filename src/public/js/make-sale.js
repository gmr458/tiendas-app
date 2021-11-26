let idStore = document.getElementById("idStore").textContent;
const URL_PRODUCTS = `/all-products/${idStore}`;
fetch(URL_PRODUCTS)
    .then((response) => response.json())
    .then((products) => {
        localStorage.setItem("productsStore", JSON.stringify(products));
        for (let product of products) {
            let selectProduct = document.getElementById("product");
            let option = document.createElement("option");
            option.text = `${product.name} - Precio: $${product.price}`;
            option.value = product.id;
            option.id = `product-${product.id}`;
            selectProduct.appendChild(option);
        }
    });

function addProdut() {
    let idProduct = document.getElementById("product").value;
    if (idProduct === "default") {
        alert("Escoge un producto");
        document.getElementById("product").focus();
        return;
    }
    idProduct = parseInt(idProduct);
    let quantity = document.getElementById("quantity").value;
    if (quantity === "") {
        alert("Ingresa una cantidad");
        document.getElementById("quantity").focus();
        return;
    }
    if (parseInt(quantity) <= 0) {
        alert("La cantidad debe ser mayor a 0");
        document.getElementById("quantity").value = "";
        document.getElementById("quantity").focus();
        return;
    }
    quantity = parseInt(quantity);
    let productsStore = JSON.parse(localStorage.getItem("productsStore"));
    let product = productsStore.find((product) => product.id === idProduct);
    product.quantity = quantity;
    product.totalPrice = product.price * quantity;
    let listSale = JSON.parse(localStorage.getItem("listSale"));
    listSale.push(product);
    localStorage.setItem("listSale", JSON.stringify(listSale));
    let totalPriceSale = document.getElementById("totalPrice");
    let totalPriceSaleValue = document.getElementById("totalPrice").value;
    totalPriceSale.value = parseFloat(totalPriceSaleValue) + product.totalPrice;
    fullListSale();
    document.getElementById("product").value = "default";
    document.getElementById("quantity").value = "";
    document.getElementById(`product-${idProduct}`).style.display = "none";
}

function fullListSale() {
    let tbody = document.getElementById("rows");
    tbody.textContent = "";

    let totalPrice = 0;

    let listSale = JSON.parse(localStorage.getItem("listSale"));

    for (let product of listSale) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", `row-${product.id}`);
        tbody.appendChild(tr);

        let tdName = document.createElement("td");
        let textName = document.createTextNode(product.name);
        tdName.appendChild(textName);

        let tdQuantity = document.createElement("td");
        let textQuantity = document.createTextNode(product.quantity);
        tdQuantity.appendChild(textQuantity);

        let tdUnitPrice = document.createElement("td");
        let textUnitPrice = document.createTextNode(product.price);
        tdUnitPrice.appendChild(textUnitPrice);

        let tdTotalPrice = document.createElement("td");
        let textTotalPrice = document.createTextNode(product.totalPrice);
        tdTotalPrice.appendChild(textTotalPrice);

        let tdDelete = document.createElement("td");
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add("btn", "btn-danger");
        buttonDelete.id = "buttonDelete";
        buttonDelete.onclick = () => {
            document.getElementById(`row-${product.id}`).remove();
            let productsSale = JSON.parse(localStorage.getItem("listSale"));
            let newProductsSale = productsSale.filter((productSale) => productSale.id !== product.id);
            localStorage.setItem("listSale", JSON.stringify(newProductsSale));
            let totalPriceSale = document.getElementById("totalPrice");
            totalPriceSale.value = parseFloat(totalPriceSale.value) - product.totalPrice;
            document.getElementById(`product-${product.id}`).style.display = "contents";
        };
        let textButtonDelete = document.createTextNode("Eliminar");
        buttonDelete.appendChild(textButtonDelete);
        tdDelete.appendChild(buttonDelete);

        tr.appendChild(tdName);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdUnitPrice);
        tr.appendChild(tdTotalPrice);
        tr.appendChild(tdDelete);

        totalPrice += product.totalPrice;
    }

    document.getElementById("totalPrice").value = totalPrice;
}

if (localStorage.getItem("listSale") === null) {
    localStorage.setItem("listSale", JSON.stringify([]));
    fullListSale();
} else {
    fullListSale();
}

function confirmSale() {
    const listSale = JSON.parse(localStorage.getItem("listSale"));
    const totalPrice = parseFloat(document.getElementById("totalPrice").value);
    const idStore = document.getElementById("idStore").textContent;
    const idClient = document.getElementById("idClient").textContent;
    const saleAndProducts = {
        sale: {
            id_client: idClient,
            id_store: idStore,
            total_price: totalPrice,
            status: 0,
        },
        products: listSale,
    };
    fetch("/save-sale", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(saleAndProducts),
    }).then((response) => {
        if (response.status === 200) {
            alert("Venta realizada con éxito");
            localStorage.setItem("listSale", JSON.stringify([]));
            document.getElementById("totalPrice").value = 0;
            fullListSale();
        } else {
            alert("Error al realizar la venta");
            localStorage.setItem("listSale", JSON.stringify([]));
            document.getElementById("totalPrice").value = 0;
            fullListSale();
        }
    });
}
