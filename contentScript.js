
if (typeof jiraTimerLoaded === "undefined"){
    var s = document.createElement('script');
    
    s.src = chrome.runtime.getURL('jiraTimer.js');
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);

    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("jiraTimer.css");
    (document.head || document.documentElement).appendChild(link);        

    jiraTimerLoaded = true;
}

jiraTimerRunning = window.document.getElementById('jira-timer-div') ?  true : false;
jiraTimerRunning;

