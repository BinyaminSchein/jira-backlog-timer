
if (typeof jiraTimerLoaded === "undefined"){
    var s = document.createElement('script');
    
    s.src = chrome.runtime.getURL('injected_code/jiraTimer.js');
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);

    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("injected_code/jiraTimer.css");
    (document.head || document.documentElement).appendChild(link);
    

    chrome.storage.local.get(['audio'], function(data){
        var timer_audio = document.createElement("audio");
        if (typeof data.audio !== 'undefined'){
            timer_audio.src = data.audio;
        }
        else {
            timer_audio.src = chrome.runtime.getURL("timer_audio/times_up.mp3");
        }
        timer_audio.id = 'jira-timer-audio';
        (document.head || document.documentElement).appendChild(timer_audio);
    });

    jiraTimerLoaded = true;
}

jiraTimerRunning = window.document.getElementById('jira-timer-div') ?  true : false;
jiraTimerRunning;

