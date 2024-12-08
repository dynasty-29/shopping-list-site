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

