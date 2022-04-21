chrome.runtime.sendMessage({
    message: "get_var"
}, response => {
    if (response.message === 'success') {
        document.getElementById('varSpan').innerHTML = `${response.payload}`;
    }
});

document.getElementById('varChangeButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        message: "change_var",
        payload: document.getElementById('varTextBox').value
    }, response => {
        if (response.message === "success") {
            console.log("var changed");
            document.getElementById('varSpan').innerHTML = document.getElementById('varTextBox').value;
        }
    })
});
