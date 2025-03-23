document.addEventListener("DOMContentLoaded", () => {
    const profilePicInput = document.getElementById("profilePic");
    const previewImg = document.getElementById("previewImg");
    const saveProfileBtn = document.getElementById("saveProfileBtn");
    const displayNameInput = document.getElementById("displayName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const bioInput = document.getElementById("bio");
    const myPollsContainer = document.getElementById("myPollsContainer");

    profilePicInput.addEventListener("change", () => {
        const file = profilePicInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                previewImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    saveProfileBtn.addEventListener("click", event => {
        event.preventDefault();
        const name = displayNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const bio = bioInput.value.trim();
        if (!name) {
            alert("Please enter a display name.");
            return;
        }
        if (!email) {
            alert("Please enter an email.");
            return;
        }
        alert("Profile changes saved (client-side only).");
    });

    fetchUserPolls();

    async function fetchUserPolls() {
        try {
            const response = await fetch("/api/polls/my-polls");
            if (!response.ok) {
                throw new Error("No polls found");
            }
            const polls = await response.json();
            renderUserPolls(polls);
        } catch (err) {
            myPollsContainer.innerHTML = "<p>No polls found.</p>";
        }
    }

    function renderUserPolls(polls) {
        if (!polls || polls.length === 0) {
            myPollsContainer.innerHTML = "<p>You have not created any polls yet.</p>";
            return;
        }
        let html = "<ul>";
        polls.forEach(poll => {
            html += `
        <li>
          <strong>${poll.question}</strong><br/>
          <em>Options: </em>${poll.options.join(", ")}
        </li>
      `;
        });
        html += "</ul>";
        myPollsContainer.innerHTML = html;
    }
});
