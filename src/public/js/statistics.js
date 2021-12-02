fetch("/get-statistics-client-more-sales")
    .then((response) => response.json())
    .then((clients) => {
    	let tbody = document.getElementById("rowsClientMoreSales");
    	tbody.textContent = "";
        
        for (let client of clients) {
        	let tr = document.createElement("tr");

        	let tdClientName = document.createElement("td");
        	let textClientName = document.createTextNode(client.name_client);
        	tdClientName.appendChild(textClientName);

        	let tdQuantity = document.createElement("td");
        	let textQuantity = document.createTextNode(client.quantity);
        	tdQuantity.appendChild(textQuantity);

        	tr.appendChild(tdClientName);
        	tr.appendChild(tdQuantity);

        	tbody.appendChild(tr);
        }
    });

fetch("/get-statistics-neighborhood-more-sales")
    .then((response) => response.json())
    .then((neighborhoods) => {
        let tbody = document.getElementById("rowsNeighborhoodMoreSales");
        tbody.textContent = "";
        
        for (let neighborhood of neighborhoods) {
            let tr = document.createElement("tr");

            let tdNeighborhoodName = document.createElement("td");
            let textNeighborhoodName = document.createTextNode(neighborhood.name_neighborhood);
            tdNeighborhoodName.appendChild(textNeighborhoodName);

            let tdQuantity = document.createElement("td");
            let textQuantity = document.createTextNode(neighborhood.quantity);
            tdQuantity.appendChild(textQuantity);

            tr.appendChild(tdNeighborhoodName);
            tr.appendChild(tdQuantity);

            tbody.appendChild(tr);
        }
    });