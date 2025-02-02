



/**
 *  Toggles whether tracking is enabled or disabled
 */
function toggleTracking() {
  if (localStorage.getItem("trackingDisabled") === "true") {
    localStorage.setItem("trackingDisabled", "false");
  }
  else {
    localStorage.setItem("trackingDisabled", "true");
  }
}
function get_times() {
  fetch("http://127.0.0.1:8000/", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then((response) => {
    let json_response; response.json().then((result) => {json_response = result})
    
    localStorage.setItem("infoTime", json_response.info);
		localStorage.setItem("entertainmentTime", json_response.entertain);
    console.log(json_response);

    info_time = parseInt(localStorage.getItem("infoTime"));
    ent_time = parseInt(localStorage.getItem("entertainmentTime"));
    console.log(info_time);
    console.log(ent_time);

    chrome.tabs.sendMessage(tabs[0].id, {
      command: "chartStats",
      infoTime: response["info"],
      entertainmentTime: response["entertainment"]
    });

    console.log(response);
  });
}

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

    // Checks if tracking is disabled
    trackingDisabled = localStorage.getItem("trackingDisabled");

    // If tracking is not disabled, get youtube video ID and send to database
    if (trackingDisabled === "false" || trackingDisabled == null) {
      // Get the url of the current tab
      const url = window.location.href;
      
      // Extract video ID
      const pattern = /(?<=watch\?v=)[a-zA-Z0-9_-]+/i
      const videoID = pattern.exec(url);
      console.log(videoID);

      fetch("http://127.0.0.1:8000/", {
        method: "POST",
        body: JSON.stringify({
          video_id: videoID
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      get_times();

    }

  
    /**
     * Listen for messages from the background script
     * (Used to enable and disable tracking)
     */
    chrome.runtime.onMessage.addListener((message) => {
      if (message.command === "enableOrDisable") {
        toggleTracking();
        console.log(`Tracking Disabled ${localStorage.getItem("trackingDisabled")}`);
      }
    });


  })();