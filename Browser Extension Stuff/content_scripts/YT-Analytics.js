

// runs when popup is loaded
console.log("===========================\nScript Loaded\n===========================");

(() => {

    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
  
    /**
     * Listen for messages from the background script
     */
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "buttonClick") {
        console.log(`button was clicked ${message.buttonName}`);
      }
    });
  })();
  