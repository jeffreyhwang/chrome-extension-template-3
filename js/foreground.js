const ce_main_container = document.createElement('div');
const ce_var = document.createElement('div');

ce_main_container.classList.add('ce_main');
ce_main_container.style.width = '100%';
ce_var.id = 'ce_var';
ce_var.innerHTML = `Var Value: Not yet set`;
ce_var.style.position = 'absolute';

ce_main_container.appendChild(ce_var);

document.querySelector('body').appendChild(ce_main_container);

chrome.runtime.sendMessage({
    message: "get_var"
}, response => {
    if (response.message === 'success') {
        ce_var.innerHTML = `Var Value: ${response.payload}`;
    }
});
