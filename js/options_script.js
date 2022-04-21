chrome.runtime.sendMessage({
    message: "get_var"
}, response => {
    if (response.message === 'success') {
        // do something with `${response.payload}`;
    }
});

document.getElementById('varChangeButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        message: "change_var",
        payload: document.getElementById('varTextBox').value
    }, response => {
        if (response.message === "success") {
            console.log("success");
        }
    })
});
