

jiraTimerDiv = document.createElement('div')
jiraTimerDiv.id = 'jira-timer-div'
jiraTimerDiv.className = 'jiraTimer'

jiraTimerIntervalHandler = -1;
currentJiraTimerIssue = JIRA.Issue.getIssueId()


function timeToJiraText(time){
    positiveTime = time > 0 ? time : -time;
    minutes = parseInt(positiveTime / 60, 10);
    seconds = parseInt(positiveTime % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    text = minutes + ":" + seconds;
    if (time < 0){
        text = "You are overdue by " + text
    }
    else {
        text = "You have " + text + " left"
    }
    return text
}

function timeToJiraClass(time){
    className = ''
    if (time < 0){
        className = 'jiraTimer JToverdue'
    }
    else if (time < 60){
        className = 'jiraTimer JTalmostDone'
    }
    else {
        className = 'jiraTimer'
    }
    return className
}

function alertIfTimeDone(time){
    if(time == 0){
        $("#jira-timer-audio")[0].play();
    }
}
  
function startTimer(duration, silent){
    if (jiraTimerIntervalHandler > 0){
        return;
    }

    jiraTimerDiv.textContent = timeToJiraText(duration);
    jiraTimerDiv.className = timeToJiraClass(duration);
    el = $('.ghx-top-header')[0];
    el.parentNode.insertBefore(jiraTimerDiv, el.nextSibling);

    var timer = duration;

    jiraTimerIntervalHandler = setInterval(function () {
        if(!silent){
            alertIfTimeDone(timer);
        }
        jiraTimerDiv.textContent = timeToJiraText(timer);
        jiraTimerDiv.className   = timeToJiraClass(timer);
        
        timer = timer - 1;

        if (currentJiraTimerIssue != JIRA.Issue.getIssueId()){
            currentJiraTimerIssue = JIRA.Issue.getIssueId();
            stopTimer();
            startTimer(duration);
        }
    }, 1000);

} 
  
function stopTimer(){
    if (jiraTimerIntervalHandler > 0){
        window.clearInterval(jiraTimerIntervalHandler);
        jiraTimerIntervalHandler = -1;
    }
    if (jiraTimerDiv.parentNode){
        jiraTimerDiv.parentNode.removeChild(jiraTimerDiv);
    }
}

jiraTimerStarted = false;
window.addEventListener("toggle_jira_timer", function(e){
    if (jiraTimerStarted){
        stopTimer();
        jiraTimerStarted = false;
    }
    else {
        startTimer(e.detail.seconds, e.detail.silent);
        jiraTimerStarted = true;
    }
})
