
// HERE Setting Up the Story here.

const story = {
    
    // The beginning of this amazing adventure
    start: {
        text: "You find yourself in an old temple. What do you do?",
        choices: [
            { text: "Investigate the door", next: "door" }, 
            { text: "Climb the staircase", next: "staircase" } 
        ]
    },
    
    // State when you investigating  the door.
    door: {
        text: "You see a puzzle mechanism.",
        choices: [
            { text: "Solve the puzzle", next: "puzzle" }, 
            { text: "Force it open", next: "rockfall" } // Choice 2: Force it open (bad idea!)
        ]
    },
    
    // State when you solved that puzzle.
    puzzle: {
        text: "The door opens to a treasure room.",
        choices: [
            { text: "Proceed carefully", next: "treasure" }, 
            { text: "Turn back", next: "start" } // Choice 2: Go back to the start
        ]
    },

    // State when you force the door open
    rockfall: {
        text: "A rockfall traps you!",
        choices: [
            { text: "Go back", next: "start" } 
        ]
    },
    // State when you climb the staircase
    staircase: {
        text: "The stairs lead into darkness.",
        choices: [
            { text: "Use a lamp", next: "lamp" }, 
            { text: "Walk in the dark", next: "curse" } 
        ]
    },
    // State when you use the lamp
    lamp: {
        text: "You find hidden markings.",
        choices: [
            { text: "Continue exploring", next: "treasure" },
            { text: "Go back", next: "start" } 
        ]
    },
    // State when you walk in the dark and trigger a curse
    curse: {
        text: "You triggered a curse!",
        choices: [
            { text: "Find a cure", next: "cure" }, 
            { text: "Run away", next: "escape" } 
        ]
    },
    // State when you reach the treasure
    treasure: {
        text: "You found the Kohinoor diamond!",
        choices: [
            { text: "Take it", next: "collapse" }, 
            { text: "Inspect the room", next: "safeExit" } 
        ]
    },
    // State when you take the diamond and the floor collapses
    collapse: {
        text: "The floor collapses!",
        choices: [
            { text: "Restart", next: "start" } 
        ]
    },

    // State when you escape safely with the diamond
    safeExit: {
        text: "You escape safely with the diamond!",
        choices: [] 
    },
    // State when you break the curse and escape
    cure: {
        text: "You broke the curse and escaped!",
        choices: [] 
    },
    // State when you escape but the curse remains
    escape: {
        text: "You escaped, but the curse remains.",
        choices: [] 
    }
};

//  current state in the story.

let currentState = "start";

// Rendering the Story
function renderQuestion() {

    // Get references to the question and answers .
    const questionContainer = document.getElementById("question");
    const answersContainer = document.getElementById("answers");

    // Clear any old choices from the answers container
    answersContainer.innerHTML = "";

    // Used if-else here
    if (currentState === "start") {

        // Display the start state text and choices
        questionContainer.textContent = story.start.text;

        story.start.choices.forEach(choice => addAnswerButton(choice, answersContainer));
    } else if (currentState === "door") {

        
        questionContainer.textContent = story.door.text;
        story.door.choices.forEach(choice => addAnswerButton(choice, answersContainer));
    } else if (currentState === "puzzle") {
        
        // Display the puzzle state text and choices
        questionContainer.textContent = story.puzzle.text;
        story.puzzle.choices.forEach(choice => addAnswerButton(choice, answersContainer));
    } else {
        // For all other states.
        const state = story[currentState];
        questionContainer.textContent = state.text;
        state.choices.forEach(choice => addAnswerButton(choice, answersContainer));
    }
}

// Implemeneting Helper Function for Adding Choice Buttons

function addAnswerButton(choice, container) {
    // this Create a new button for the choice
    const button = document.createElement("button");
    button.textContent = choice.text; 
    button.setAttribute("role", "button"); //  This will Improves screen reader experience
    button.setAttribute("tabindex", "0"); // Makes it easy to use  for keyboard users

    // Add  event listener to the button
    button.addEventListener("click", () => {
        currentState = choice.next; // Update the current state
        renderQuestion(); 
    });

    // Adding the button to the answers container
    container.appendChild(button);
}

// Step 4: Start the Game
renderQuestion(); // Render the initial state