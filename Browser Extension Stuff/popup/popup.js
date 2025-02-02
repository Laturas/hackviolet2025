
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
    *  Enable / Disable tracking 
    */
    function enableOrDisable(tabs) {

      // Send message to content script (YT-Analytics.js) notifying of change
      chrome.tabs.sendMessage(tabs[0].id, {
        command: "enableOrDisable",
      });


      // Visually toggle tracking button
      const trackingToggle = document.getElementById("enable-disable-button");

      if (localStorage.getItem("trackingDisabled") === "false") {
        localStorage.setItem("trackingDisabled", "true")
        trackingToggle.textContent = "Tracking Enabled";
      }
      else {
        localStorage.setItem("trackingDisabled", "false")
        trackingToggle.textContent = "Tracking Disabled";
      }

    }

    /**
    * If error encountered, log the error to the console.
    */
    function reportError(error) {
      console.error(`Yak Analytics encountered an error: ${error}`);
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
  const titleImage = document.getElementById("title-image");

  // Get saved theme preference
  const isDarkMode = localStorage.getItem("theme") === "dark";

  // Apply correct theme before anything is shown
  if (isDarkMode) {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    titleImage.src = chrome.runtime.getURL("icons/yak-dark-run.png");
  } else {
    themeToggle.textContent = "🌙";
    titleImage.src = chrome.runtime.getURL("icons/yak-light-run.png");
  }

  function updateTitleImage(isDarkMode) {
    titleImage.style.opacity = "0"; // Start fade-out effect

    setTimeout(() => {
      titleImage.src = isDarkMode
        ? chrome.runtime.getURL("icons/yak-dark-run.png")
        : chrome.runtime.getURL("icons/yak-light-run.png");
    }, 500); // Change image after 0.5s

    setTimeout(() => {
      titleImage.style.opacity = "1"; // Fade in smoothly
    }, 550);
  }

  // Theme toggle logic
  themeToggle.addEventListener("click", () => {
    const isDarkMode = body.classList.toggle("dark-mode");
    themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateTitleImage(isDarkMode);
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

