// scripts/explore.js

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("resultsContainer");
  
    // Listen for clicks on the Search button
    searchButton.addEventListener("click", async () => {
      const query = searchInput.value.trim();
      if (!query) {
        resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
        return;
      }
  
      // Clear previous results
      resultsContainer.innerHTML = "<p>Searching...</p>";
  
      try {
        // Example fetch to backend endpoint 
        const response = await fetch(`/api/polls/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
  
        const data = await response.json(); 
        renderSearchResults(data);
      } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = "<p>Something went wrong while fetching data.</p>";
      }
    });
  
    // A simple function to render search results
    function renderSearchResults(polls) {
      if (!polls || polls.length === 0) {
        resultsContainer.innerHTML = "<p>No polls found for your search.</p>";
        return;
      }
  
      // Build HTML output
      let html = "<ul>";
      polls.forEach((poll) => {
        html += `
          <li>
            <h3>${poll.question}</h3>
            <p>Options: ${poll.options.join(", ")}</p>
            <!-- can add links to view or vote on this poll -->
          </li>
        `;
      });
      html += "</ul>";
  
      resultsContainer.innerHTML = html;
    }
  });
  