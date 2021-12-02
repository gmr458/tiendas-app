let link = document.querySelector("#navLinkStatistics");
link.classList.add("active");

fetch("/get-statistics-client-more-sales")
    .then((response) => response.json())
    .then((clients) => {
    	let tbody = document.getElementById("rowsClientMoreSales");
    	tbody.textContent = "";

        let i = 1;
        
        for (let client of clients) {
        	let tr = document.createElement("tr");

            let tdNumber = document.createElement("td");
            let textNumber = document.createTextNode(i);
            tdNumber.appendChild(textNumber);

        	let tdClientName = document.createElement("td");
        	let textClientName = document.createTextNode(client.name_client);
        	tdClientName.appendChild(textClientName);

        	let tdQuantity = document.createElement("td");
        	let textQuantity = document.createTextNode(client.quantity);
        	tdQuantity.appendChild(textQuantity);

            tr.appendChild(tdNumber);
        	tr.appendChild(tdClientName);
        	tr.appendChild(tdQuantity);

        	tbody.appendChild(tr);

            i++;
        }
    });

fetch("/get-statistics-neighborhood-more-sales")
    .then((response) => response.json())
    .then((neighborhoods) => {
        let tbody = document.getElementById("rowsNeighborhoodMoreSales");
        tbody.textContent = "";

        let i = 1;
        
        for (let neighborhood of neighborhoods) {
            let tr = document.createElement("tr");

            let tdNumber = document.createElement("td");
            let textNumber = document.createTextNode(i);
            tdNumber.appendChild(textNumber);

            let tdNeighborhoodName = document.createElement("td");
            let textNeighborhoodName = document.createTextNode(neighborhood.name_neighborhood);
            tdNeighborhoodName.appendChild(textNeighborhoodName);

            let tdQuantity = document.createElement("td");
            let textQuantity = document.createTextNode(neighborhood.quantity);
            tdQuantity.appendChild(textQuantity);

            tr.appendChild(tdNumber);
            tr.appendChild(tdNeighborhoodName);
            tr.appendChild(tdQuantity);

            tbody.appendChild(tr);

            i++;
        }
    });

fetch("/get-statistics-client-more-money")
    .then((response) => response.json())
    .then((clients) => {
        let tbody = document.getElementById("rowsClientMoreMoney");
        tbody.textContent = "";

        let i = 1;
        
        for (let client of clients) {
            let tr = document.createElement("tr");

            let tdNumber = document.createElement("td");
            let textNumber = document.createTextNode(i);
            tdNumber.appendChild(textNumber);

            let tdClientName = document.createElement("td");
            let textClientName = document.createTextNode(client.name_client);
            tdClientName.appendChild(textClientName);

            let tdMoney = document.createElement("td");
            let textMoney = document.createTextNode(`$${client.money}`);
            tdMoney.appendChild(textMoney);

            tr.appendChild(tdNumber);
            tr.appendChild(tdClientName);
            tr.appendChild(tdMoney);

            tbody.appendChild(tr);

            i++;
        }
    });