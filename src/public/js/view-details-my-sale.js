const idSale = document.getElementById("idSale").textContent;
const URL_PRODUCTS = `/details-my-sale/${idSale}`;
fetch(URL_PRODUCTS)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.getElementById("totalPriceSale").textContent = `Precio total: $${data.sale.total_price}`;
        let status = "Aceptado";
        if (data.sale.status === 0) {
            status = "No aceptado";
        }
        document.getElementById("stateSale").textContent = `Estado: ${status}`;

        let tbody = document.getElementById("rows");
        tbody.textContent = "";
        for (let product of data.products) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);

            let tdName = document.createElement("td");
            let textName = document.createTextNode(product.name);
            tdName.appendChild(textName);

            let tdUnitPrice = document.createElement("td");
            let textUnitPrice = document.createTextNode(product.unitPrice);
            tdUnitPrice.appendChild(textUnitPrice);

            let tdQuantity = document.createElement("td");
            let textQuantity = document.createTextNode(product.quantity);
            tdQuantity.appendChild(textQuantity);

            let tdTotalPrice = document.createElement("td");
            let textTotalPrice = document.createTextNode(product.totalPrice);
            tdTotalPrice.appendChild(textTotalPrice);


            tr.appendChild(tdName);
            tr.appendChild(tdUnitPrice);
            tr.appendChild(tdQuantity);
            tr.appendChild(tdTotalPrice);
        }
    });
