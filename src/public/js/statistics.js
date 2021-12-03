fetch("/get-statistics")
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