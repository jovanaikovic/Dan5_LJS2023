function addItem(event) {
    event.preventDefault();
    let newItemName = document.getElementById("unos").value;
    console.log(newItemName);
    if (newItemName) {
        document.getElementById("items").innerHTML +=
            "<li class='list-group-item'>" + newItemName + "<button>x</button>" + "</li>";
           
        document.getElementById("unos").value = "";
    }
}

document.querySelector("#submit").addEventListener("click", addItem);

var itemsList = document.getElementById("items");

itemsList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        var listItem = event.target.parentElement;
        itemsList.removeChild(listItem);
    }
});

const searchInput = document.getElementById('pretraga');
const suggestionList = document.getElementById('suggestion-list');
const itemList = document.getElementById('items');
let selectedOptionIndex = -1; 

searchInput.addEventListener("input", searchSuggestions);

function searchSuggestions() {
    const searchText = searchInput.value.toLowerCase();
    suggestionList.innerHTML = "";
    
    for (let i = 0; i < itemList.children.length; i++) {
        const itemText = itemList.children[i].textContent.toLowerCase();
        if (itemText.startsWith(searchText)) {
            const suggestionItem = document.createElement('option');
            suggestionItem.textContent = itemList.children[i].textContent.substring(0, itemList.children[i].textContent.length - 1);
            suggestionList.appendChild(suggestionItem);
        }
    }

    suggestionList.size = suggestionList.options.length > 0 ? suggestionList.options.length : 1;
    selectedOptionIndex = -1; 
}

searchInput.addEventListener("keydown", function (event) {
    const key = event.key;
    
    if (key === "ArrowDown" || key === "ArrowUp") {
        event.preventDefault();
        const options = suggestionList.options;

        if (key === "ArrowDown") {
            // Move down the options and loop to the top if at the end
            selectedOptionIndex = (selectedOptionIndex + 1) % options.length;
        } else if (key === "ArrowUp") {
            // Move up the options and loop to the bottom if at the top
            selectedOptionIndex = (selectedOptionIndex - 1 + options.length) % options.length;
        }

        // Highlight the selected option
        for (let i = 0; i < options.length; i++) {
            options[i].selected = i === selectedOptionIndex;
        }
    }
});

document.getElementById("suggestion-list").addEventListener("change", function (event) {
    let selectedValue = event.target.value;
    console.log(selectedValue);
    searchInput.value = selectedValue;
    searchInput.focus();
    suggestionList.size = 1; 
});

document.addEventListener("click", function (event) {
    if (event.target !== suggestionList) {
        suggestionList.selectedIndex = -1;
    }
});




