
// Whether or not analytics tracking is enabled or not
const trackingEnabled = true;


/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page (YT-Analytics.js).
*/
function listenForClicks() {
  document.addEventListener("click", (e) => {


    // Set the image sources dynamically for the title and the pie chart
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("title-image").src = browser.runtime.getURL("icons/youtube.png");
      document.getElementById("pie-chart-image").src = browser.runtime.getURL("icons/placeholder.jpg");
    });

    /**
    * Send a message to the content script (YT-Analytics.js) to notify which button has been clicked
    */
    function enableOrDisable(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "enableOrDisable",
        enabledOrDisabled: trackingEnabled, // Whether or not the tracking is enabled or disabled
      });
    }

    /**
    * If error encountered, log the error to the console.
    */
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    /**
    * Get the active tab,
    * Calls clickButton() if a button has been clicked
    */
    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      // Ignore when click is not on a button within <div id="popup-content">.
      return;
    }
    browser.tabs
    .query({ active: true, currentWindow: true })
    .then(enableOrDisable)
    .catch(reportError);
  });
}

/* Theme Toggle event code I copied */

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️"; // Change to sun icon
  }

  

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const isDarkMode = body.classList.toggle("dark-mode");
    themeToggle.textContent = isDarkMode ? "☀️" : "🌙"; // Switch icon
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
});
  

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs
.executeScript({ file: "/content_scripts/YT-Analytics.js" })
.then(listenForClicks)
.catch(reportExecuteScriptError);
