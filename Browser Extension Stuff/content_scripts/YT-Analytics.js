

// runs when popup is loaded

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




    console.log("===========================\nScript Loaded\n===========================");

    // Get the url of the current tab
    const url = window.location.href;

    const pattern = /(?<=watch\?v=)[a-zA-Z0-9]+/i

    // Extract video ID
    const videoID = pattern.exec(url);

    console.log(videoID);

    

  

  
    /**
     * Listen for messages from the background script
     */
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "enableOrDisable") {
        console.log(`Analytics enabled: ${message.enabledOrDisabled}`);
      }
    });


  })();
  