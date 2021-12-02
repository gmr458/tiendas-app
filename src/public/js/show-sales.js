let link = document.querySelector("#navLinkShowOrders");
link.classList.add("active");

const URL_SALES = "/get-sales";

fetch(URL_SALES)
    .then((response) => response.json())
    .then((data) => {
        let contentSales = document.getElementById("contentSales");
        contentSales.textContent = "";
        for (let sale of data) {
            let divCol = document.createElement("div");
            divCol.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

            let card = document.createElement("div");
            card.classList.add("card", "text-center", "m-auto");
            card.style = "width: 18rem;";
            divCol.appendChild(card);

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            card.appendChild(cardBody);

            let h5TotalPrice = document.createElement("h5");
            h5TotalPrice.classList.add("card-text");
            let h5TotalPriceText = document.createTextNode(`Precio total: $${sale.total_price}`);
            h5TotalPrice.appendChild(h5TotalPriceText);

            let pStatus = document.createElement("p");
            pStatus.classList.add("card-text");
            let status = "Aceptado";
            if (sale.status === 0) {
                status = "No aceptado";
            }
            let pStatusText = document.createTextNode(status);
            pStatus.appendChild(pStatusText);

            let aDetails = document.createElement("a");
            aDetails.href = `/view-details-sale/${sale.id}`;
            aDetails.classList.add("btn", "btn-primary");
            let aDetailsText = document.createTextNode("Ver detalles");
            aDetails.appendChild(aDetailsText);

            cardBody.appendChild(h5TotalPrice);
            cardBody.appendChild(pStatus);
            cardBody.appendChild(aDetails);

            contentSales.appendChild(divCol);
        }
    });
