document.addEventListener("DOMContentLoaded", function () {
    let inputSquares = [];
    let inputString = "";

    // Dodavanje novog kvadrata
    function addSquare() {
        const squareContainer = document.createElement("div");
        squareContainer.classList.add("square-container");

        const square = document.createElement("div");
        square.classList.add("square");
        square.contentEditable = true;

        // Dodavanje x ispod kvadrata
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "x";

        // Event listener to da hendluje brisanje kvadrata kad se x pritisne
        deleteButton.addEventListener("click", function () {
            const index = inputSquares.indexOf(squareContainer);
            if (index !== -1) {
                inputSquares.splice(index, 1);
                squareContainer.remove();
                inputString = "";
                inputSquares.forEach((sq) => (inputString += sq.firstChild.innerText.trim()));
                
            }
        });

        squareContainer.appendChild(square);
        squareContainer.appendChild(deleteButton);

        // Event listener da hendluje promjenu sadrzaja
        square.addEventListener("input", function () {
            const newValue = square.innerText.trim();
            if (/^[a-zA-Z ]+$/.test(newValue)) {
                if (newValue.length > 1) {
                    square.innerText = newValue.charAt(0); // samo prvi karakter zadrzava
                }
                inputString = "";
                inputSquares.forEach((sq) => (inputString += sq.firstChild.innerText.trim()));
            } else {
                alert("Please enter only letters and spaces.");
                square.innerText = "";
            }
        });

        inputSquares.push(squareContainer);
        document.getElementById("square-container").appendChild(squareContainer);

        square.addEventListener("click", function () {
            square.contentEditable = true;
            square.focus();
        });
    }

    // Event listener za dodavanje novog kvadrata
    document.getElementById("add-square").addEventListener("click", addSquare);

    // Event listener za generisanje kvadrata na osnovu unesenog broja
    document.getElementById("generate-squares").addEventListener("click", function () {
        const numSquares = parseInt(document.getElementById("num-squares").value);
        if (!isNaN(numSquares) && numSquares > 0) {
            // ciscenje kvadrata
            document.getElementById("square-container").innerHTML = "";
            inputSquares = [];

            // kreiranje novog kvadrata
            for (let i = 0; i < numSquares; i++) {
                addSquare();
            }
        } else {
            alert("Please enter a valid number of squares.");
        }
        
    });

    // Event listener za provjeru palindroma
    document.getElementById("check-palindrome").addEventListener("click", function () {
        inputString = "";
        inputSquares.forEach((sq) => (inputString += sq.firstChild.innerText.trim()));
        const message = document.getElementById("result-message");

        if (isPalindrome(inputString)) {
            message.textContent = "This is a palindrome";
        } else {
            message.textContent = "This is not a palindrome";
        }
    });

    // Event listener za ciscenje sadrzaja svih kvadrata
document.getElementById("clear-squares").addEventListener("click", function () {
    inputSquares.forEach((squareContainer) => {
        const square = squareContainer.firstChild;
        square.innerText = ""; 
    });
    inputString = ""; 

    // Krije palindrom poruku
    const message = document.getElementById("result-message");
    message.textContent = "";
});


    // Funkcija da provjeri je li string palindrom
    function isPalindrome(str) {
        const cleanedStr = str.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const reversedStr = cleanedStr.split("").reverse().join("");
        return cleanedStr === reversedStr;
    }
});
