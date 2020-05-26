

new_audio_btn = document.getElementById('new-audio-file-btn');
new_audio_btn.onclick = function(){
    let file_in = document.getElementById('new-audio-file');
    if (file_in.files.length > 0){
        var file = file_in.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = function () {
            chrome.storage.local.set({'audio': reader.result});
            addSuccessMessage();
        };
    }
};

revert_audio_btn = document.getElementById('old-audio-file-btn');
revert_audio_btn.onclick = function(){
    chrome.storage.local.remove('audio', function(){
        addSuccessMessage();
    });
};

function addSuccessMessage(){
    successEl = document.createElement('div');
    successEl.innerText = 'Saved settings successfully';
    document.body.appendChild(successEl);
    setTimeout(function(){
        successEl.parentNode.removeChild(successEl);
    }, 3000);
}
