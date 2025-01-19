let boxes = document.querySelectorAll(".box"); // Select all boxes
let reset = document.querySelector(".reset"); // Select the reset button
let win = document.querySelector(".head"); // Select the winner message container

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let turnO = true; // Initialize turn indicator

// Function to reset the game
const resetgame = () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear box text
        box.disabled = false; // Enable boxes
    });
    turnO = true; // Reset to "O"'s turn
    win.innerText = ""; // Clear winner message
    win.classList.add("hide"); // Hide the winner message
};

// Function to display the winner
const showwinner = (winner) => {
    win.innerText = `Winner is ${winner}`;
    win.classList.remove("hide"); // Show the winner message
    win.style.color = "red"; // Set winner message color
};

// Function to check for winning patterns
const checkWinpattern = () => {
    for (let pattern of winpattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showwinner(pos1Val);
                boxes.forEach((box) => (box.disabled = true)); // Disable all boxes after a win
                return; // Exit the loop after finding a winner
            }
        }
    }
};

// Add event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // Disable the clicked box
        checkWinpattern(); // Check for a win after each move
    });
});

// Add event listener to the reset button
reset.addEventListener("click", resetgame);

