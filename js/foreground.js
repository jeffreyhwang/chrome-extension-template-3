const ce_main_container = document.createElement('div');
const ce_var = document.createElement('div');

ce_main_container.classList.add('ce_main');
ce_main_container.style.width = '100%';
ce_var.id = 'ce_var';
ce_var.innerHTML = `Var Value: Not yet set`;
ce_var.style.position = 'absolute';

ce_cat_1.id = 'ce_cat_1';
var extension_url = chrome.extension.getURL
console.log(extension_url);

ce_main_container.appendChild(ce_var);

document.querySelector('body').appendChild(ce_main_container);

chrome.runtime.sendMessage({
    message: "get_name"
}, response => {
    if (response.message === 'success') {
        ce_var.innerHTML = `Var Value: ${response.payload}`;
    }
});

ce_move_button.addEventListener('click', () => {
    walking = (!walking) ? true : false;
    if(walking){
        ce_move_button.innerText = "Stop";
        step();
    }
    else{
        ce_cat_1.style.animationPlayState = "paused";
        ce_move_button.innerText = "Walk";
        clearTimeout(stepTimeout);
    }
});

function topPositionNameTagForCat1() {
    var ce_cat_1_element = document.getElementById('ce_cat_1'),
        ce_cat_1_style = window.getComputedStyle(ce_cat_1_element),
        ce_cat_1_height = ce_cat_1_style.getPropertyValue('height');
        ce_cat_1_top = ce_cat_1_style.getPropertyValue('top');
    var nameTagTop = Number(ce_cat_1_top.slice(0, -2)) - 30 ;
    return nameTagTop + "px";
}

function step() {
    ce_cat_1.style.animationPlayState = "running";
    speed = 5;
    divPosition = divPosition + (direction * speed);
    ce_var.style.left = divPosition + "px";
    ce_cat_1.style.left = divPosition + "px";
    ce_var.style.top = topPositionNameTagForCat1();
    stepNum = (stepNum + 1) % 8;
    stepTimeout = setTimeout(step, 750/speed);
};
