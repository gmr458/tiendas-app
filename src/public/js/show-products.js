let link = document.querySelector("#navLinkShowMyProducts");
link.classList.add("active");

fetch("/get-products")
    .then((response) => response.json())
    .then((products) => {
        let tbody = document.getElementById("rowsProducts");
        tbody.textContent = "";

        for (let product of products) {
            let tr = document.createElement("tr");

            // Column name
            let tdName = document.createElement("td");
            let textName = document.createTextNode(product.name);
            tdName.appendChild(textName);

            // Column description
            let tdDescription = document.createElement("td");
            let textDescription = document.createTextNode(product.description);
            tdDescription.appendChild(textDescription);

            // Column price
            let tdPrice = document.createElement("td");
            let textPrice = document.createTextNode(`$${product.price}`);
            tdPrice.appendChild(textPrice);

            // Column stock
            let tdStock = document.createElement("td");
            let textStock = document.createTextNode(product.stock);
            tdStock.appendChild(textStock);

            // Column status
            let tdStatus = document.createElement("td");

            let divStatus = document.createElement("div");
            divStatus.classList.add(
                "form-check",
                "form-switch",
                "d-flex",
                "justify-content-center",
            );
            tdStatus.appendChild(divStatus);

            let inputCheckSwitcStatus = document.createElement("input");
            inputCheckSwitcStatus.classList.add("form-check-input");
            inputCheckSwitcStatus.setAttribute("type", "checkbox");
            inputCheckSwitcStatus.setAttribute("role", "switch");
            if (product.status === 1) {
                inputCheckSwitcStatus.checked = true;
            } else {
                inputCheckSwitcStatus.checked = false;
            }
            inputCheckSwitcStatus.onclick = () => {
                fetch(`/change-status-product/${product.id}`, {
                    method: "PUT",
                }).then((response) => {
                    if (response.status === 200) {
                        console.log("Status changed");
                    } else {
                        alert("Error cambiando el estado");
                    }
                });
            };
            divStatus.appendChild(inputCheckSwitcStatus);

            // ----------------------------------------------------------

            // Column operations

            // ----------------------------------------------------------

            // Element td operations
            let tdOperations = document.createElement("td");

            // ----------------------------------------------------------

            // Element div operations
            let divOperations = document.createElement("div");
            divOperations.classList.add("row");

            // ----------------------------------------------------------

            // Element div edit
            let divEdit = document.createElement("div");
            divEdit.classList.add("col", "mb-1");
            // divEdit inside divOperations
            divOperations.appendChild(divEdit);

            // Element a edit
            let aEdit = document.createElement("a");
            aEdit.href = `/edit-product-form/${product.id}`;
            // aEdit inside divEdit
            divEdit.appendChild(aEdit);

            // Element button edit
            let buttonEdit = document.createElement("button");
            buttonEdit.classList.add("btn", "btn-primary");
            // buttonEdit inside aEdit
            aEdit.appendChild(buttonEdit);

            // Element i edit
            let iEdit = document.createElement("i");
            iEdit.classList.add("bi", "bi-pencil-square");
            // iEdit inside buttonEdit
            buttonEdit.appendChild(iEdit);

            let spanEdit = document.createElement("span");
            spanEdit.textContent = " Editar";
            buttonEdit.appendChild(spanEdit);

            // ----------------------------------------------------------

            tdOperations.appendChild(divOperations);

            // ----------------------------------------------------------

            tr.appendChild(tdName);
            tr.appendChild(tdDescription);
            tr.appendChild(tdPrice);
            tr.appendChild(tdStock);
            tr.appendChild(tdStatus);
            tr.appendChild(tdOperations);

            tbody.appendChild(tr);
        }
    });
