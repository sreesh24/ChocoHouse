function addFlavor() {
    const data = {
        flavor_name: document.getElementById("flavorName").value,
        available_from: document.getElementById("availableFrom").value,
        available_until: document.getElementById("availableUntil").value,
        status: document.getElementById("status").value,
    };

    if (!data.flavor_name || !data.available_from || !data.available_until || !data.status) {
        alert("Please fill out all fields before adding a flavor.");
        return;
    }

    fetch('/flavors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        fetchFlavors(); 
        document.getElementById("flavor-form").reset();
    })
    .catch(error => console.error('Error:', error));
}

function updateInventory() {
    const data = {
        ingredient_name: document.getElementById("ingredientName").value,
        quantity: parseFloat(document.getElementById("quantity").value),
        unit: document.getElementById("unit").value,
    };

    if (!data.ingredient_name || isNaN(data.quantity) || !data.unit) {
        alert("Please fill out all fields before updating the inventory.");
        return;
    }

    fetch('/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        fetchInventory(); 
        document.getElementById("inventory-form").reset();
    })
    .catch(error => console.error('Error:', error));
}

function addSuggestion() {
    const data = {
        customer_name: document.getElementById("customerName").value,
        flavor_suggestion: document.getElementById("flavorSuggestion").value,
        allergy_concerns: document.getElementById("allergyConcerns").value
    };

    if (!data.customer_name || !data.flavor_suggestion || !data.allergy_concerns) {
        alert("Please fill out all fields before adding a suggestion.");
        return;
    }

    fetch('/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        fetchSuggestions(); 
        document.getElementById("suggestion-form").reset();
    })
    .catch(error => console.error('Error:', error));
}

function fetchFlavors() {
    fetch('/flavors')
    .then(response => response.json())
    .then(data => {
        const flavorsTable = document.getElementById("flavors-table");
        flavorsTable.innerHTML = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Available From</th>
                        <th>Available Until</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(flavor => `
                        <tr>
                            <td>${flavor.name}</td>
                            <td>${flavor.available_from}</td>
                            <td>${flavor.available_until}</td>
                            <td>${flavor.status}</td>
                            <td><button class="btn btn-danger" onclick="deleteFlavor(${flavor.id})">Delete</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    })
    .catch(error => console.error('Error fetching flavors:', error));
}

function fetchInventory() {
    fetch('/inventory')
        .then(response => response.json())
        .then(data => {
            const inventoryTable = document.getElementById("inventory-table");
            inventoryTable.innerHTML = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>${item.unit}</td>
                                <td><button class="btn btn-danger" onclick="deleteIngredient(${item.id})">Delete</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(error => console.error('Error fetching ingredients:', error));
}

function fetchSuggestions() {
    fetch('/suggestions')
        .then(response => response.json())
        .then(data => {
            const suggestionsTable = document.getElementById("suggestions-table");
            suggestionsTable.innerHTML = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Flavor Suggestion</th>
                            <th>Allergy Concerns</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(suggestion => `
                            <tr>
                                <td>${suggestion.customer_name}</td>
                                <td>${suggestion.flavor_suggestion}</td>
                                <td>${suggestion.allergy_concerns}</td>
                                <td><button class="btn btn-danger" onclick="deleteSuggestion(${suggestion.id})">Delete</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(error => console.error('Error fetching suggestions:', error));
}

function deleteFlavor(id) {
    fetch(`/flavors/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert("Flavor deleted successfully");
                fetchFlavors();
            } else {
                alert("Failed to delete flavor");
            }
        })
        .catch(error => console.error('Error deleting flavor:', error));
}

function deleteIngredient(id) {
    fetch(`/inventory/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert("Ingredient deleted successfully");
                fetchInventory();
            } else {
                alert("Failed to delete ingredient");
            }
        })
        .catch(error => console.error('Error deleting ingredient:', error));
}

function deleteSuggestion(id) {
    fetch(`/suggestions/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert("Suggestion deleted successfully");
                fetchSuggestions();
            } else {
                alert("Failed to delete suggestion");
            }
        })
        .catch(error => console.error('Error deleting suggestion:', error));
}

window.onload = function() {
    fetchFlavors();
    fetchInventory();
    fetchSuggestions();
};
