function submitPoll() {
    let question = document.getElementById("question").value;
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;
    let option3 = document.getElementById("option3").value;
    let option4 = document.getElementById("option4").value;
    let allowMultiple = document.getElementById("multiSelectToggle").checked;

    if (question.trim() === "" || option1.trim() === "" || option2.trim() === "") {
        alert("Please enter at least a question and two options.");
        return;
    }

    let pollData = {
        question,
        options: [option1, option2, option3, option4].filter(opt => opt),
        votes: {},
        allowMultiple
    };

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

        optionElement.onclick = function () {
            if (pollData.allowMultiple) {
                // Toggle selection in multiple-choice mode
                optionElement.classList.toggle("selected");
            } else {
                // Deselect others and select only one in single-choice mode
                document.querySelectorAll(".option").forEach(el => el.classList.remove("selected"));
                optionElement.classList.add("selected");
            }
        };

        optionsContainer.appendChild(optionElement);

        // Display results dynamically
        let resultElement = document.createElement("p");
        resultElement.id = `result-${option}`;
        resultElement.innerText = `${option}: ${pollData.votes[option]} votes`;
        voteResults.appendChild(resultElement);
    });

    document.getElementById("pollDisplay").classList.remove("hidden");
}

function submitVote() {
    let selectedOptions = document.querySelectorAll(".option.selected");

    if (selectedOptions.length === 0) {
        alert("Please select at least one option before submitting.");
        return;
    }

    let pollData = JSON.parse(localStorage.getItem("poll"));

    selectedOptions.forEach(optionElement => {
        let optionValue = optionElement.getAttribute("data-value");
        pollData.votes[optionValue] += 1;
    });

    localStorage.setItem("poll", JSON.stringify(pollData));

    // Disable vote button after submission
    let voteButton = document.getElementById("voteButton");
    if (voteButton) {
        voteButton.disabled = true;
        voteButton.innerText = "Vote Submitted";
    }

    updateVoteResults();
}

function updateVoteResults() {
    let pollData = JSON.parse(localStorage.getItem("poll"));
    pollData.options.forEach(option => {
        let resultElement = document.getElementById(`result-${option}`);
        if (resultElement) {
            resultElement.innerText = `${option}: ${pollData.votes[option]} votes`;
        }
    });
}

// Load poll on page load
document.addEventListener("DOMContentLoaded", displayPoll);
