jiraTimerRunning = false;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(null, {file: 'contentScript.js'}, function(isJiraTimerRunning){
        jiraTimerRunning = isJiraTimerRunning[0];
        toggleButton();
    });
});

let secondsInput = document.getElementById('seconds');
chrome.storage.sync.get(['seconds'], function(data){
    if (typeof data.seconds !== 'undefined'){
        secondsInput.setAttribute('value', data.seconds);
    }
});

let toggleTimer = document.getElementById('toggle-timer-btn');
toggleTimer.onclick = function(element){
    seconds = document.getElementById('seconds').value;
    if (seconds && seconds > 0){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(null, {code: `
            window.dispatchEvent(new CustomEvent('toggle_jira_timer', {
                'detail': {
                    'seconds': `+ seconds +`,
                }
            }));
            `});
        });
        
        toggleButton();
        chrome.storage.sync.set({'seconds': seconds});
    }
};

var input = document.getElementById("seconds");
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      document.getElementById("toggle-timer-btn").click();
    }
});
  


function toggleButton(){
    if (jiraTimerRunning){
        setButtonToStop();
        jiraTimerRunning = false;
    }
    else {
        setButtonToStart();
        jiraTimerRunning = true;
    }
}

stopPath = "M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z";
startPath = "M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
function setButtonToStart(){
    let toggleIcon = document.getElementById('toggle-icon');
    toggleIcon.setAttribute('fill', 'green');

    let iconPath = document.getElementById('icon-path');
    iconPath.setAttribute('d', startPath);
}
function setButtonToStop(){
    let toggleIcon = document.getElementById('toggle-icon');
    toggleIcon.setAttribute('fill', 'red');

    let iconPath = document.getElementById('icon-path');
    iconPath.setAttribute('d', stopPath);
}