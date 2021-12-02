let link = document.querySelector("#navLinkViewMySales");
link.classList.add("active");

const URL_MY_SALES = "/my-sales";
fetch(URL_MY_SALES)
    .then((response) => response.json())
    .then((sales) => {
        let tbody = document.getElementById("rows");
        tbody.textContent = "";
        for (let sale of sales) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);

            let tdStore = document.createElement("td");
            let textStore = document.createTextNode(sale.store_name);
            tdStore.appendChild(textStore);

            let tdTotalPrice = document.createElement("td");
            let textTotalPrice = document.createTextNode(sale.total_price);
            tdTotalPrice.appendChild(textTotalPrice);

            let tdStatus = document.createElement("td");
            let status = "Aceptado";
            if (sale.status === 0) {
                status = "Sin Aceptar";
            }
            let textStatus = document.createTextNode(status);
            tdStatus.appendChild(textStatus);

            let tdCreatedAt = document.createElement("td");
            let textCreatedAt = document.createTextNode(new Date(sale.created_at).toLocaleString());
            tdCreatedAt.appendChild(textCreatedAt);

            let tdMoreDetails = document.createElement("td");
            let aMoraDetails = document.createElement("a");
            let textMoreDetails = document.createTextNode("Más");
            aMoraDetails.appendChild(textMoreDetails);
            aMoraDetails.href = `/view-details-my-sale/${sale.id}`;
            aMoraDetails.classList.add("btn", "btn-primary");
            tdMoreDetails.appendChild(aMoraDetails);

            tr.appendChild(tdStore);
            tr.appendChild(tdTotalPrice);
            tr.appendChild(tdStatus);
            tr.appendChild(tdCreatedAt);
            tr.appendChild(tdMoreDetails);
        }
    });

// function fullListSale() {
//     let tbody = document.getElementById("rows");
//     tbody.textContent = "";

//     let totalPrice = 0;

//     let listSale = JSON.parse(localStorage.getItem("listSale"));

//     for (let product of listSale) {
//         let tr = document.createElement("tr");
//         tr.setAttribute("id", `row-${product.id}`);
//         tbody.appendChild(tr);

//         let tdName = document.createElement("td");
//         let textName = document.createTextNode(product.name);
//         tdName.appendChild(textName);

//         let tdQuantity = document.createElement("td");
//         let textQuantity = document.createTextNode(product.quantity);
//         tdQuantity.appendChild(textQuantity);

//         let tdUnitPrice = document.createElement("td");
//         let textUnitPrice = document.createTextNode(product.price);
//         tdUnitPrice.appendChild(textUnitPrice);

//         let tdTotalPrice = document.createElement("td");
//         let textTotalPrice = document.createTextNode(product.totalPrice);
//         tdTotalPrice.appendChild(textTotalPrice);

//         let tdDelete = document.createElement("td");
//         let buttonDelete = document.createElement("button");
//         buttonDelete.classList.add("btn", "btn-danger");
//         buttonDelete.id = "buttonDelete";
//         buttonDelete.onclick = () => {
//             document.getElementById(`row-${product.id}`).remove();
//             let productsSale = JSON.parse(localStorage.getItem("listSale"));
//             let newProductsSale = productsSale.filter((productSale) => productSale.id !== product.id);
//             localStorage.setItem("listSale", JSON.stringify(newProductsSale));
//             let totalPriceSale = document.getElementById("totalPrice");
//             totalPriceSale.value = parseFloat(totalPriceSale.value) - product.totalPrice;
//             document.getElementById(`product-${product.id}`).style.display = "contents";
//         };
//         let textButtonDelete = document.createTextNode("Eliminar");
//         buttonDelete.appendChild(textButtonDelete);
//         tdDelete.appendChild(buttonDelete);

//         tr.appendChild(tdName);
//         tr.appendChild(tdQuantity);
//         tr.appendChild(tdUnitPrice);
//         tr.appendChild(tdTotalPrice);
//         tr.appendChild(tdDelete);

//         totalPrice += product.totalPrice;
//     }

//     document.getElementById("totalPrice").value = totalPrice;
// }

// if (localStorage.getItem("listSale") === null) {
//     localStorage.setItem("listSale", JSON.stringify([]));
//     fullListSale();
// } else {
//     fullListSale();
// }

// function confirmSale() {
//     const listSale = JSON.parse(localStorage.getItem("listSale"));
//     const totalPrice = parseFloat(document.getElementById("totalPrice").value);
//     const idStore = document.getElementById("idStore").textContent;
//     const idClient = document.getElementById("idClient").textContent;
//     const saleAndProducts = {
//         sale: {
//             id_client: idClient,
//             id_store: idStore,
//             total_price: totalPrice,
//             status: 0,
//         },
//         products: listSale,
//     };
//     fetch("/save-sale", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(saleAndProducts),
//     }).then((response) => {
//         if (response.status === 200) {
//             alert("Venta realizada con éxito");
//             localStorage.setItem("listSale", JSON.stringify([]));
//             document.getElementById("totalPrice").value = 0;
//             fullListSale();
//         } else {
//             alert("Error al realizar la venta");
//             localStorage.setItem("listSale", JSON.stringify([]));
//             document.getElementById("totalPrice").value = 0;
//             fullListSale();
//         }
//     });
// }
