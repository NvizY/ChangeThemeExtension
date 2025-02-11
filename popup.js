document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector(".popup")) {
        const button = document.querySelector(".button");
        const circle = document.querySelector(".circle");
        
        // Load saved state
        chrome.storage.local.get(['darkModeOn'], function(result) {
            if (result.darkModeOn) {
                circle.style.animation = "moveCircleRight 1s forwards";
                button.style.animation = "transformToYellow 1s forwards";
                executeScript('appOn.js');
            }
        });

        let buttonOn = false;

        function executeScript(file) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs[0].id) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: [file]
                    }).catch((err) => console.error('Failed to execute script:', err));
                }
            });
        }

        button.addEventListener("click", () => {
            if(!buttonOn) {
                buttonOn = true;
                circle.style.animation = "moveCircleRight 1s forwards";
                button.style.animation = "transformToYellow 1s forwards";
                executeScript('appOn.js');
                chrome.storage.local.set({darkModeOn: true});
            } else {
                buttonOn = false;
                circle.style.animation = "moveCircleLeft 1s forwards";
                button.style.animation = "transformToBlue 1s forwards";
                executeScript('appOff.js');
                chrome.storage.local.set({darkModeOn: false});
            }
        });
    }
});