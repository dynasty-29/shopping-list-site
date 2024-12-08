// Shopping List Functionality
document.getElementById("addButton").addEventListener("click", () => {
    const input = document.getElementById("itemInput");
    const list = document.getElementById("shoppingList");

    if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = input.value;
        li.addEventListener("click", () => li.remove()); // Remove item on click
        list.appendChild(li);
        input.value = "";
    }
});

document.getElementById("clearButton").addEventListener("click", () => {
    document.getElementById("shoppingList").innerHTML = ""; // Clear the list
});

// Cart Management for Anime Art Collection
const cart = [];

document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", (e) => {
        const card = e.target.closest("#product-card");
        const productName = card.querySelector(".product-name").textContent;
        const productPrice = parseFloat(card.querySelector(".product-price").textContent.replace("¥", ""));
        const quantity = parseInt(card.querySelector(".quantity-input").value);

        if (quantity > 0) {
            const confirmation = card.querySelector(".confirmation-message");
            confirmation.textContent = `Arigatu! your art has been added ${quantity}x ${productName} to cart!`;
            setTimeout(() => (confirmation.textContent = ""), 2000);

            // Update cart
            const product = cart.find((item) => item.name === productName);
            if (product) {
                product.quantity += quantity;
            } else {
                cart.push({ name: productName, price: productPrice, quantity });
            }

            updateChart(); 
        } else {
            alert("Please enter a valid quantity!");
        }
    });
});

// Chart Visualization for Product Popularity
function updateChart() {
    const productNames = cart.map((item) => item.name);
    const productQuantities = cart.map((item) => item.quantity);

    const canvas = document.getElementById("popularityChart");
    if (!canvas) {
        createChartCanvas();
    } else {
        renderChart(productNames, productQuantities);
    }
}

function createChartCanvas() {
    const chartSection = document.createElement("section");
    chartSection.id = "chart-section";

    const canvas = document.createElement("canvas");
    canvas.id = "popularityChart";
    canvas.width = 800;
    canvas.height = 400;

    chartSection.appendChild(canvas);
    document.body.appendChild(chartSection);

    renderChart([], []);
}

function renderChart(labels, data) {
    const ctx = document.getElementById("popularityChart").getContext("2d");
    if (window.popularityChart) {
        window.popularityChart.destroy(); 

    window.popularityChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Quantity Sold",
                    data,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
