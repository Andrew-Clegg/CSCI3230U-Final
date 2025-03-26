
// Function to create and display the poll
function submitPoll() {
    let question = document.getElementById("question").value;
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;
    let option3 = document.getElementById("option3").value;
    let option4 = document.getElementById("option4").value;

    if (question.trim() === "" || option1.trim() === "" || option2.trim() === "") {
        alert("Please enter at least a question and two options.");
        return;
    }

    let pollData = {
        question,
        options: [option1, option2, option3, option4].filter(opt => opt),
        votes: {}
    };

    // Initialize votes with zero
    pollData.options.forEach(option => {
        pollData.votes[option] = 0;
    });

    localStorage.setItem("poll", JSON.stringify(pollData));

    displayPoll();
}

function displayPoll() {
    let pollData = JSON.parse(localStorage.getItem("poll"));
    
    if (!pollData) return;

    document.getElementById("pollQuestion").innerText = pollData.question;
    let optionsContainer = document.getElementById("optionsContainer");
    let voteResults = document.getElementById("voteResults");

    optionsContainer.innerHTML = "";
    voteResults.innerHTML = "";

    pollData.options.forEach((option) => {
        let optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.innerText = option;
        optionElement.setAttribute("data-value", option);

        optionElement.onclick = function() {
            document.querySelectorAll(".option").forEach(el => el.classList.remove("selected"));
            optionElement.classList.add("selected");
        };

        optionsContainer.appendChild(optionElement);

        let resultElement = document.createElement("p");
        resultElement.id = `result-${option}`;
        resultElement.innerText = `${option}: ${pollData.votes[option]} votes`;
        voteResults.appendChild(resultElement);
    });

    // Make the poll preview visible
    document.getElementById("pollDisplay").classList.remove("hidden");
}


// Function to submit vote
function submitVote() {
    let selectedOption = document.querySelector(".option.selected");

    if (!selectedOption) {
        alert("Please select an option before submitting.");
        return;
    }

    let pollData = JSON.parse(localStorage.getItem("poll"));
    let optionValue = selectedOption.getAttribute("data-value");

    // Increment vote count
    pollData.votes[optionValue] += 1;
    localStorage.setItem("poll", JSON.stringify(pollData));

    updateVoteResults();
}

// Function to update vote results dynamically
function updateVoteResults() {
    let pollData = JSON.parse(localStorage.getItem("poll"));
    if (!pollData) return;

    pollData.options.forEach(option => {
        let resultElement = document.getElementById(`result-${option}`);
        if (resultElement) {
            resultElement.innerText = `${option}: ${pollData.votes[option]} votes`;
        }
    });
}

// Load poll if it exists on page load
document.addEventListener("DOMContentLoaded", displayPoll);
